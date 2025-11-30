import React, { useState } from 'react';
import { HiX, HiCheckCircle } from 'react-icons/hi';
import { AWARD_CATEGORIES } from '../types/nomination';

interface NominateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projects: any[];
    existingNominations: Map<string, any>;
    onSubmit: (projectId: string, category: string) => Promise<void>;
}

const NominateProjectModal: React.FC<NominateProjectModalProps> = ({
    isOpen,
    onClose,
    projects,
    existingNominations,
    onSubmit
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!selectedCategory || !selectedProject) {
            alert('Please select both a category and a project');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(selectedProject, selectedCategory);
            setSelectedCategory('');
            setSelectedProject('');
            onClose();
        } catch (error) {
            console.error('Error submitting nomination:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const existingNomination = selectedCategory ? existingNominations.get(selectedCategory) : null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-modalBg rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-8 py-6 border-b border-linesColor flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-textColor">Nominate Project</h2>
                    <button
                        onClick={onClose}
                        className="text-textColorWeak hover:text-textColor transition-colors"
                    >
                        <HiX className="text-2xl" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    {/* Category Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-textColor mb-3">
                            Select Award Category
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {AWARD_CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedCategory === category.id
                                        ? 'border-mainColor bg-mainColor/10'
                                        : 'border-linesColor bg-cardBg hover:border-mainColor/50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-textColor mb-1">{category.title}</h3>
                                            <p className="text-sm text-textColorWeak">{category.description}</p>
                                        </div>
                                        {selectedCategory === category.id && (
                                            <HiCheckCircle className="text-mainColor text-xl flex-shrink-0 ml-2" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Existing Nomination Warning */}
                    {existingNomination && (
                        <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                            <p className="text-sm text-orange-600 dark:text-orange-400">
                                <strong>Note:</strong> You already have a nomination for this category ({existingNomination.project.title}).
                                Submitting a new nomination will replace the existing one.
                            </p>
                        </div>
                    )}

                    {/* Project Selection */}
                    {selectedCategory && (
                        <div>
                            <label className="block text-sm font-medium text-textColor mb-3">
                                Select Project to Nominate
                            </label>
                            {projects.length === 0 ? (
                                <div className="text-center py-8 text-textColorWeak">
                                    <p>You don't have any projects yet.</p>
                                    <p className="text-sm mt-2">Create a project first to nominate it for awards.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto">
                                    {projects.map((project) => (
                                        <button
                                            key={project.id}
                                            onClick={() => setSelectedProject(project.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${selectedProject === project.id
                                                ? 'border-mainColor bg-mainColor/10'
                                                : 'border-linesColor bg-cardBg hover:border-mainColor/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={project.logo_url || project.cover_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}`}
                                                    alt={project.name}
                                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-textColor truncate">{project.name}</h3>
                                                    <p className="text-sm text-textColorWeak truncate">{project.tagline || project.description}</p>
                                                </div>
                                                {selectedProject === project.id && (
                                                    <HiCheckCircle className="text-mainColor text-xl flex-shrink-0" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-linesColor flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full font-medium text-textColor bg-cardItemBg hover:bg-cardItemBgHover transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedCategory || !selectedProject || isSubmitting}
                        className="px-6 py-2.5 rounded-full font-medium text-white bg-mainColor hover:bg-mainColorHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NominateProjectModal;
