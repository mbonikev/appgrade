import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiCheckLine, RiArrowLeftLine } from "react-icons/ri";
import StepEssentials from "./StepEssentials";
import StepCategorization from "./StepCategorization";
import StepVisuals from "./StepVisuals";
import StepSelection from "./StepSelection";
import StepCategoryForm from "./StepCategoryForm";

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = "selection" | "project" | "category" | "template";

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
  });

  const totalProjectSteps = 4;

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
      setView("selection");
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
      });
    }, 300);
  };

  const updateProjectData = (data: Partial<typeof projectData>) => {
    setProjectData((prev) => ({ ...prev, ...data }));
  };

  const handleCategorySubmit = (data: {
    name: string;
    description: string;
  }) => {
    console.log("Submitting Category:", data);
    handleClose();
  };

  const renderProjectStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepEssentials data={projectData} updateData={updateProjectData} />
        );
      case 2:
        return (
          <StepCategorization
            data={projectData}
            updateData={updateProjectData}
          />
        );
      case 3:
        return (
          <StepVisuals data={projectData} updateData={updateProjectData} />
        );
      case 4:
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
                <strong className="text-textColor">Categories:</strong>{" "}
                {projectData.categories.join(", ")}
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
      case "project":
        return "Submit Project";
      case "category":
        return "Suggest Category";
      case "template":
        return "Submit Template";
    }
  };

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
                    onClick={() =>
                      view === "project" ? handleBack() : setView("selection")
                    }
                    className="p-1 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                  >
                    <RiArrowLeftLine className="text-xl" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-bold text-textColor">
                    {getTitle()}
                  </h2>
                  {view === "project" && (
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

            {/* Progress Bar (Project Only) */}
            {view === "project" && (
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
              {view === "selection" && <StepSelection onSelect={setView} />}
              {view === "project" && renderProjectStep()}
              {view === "category" && (
                <StepCategoryForm onSubmit={handleCategorySubmit} />
              )}
              {view === "template" && (
                <div className="text-center py-12 text-textColorWeak">
                  Template submission coming soon!
                </div>
              )}
            </div>

            {/* Footer (Project Only) */}
            {view === "project" && (
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
