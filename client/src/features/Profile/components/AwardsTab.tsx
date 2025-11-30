import React, { useState, useEffect } from 'react';
import { HiChevronDown, HiChevronRight, HiPlus, HiPencil, HiTrash, HiStar } from 'react-icons/hi';
import { AWARD_CATEGORIES } from '../types/nomination';
import type { Nomination } from '../types/nomination';
import NominateProjectModal from './NominateProjectModal';
import api from '../../../lib/api';
import { useToast } from '../../../contexts/ToastContext';

interface AwardsTabProps {
    userId: string;
    isOwnProfile: boolean;
    projects: any[];
}

const AwardsTab: React.FC<AwardsTabProps> = ({ userId, isOwnProfile, projects }) => {
    const [nominations, setNominations] = useState<Nomination[]>([]);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Fetch nominations
    useEffect(() => {
        const fetchNominations = async () => {
            try {
                const response = await api.get(`/api/nominations/user/${userId}`);
                setNominations(response.data);
            } catch (error) {
                console.error('Error fetching nominations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNominations();
    }, [userId]);

    // Create a map of category -> nomination for quick lookup
    const nominationMap = new Map(
        nominations.map(nom => [nom.category, nom])
    );

    const toggleRow = (categoryId: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedRows(newExpanded);
    };

    const handleNominate = async (projectId: string, category: string) => {
        try {
            const response = await api.post('/api/nominations', {
                userId,
                projectId,
                category
            });

            // Update local state
            setNominations(prev => {
                const filtered = prev.filter(nom => nom.category !== category);
                return [...filtered, response.data];
            });

            showToast('Project nominated successfully!', 'success');
        } catch (error: any) {
            console.error('Error nominating project:', error);
            showToast(error.response?.data?.message || 'Failed to nominate project', 'error');
            throw error;
        }
    };

    const handleDeleteNomination = async (nominationId: string) => {
        if (!confirm('Are you sure you want to remove this nomination?')) {
            return;
        }

        try {
            await api.delete(`/api/nominations/${nominationId}`, {
                data: { userId }
            });

            setNominations(prev => prev.filter(nom => nom._id !== nominationId));
            showToast('Nomination removed successfully', 'success');
        } catch (error: any) {
            console.error('Error deleting nomination:', error);
            showToast(error.response?.data?.message || 'Failed to remove nomination', 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Header with Nominate Button */}
            {isOwnProfile && (
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-textColor">Award Nominations</h2>
                        <p className="text-textColorWeak mt-1">Nominate your projects for different award categories</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-mainColor text-white rounded-full font-medium hover:bg-mainColorHover transition-colors"
                    >
                        <HiPlus className="text-lg" />
                        Nominate Project
                    </button>
                </div>
            )}

            {/* Collapsible Table */}
            <div className="bg-cardBg rounded-2xl border border-linesColor overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-linesColor bg-cardItemBg/50">
                            <th className="text-left p-4 font-medium text-textColorWeak text-sm w-12"></th>
                            <th className="text-left p-4 font-medium text-textColorWeak text-sm">Category</th>
                            <th className="text-left p-4 font-medium text-textColorWeak text-sm">Nominated Project</th>
                            {isOwnProfile && (
                                <th className="text-right p-4 font-medium text-textColorWeak text-sm w-32">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {AWARD_CATEGORIES.map((category) => {
                            const nomination = nominationMap.get(category.id);
                            const isExpanded = expandedRows.has(category.id);

                            return (
                                <React.Fragment key={category.id}>
                                    {/* Main Row */}
                                    <tr className="border-b border-linesColor last:border-none hover:bg-cardItemBg/30 transition-colors">
                                        <td className="p-4">
                                            <button
                                                onClick={() => nomination && toggleRow(category.id)}
                                                className={`text-textColorWeak hover:text-textColor transition-colors ${!nomination && 'opacity-30 cursor-not-allowed'}`}
                                                disabled={!nomination}
                                            >
                                                {isExpanded ? (
                                                    <HiChevronDown className="text-xl" />
                                                ) : (
                                                    <HiChevronRight className="text-xl" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <h3 className="font-semibold text-textColor">{category.title}</h3>
                                                <p className="text-sm text-textColorWeak">{category.description}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {nomination ? (
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={nomination.project.logo || nomination.project.images?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(nomination.project.title)}`}
                                                        alt={nomination.project.title}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <h4 className="font-medium text-textColor">{nomination.project.title}</h4>
                                                        <p className="text-sm text-textColorWeak truncate max-w-md">
                                                            {nomination.project.tagline}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-textColorWeak italic">Not nominated</span>
                                            )}
                                        </td>
                                        {isOwnProfile && (
                                            <td className="p-4 text-right">
                                                {nomination ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setIsModalOpen(true)}
                                                            className="p-2 text-textColorWeak hover:text-mainColor hover:bg-mainColor/10 rounded-lg transition-colors"
                                                            title="Change nomination"
                                                        >
                                                            <HiPencil className="text-lg" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteNomination(nomination._id)}
                                                            className="p-2 text-textColorWeak hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Remove nomination"
                                                        >
                                                            <HiTrash className="text-lg" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setIsModalOpen(true)}
                                                        className="px-4 py-1.5 text-sm bg-mainColor text-white rounded-full hover:bg-mainColorHover transition-colors"
                                                    >
                                                        Add
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>

                                    {/* Expanded Row */}
                                    {isExpanded && nomination && (
                                        <tr className="bg-cardItemBg/20 border-b border-linesColor">
                                            <td colSpan={isOwnProfile ? 4 : 3} className="p-6">
                                                <div className="flex gap-6">
                                                    {/* Project Preview */}
                                                    <img
                                                        src={nomination.project.images?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(nomination.project.title)}`}
                                                        alt={nomination.project.title}
                                                        className="w-48 h-32 rounded-xl object-cover flex-shrink-0"
                                                    />

                                                    {/* Project Details */}
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-textColor mb-2">
                                                            {nomination.project.title}
                                                        </h3>
                                                        <p className="text-textColorWeak mb-4">
                                                            {nomination.project.tagline}
                                                        </p>

                                                        <div className="flex items-center gap-6 text-sm">
                                                            <div className="flex items-center gap-1.5">
                                                                <HiStar className="text-orange-500" />
                                                                <span className="text-textColor font-medium">
                                                                    {nomination.project.averageRating?.toFixed(1) || 'N/A'}
                                                                </span>
                                                                <span className="text-textColorWeak">
                                                                    ({nomination.project.reviewsCount || 0} reviews)
                                                                </span>
                                                            </div>
                                                            <div className="text-textColorWeak">
                                                                Nominated on {new Date(nomination.createdAt).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>

                {/* Empty State */}
                {nominations.length === 0 && !isOwnProfile && (
                    <div className="p-12 text-center text-textColorWeak">
                        <p>No award nominations yet.</p>
                    </div>
                )}
            </div>

            {/* Nomination Modal */}
            {isOwnProfile && (
                <NominateProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    projects={projects}
                    existingNominations={nominationMap}
                    onSubmit={handleNominate}
                />
            )}
        </div>
    );
};

export default AwardsTab;
