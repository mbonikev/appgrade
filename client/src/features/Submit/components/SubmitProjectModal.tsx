import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiCheckLine, RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";
import StepEssentials from "./StepEssentials";
import StepVisuals from "./StepVisuals";
import StepSelection from "./StepSelection";
import api from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = "selection" | "screens" | "ui_elements" | "themes";

const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [view, setView] = useState<ViewState>("selection");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Project Form Data
  const [projectData, setProjectData] = useState({
    name: "",
    tagline: "",
    description: "",
    website: "",
    categories: [] as string[],
    tags: [] as string[],
    logo: null as File | null,
    coverImage: null as File | null,
    gallery: [] as File[],
    videoUrl: "",
    codeSnippet: "",
    submissionType: "design" as "design" | "developed",
    link: "",
  });

  const totalProjectSteps = 3;

  const validateCurrentStep = (): boolean => {
    setSubmitError(null);

    if (currentStep === 1) {
      // Validate essentials
      if (!projectData.name.trim()) {
        setSubmitError('Project name is required');
        return false;
      }
      if (!projectData.tagline.trim()) {
        setSubmitError('Tagline is required');
        return false;
      }
      if (!projectData.description.trim()) {
        setSubmitError('Description is required');
        return false;
      }
      // Validate link for developed projects
      if (projectData.submissionType === 'developed' && view === 'screens' && !projectData.link?.trim()) {
        setSubmitError('Live URL is required for developed projects');
        return false;
      }
    }

    if (currentStep === 2) {
      // Validate visuals
      if (!projectData.coverImage) {
        setSubmitError('Cover image is required');
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalProjectSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit Project
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setSubmitError("You must be logged in to submit a project");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', projectData.name);
      formData.append('tagline', projectData.tagline);
      formData.append('description', projectData.description);
      formData.append('submissionType', projectData.submissionType);
      formData.append('author', user.id || (user as any)._id);

      // Map view to project type
      let projectType = 'project';
      if (view === 'screens') {
        projectType = projectData.submissionType === 'developed' ? 'project' : 'screens';
      } else if (view === 'ui_elements') {
        projectType = 'ui_element';
      } else if (view === 'themes') {
        projectType = 'theme';
      }
      formData.append('type', projectType);

      // Optional fields
      if (projectData.website) formData.append('website', projectData.website);
      if (projectData.link) formData.append('link', projectData.link);
      if (projectData.codeSnippet) formData.append('codeSnippet', projectData.codeSnippet);
      if (projectData.categories.length > 0) formData.append('categories', JSON.stringify(projectData.categories));
      if (projectData.tags.length > 0) formData.append('tags', JSON.stringify(projectData.tags));

      // Append files
      if (projectData.logo) formData.append('logo', projectData.logo);
      if (projectData.coverImage) formData.append('coverImage', projectData.coverImage);
      projectData.gallery.forEach((file) => {
        formData.append('gallery', file);
      });

      // Submit to API
      const response = await api.post('/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project created:', response.data);
      handleClose();
      // TODO: Show success message or redirect to project page
    } catch (error: any) {
      console.error('Error submitting project:', error);
      setSubmitError(error.response?.data?.message || 'Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setView("selection");
    }
  };

  const handleSelection = (type: 'design' | 'developed' | 'ui_elements' | 'themes') => {
    if (type === 'design') {
      setProjectData(prev => ({ ...prev, submissionType: 'design' }));
      setView('screens');
    } else if (type === 'developed') {
      setProjectData(prev => ({ ...prev, submissionType: 'developed' }));
      setView('screens');
    } else {
      setView(type);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setView("selection");
      setCurrentStep(1);
      setProjectData({
        name: "",
        tagline: "",
        description: "",
        website: "",
        categories: [],
        tags: [],
        logo: null,
        coverImage: null,
        gallery: [],
        videoUrl: "",
        codeSnippet: "",
        submissionType: "design",
        link: "",
      });
    }, 300);
  };

  const updateProjectData = (data: Partial<typeof projectData>) => {
    setProjectData((prev) => ({ ...prev, ...data }));
  };

  const renderProjectStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepEssentials
            data={projectData}
            updateData={updateProjectData}
            showLinkInput={projectData.submissionType === 'developed' && view === 'screens'}
          />
        );
      case 2:
        return (
          <StepVisuals
            data={projectData}
            updateData={updateProjectData}
            type={view as 'screens' | 'ui_elements' | 'themes'}
            isDeveloped={projectData.submissionType === 'developed' && view === 'screens'}
          />
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <RiCheckLine className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-textColor">
              Ready to Submit?
            </h3>
            <p className="text-textColorWeak">
              Please review your information before submitting. Your project
              will be reviewed by our team shortly.
            </p>
            <div className="bg-cardItemBg rounded-xl p-4 text-left mt-4 text-sm text-textColorWeak">
              <p>
                <strong className="text-textColor">Name:</strong>{" "}
                {projectData.name}
              </p>
              <p>
                <strong className="text-textColor">Tagline:</strong>{" "}
                {projectData.tagline}
              </p>
              <p>
                <strong className="text-textColor">Type:</strong>{" "}
                {view === 'screens' ? (projectData.submissionType === 'developed' ? 'Developed App' : 'UI Design') : view}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (view) {
      case "selection":
        return "Submit Content";

      case "screens":
        return projectData.submissionType === 'developed' ? "Submit App" : "Submit Design";
      case "ui_elements":
        return "Submit UI Element";
      case "themes":
        return "Submit Theme";
    }
  };

  const isFlowView = view !== "selection";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-bodyBg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-linesColor">
              <div className="flex items-center gap-3">
                {view !== "selection" && (
                  <button
                    onClick={handleBack}
                    className="p-1 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                  >
                    <RiArrowLeftLine className="text-xl" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-bold text-textColor">
                    {getTitle()}
                  </h2>
                  {isFlowView && (
                    <p className="text-sm text-textColorWeak">
                      Step {currentStep} of {totalProjectSteps}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </div>

            {/* Progress Bar */}
            {isFlowView && (
              <div className="w-full h-1 bg-cardItemBg">
                <motion.div
                  className="h-full bg-mainColor"
                  initial={{
                    width: `${((currentStep - 1) / totalProjectSteps) * 100}%`,
                  }}
                  animate={{
                    width: `${(currentStep / totalProjectSteps) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {view === "selection" && <StepSelection onSelect={handleSelection} />}

              {isFlowView && renderProjectStep()}
            </div>

            {/* Footer */}
            {isFlowView && (
              <div className="p-6 border-t border-linesColor bg-bodyBg">
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full font-medium transition-colors text-textColor hover:bg-cardItemBg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-mainColor text-white rounded-full font-medium hover:bg-mainColorHover transition-colors shadow-lg shadow-mainColor/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <RiLoader4Line className="animate-spin text-xl" />
                    )}
                    {isSubmitting
                      ? "Submitting..."
                      : currentStep === totalProjectSteps
                        ? "Submit Project"
                        : "Continue"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubmitProjectModal;
