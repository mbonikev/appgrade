import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import StepEssentials from "../../Submit/components/StepEssentials";
import StepVisuals from "../../Submit/components/StepVisuals";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
}

// Mock data fetcher - in real app this would come from API
const getProjectData = (id: string) => ({
    id: id,
    name: "Dashboard UI Kit",
    tagline: "Modern dashboard screens",
    description: "A set of clean and modern dashboard screens for SaaS apps.",
    website: "https://example.com",
    categories: ["Design", "UI Kit"],
    tags: [],
    logo: null,
    coverImage: null,
    videoUrl: "",
    codeSnippet: "",
    type: 'screens' as const
});

const EditProjectModal: React.FC<EditProjectModalProps> = ({
    isOpen,
    onClose,
    projectId,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [projectData, setProjectData] = useState<any>(null);

    useEffect(() => {
        if (isOpen && projectId) {
            // Simulate fetching data
            setProjectData(getProjectData(projectId));
        }
    }, [isOpen, projectId]);

    const totalSteps = 2; // Essentials + Visuals

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            console.log("Updating Project:", projectData);
            onClose();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const updateProjectData = (data: any) => {
        setProjectData((prev: any) => ({ ...prev, ...data }));
    };

    if (!projectData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-bodyBg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-linesColor">
                            <h2 className="text-xl font-bold text-textColor">Edit Project</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                            >
                                <RiCloseLine className="text-2xl" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {currentStep === 1 && (
                                <StepEssentials data={projectData} updateData={updateProjectData} />
                            )}
                            {currentStep === 2 && (
                                <StepVisuals
                                    data={projectData}
                                    updateData={updateProjectData}
                                    type={projectData.type}
                                />
                            )}
                        </div>

                        <div className="p-6 border-t border-linesColor flex justify-between items-center bg-bodyBg">
                            <button
                                onClick={currentStep === 1 ? onClose : handleBack}
                                className="px-6 py-2.5 rounded-full font-medium transition-colors text-textColor hover:bg-cardItemBg"
                            >
                                {currentStep === 1 ? "Cancel" : "Back"}
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-8 py-2.5 bg-mainColor text-white rounded-full font-medium hover:bg-mainColorHover transition-colors shadow-lg shadow-mainColor/20"
                            >
                                {currentStep === totalSteps ? "Update Project" : "Continue"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditProjectModal;
