import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import StepEssentials from "../../Submit/components/StepEssentials";
import StepVisuals from "../../Submit/components/StepVisuals";
import api from "../../../lib/api";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    onProjectUpdated?: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
    isOpen,
    onClose,
    projectId,
    onProjectUpdated,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [projectData, setProjectData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            if (isOpen && projectId) {
                setLoading(true);
                try {
                    const response = await api.get(`/api/projects/${projectId}`);
                    const project = response.data;

                    // Map backend data to form format
                    setProjectData({
                        id: project._id,
                        name: project.title,
                        tagline: project.tagline,
                        description: project.description,
                        website: project.website || "",
                        categories: project.categories || [],
                        tags: project.tags || [],
                        logo: project.logo || null,
                        coverImage: project.images?.[0] || null,
                        gallery: project.images?.slice(1) || [],
                        videoUrl: project.videoUrl || "",
                        codeSnippet: project.codeSnippet || "",
                        type: project.type,
                        submissionType: project.submissionType,
                        link: project.link || ""
                    });
                } catch (error) {
                    console.error('Error fetching project:', error);
                    alert('Failed to load project data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProject();
    }, [isOpen, projectId]);

    const totalSteps = 2; // Essentials + Visuals

    const handleNext = async () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // Submit update
            setLoading(true);
            try {
                const formData = new FormData();

                // Add text fields
                formData.append('title', projectData.name);
                formData.append('tagline', projectData.tagline);
                formData.append('description', projectData.description);
                formData.append('website', projectData.website || '');
                formData.append('categories', JSON.stringify(projectData.categories));
                formData.append('tags', JSON.stringify(projectData.tags));
                formData.append('type', projectData.type);
                formData.append('submissionType', projectData.submissionType);
                formData.append('link', projectData.link || '');
                formData.append('codeSnippet', projectData.codeSnippet || '');

                // Add files if they are new uploads (File objects)
                if (projectData.logo instanceof File) {
                    formData.append('logo', projectData.logo);
                }
                if (projectData.coverImage instanceof File) {
                    formData.append('coverImage', projectData.coverImage);
                }
                if (projectData.gallery && Array.isArray(projectData.gallery)) {
                    projectData.gallery.forEach((file: any) => {
                        if (file instanceof File) {
                            formData.append('gallery', file);
                        }
                    });
                }

                await api.put(`/api/projects/${projectId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Project updated successfully!');
                onProjectUpdated?.();
                onClose();
            } catch (error: any) {
                console.error('Error updating project:', error);
                alert(`Failed to update project: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
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

    if (!projectData || loading) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />
                        <div className="relative bg-bodyBg rounded-3xl p-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        );
    }

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
