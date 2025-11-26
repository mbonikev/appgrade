import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiCheckLine, RiArrowLeftLine } from "react-icons/ri";
import StepEssentials from "./StepEssentials";
import StepVisuals from "./StepVisuals";
import StepSelection from "./StepSelection";
import StepSubmissionType from "./StepSubmissionType";

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = "selection" | "submission_type" | "screens" | "ui_elements" | "themes";

const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [view, setView] = useState<ViewState>("selection");
  const [currentStep, setCurrentStep] = useState(1);

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

  const handleNext = () => {
    if (currentStep < totalProjectSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit Project Logic
      console.log("Submitting Project:", projectData);
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      if (view === "submission_type") {
        setView("selection");
      } else if (view === "screens" && projectData.submissionType) {
        // If we are in screens view and came from submission_type (implied by having a submission type set, though we might want a better check)
        // Actually, if we are in 'screens' view, back should go to 'submission_type' if it was a screens flow, or 'selection' otherwise?
        // Let's simplify: if view is screens, check if we want to go back to submission_type
        setView("submission_type");
      } else {
        setView("selection");
      }
    }
  };

  const handleSelection = (type: 'screens' | 'ui_elements' | 'themes') => {
    if (type === 'screens') {
      setView('submission_type');
    } else {
      setView(type);
      // Default submission type for others? Or maybe they are always 'developed' or 'design'?
      // For now let's assume they follow the standard flow or we can set a default.
      // The user said "3 of them have the review btn on the home preview not the page", implying UI elements and themes are like "Design UI" in some way or just handled differently.
      // But for "Developed", we need a link.
      // Let's keep it simple.
    }
  };

  const handleSubmissionTypeSelect = (type: 'design' | 'developed') => {
    setProjectData(prev => ({ ...prev, submissionType: type }));
    setView('screens'); // We reuse 'screens' view for the form steps, but we'll conditionally render inside
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
      case "submission_type":
        return "Submission Type";
      case "screens":
        return projectData.submissionType === 'developed' ? "Submit App" : "Submit Design";
      case "ui_elements":
        return "Submit UI Element";
      case "themes":
        return "Submit Theme";
    }
  };

  const isFlowView = view !== "selection" && view !== "submission_type";

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
              {view === "submission_type" && <StepSubmissionType onSelect={handleSubmissionTypeSelect} />}
              {isFlowView && renderProjectStep()}
            </div>

            {/* Footer */}
            {isFlowView && (
              <div className="p-6 border-t border-linesColor flex justify-between items-center bg-bodyBg">
                <button
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-full font-medium transition-colors text-textColor hover:bg-cardItemBg"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 bg-mainColor text-white rounded-full font-medium hover:bg-mainColorHover transition-colors shadow-lg shadow-mainColor/20"
                >
                  {currentStep === totalProjectSteps
                    ? "Submit Project"
                    : "Continue"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubmitProjectModal;
