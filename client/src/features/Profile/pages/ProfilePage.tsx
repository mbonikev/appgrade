import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../../components/layout/Navbar';
import ProfileBanner from '../components/ProfileBanner';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileTabs from '../components/ProfileTabs';
import ProjectsGrid from '../components/ProjectsGrid';
import SettingsModal from '../components/SettingsModal';
import SubmitProjectModal from '../../Submit/components/SubmitProjectModal';
import EditProjectModal from '../components/EditProjectModal';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import ScreensViewPage from '../components/ScreensViewPage';
import FollowStatsModal from '../components/FollowStatsModal';
import { AnimatePresence, motion } from 'framer-motion';
import { HiStar, HiCursorClick, HiOutlineBookmark } from 'react-icons/hi';
import { RiChatSmile2Line } from 'react-icons/ri';
import { Link } from '@tanstack/react-router';
import api from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';

interface ProfilePageProps {
    profileId?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profileId }) => {
    const { user: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState('work');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);

    // Data State
    const [profileUser, setProfileUser] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Management Modals State
    const [editProjectId, setEditProjectId] = useState<string | null>(null);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const [viewScreensProject, setViewScreensProject] = useState<any | null>(null);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    // Follow State
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [isFollowStatsOpen, setIsFollowStatsOpen] = useState(false);
    const [followStatsTab, setFollowStatsTab] = useState<'followers' | 'following'>('followers');

    // Determine effective profile ID and ownership
    // If profileId is passed, use it. Otherwise, if authUser exists, use their ID.
    const effectiveProfileId = profileId || authUser?.id || (authUser as any)?._id;
    const isOwnProfile = !profileId || (!!authUser && (authUser.id === profileId || (authUser as any)._id === profileId));

    useEffect(() => {
        const fetchData = async () => {
            if (!effectiveProfileId) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Fetch User
                // If it's own profile and we have authUser, we might skip fetching user if authUser has everything
                // But fetching ensures fresh data.
                const userRes = await api.get(`/api/users/${effectiveProfileId}`);
                setProfileUser(userRes.data);

                // Fetch Projects
                const projectsRes = await api.get(`/api/projects/user/${effectiveProfileId}`);
                // Map backend project to frontend expected shape
                const mappedProjects = projectsRes.data.map((p: any) => ({
                    id: p._id,
                    name: p.title,
                    tagline: p.tagline,
                    description: p.description,
                    cover_image_url: p.images?.[0] || 'https://via.placeholder.com/800x600', // Fallback
                    logo_url: p.logo || '', // Assuming logo might be added later or mapped
                    type: p.type,
                    is_bookmarked: false, // Need bookmark logic later
                    ...p
                }));
                setProjects(mappedProjects);

                // Check if current user is following this profile (if not own profile)
                if (!isOwnProfile && authUser) {
                    try {
                        const userId = authUser.id || (authUser as any)._id;
                        const followingRes = await api.get(`/api/users/${userId}/following`);
                        const followingIds = followingRes.data.map((u: any) => u._id);
                        setIsFollowing(followingIds.includes(effectiveProfileId));
                    } catch (err) {
                        console.error('Error checking follow status:', err);
                    }
                }

                // Set initial follower count
                setFollowerCount(userRes.data.followers || 0);

            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [effectiveProfileId, isOwnProfile, authUser]);

    // Derived User Object for Display
    const displayUser = useMemo(() => {
        if (isOwnProfile && authUser) {
            // Merge authUser with fetched profileUser to get latest updates but keep auth context if needed
            // Actually, fetched profileUser is best source of truth for profile page
            return profileUser || authUser;
        }
        return profileUser;
    }, [isOwnProfile, authUser, profileUser]);

    // Filter projects based on active tab
    const displayedProjects = useMemo(() => {
        if (activeTab === 'saved') {
            return []; // Implement saved projects fetching later
        }
        return projects;
    }, [activeTab, projects]);

    const handleEditProject = (id: string) => {
        setEditProjectId(id);
    };

    const handleDeleteProject = (id: string) => {
        setDeleteProjectId(id);
    };

    const handleConfirmDelete = async () => {
        console.log('[DELETE] Starting delete process...');
        console.log('[DELETE] deleteProjectId:', deleteProjectId);

        if (!deleteProjectId) {
            console.log('[DELETE] No project ID found, aborting');
            return;
        }

        try {
            console.log('[DELETE] Calling API:', `/api/projects/${deleteProjectId}`);
            const response = await api.delete(`/api/projects/${deleteProjectId}`);
            console.log('[DELETE] API Response:', response.data);

            // Remove from local state
            console.log('[DELETE]Removing from local state');
            setProjects(prev => {
                const filtered = prev.filter(p => p.id !== deleteProjectId);
                console.log('[DELETE] Projects before:', prev.length, 'after:', filtered.length);
                return filtered;
            });

            // Update apps count if we have the user object
            if (profileUser) {
                console.log('[DELETE] Updating user apps count');
                setProfileUser((prev: any) => ({
                    ...prev,
                    appsCount: Math.max(0, (prev.appsCount || 0) - 1)
                }));
            }

            console.log('[DELETE] Closing dialog');
            setDeleteProjectId(null);
            console.log('[DELETE] Delete completed successfully');
        } catch (error: any) {
            console.error('[DELETE] Error deleting project:', error);
            console.error('[DELETE] Error response:', error.response?.data);
            console.error('[DELETE] Error status:', error.response?.status);
            alert(`Failed to delete project: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleBookmarkProject = (id: string) => {
        console.log('Bookmark project:', id);
    };

    const handleProjectClick = (project: any) => {
        // Open modal for all project types
        setSelectedProject(project);
    };

    const handleFollowToggle = async () => {
        if (!authUser) {
            alert('Please sign in to follow users');
            return;
        }

        if (!effectiveProfileId) return;

        const userId = authUser.id || (authUser as any)._id;

        try {
            if (isFollowing) {
                await api.delete(`/api/users/${effectiveProfileId}/follow`, { data: { followerId: userId } });
                setIsFollowing(false);
                setFollowerCount(prev => Math.max(0, prev - 1));
            } else {
                await api.post(`/api/users/${effectiveProfileId}/follow`, { followerId: userId });
                setIsFollowing(true);
                setFollowerCount(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            alert('Failed to update follow status. Please try again.');
        }
    };

    const handleOpenFollowStats = (tab: 'followers' | 'following') => {
        setFollowStatsTab(tab);
        setIsFollowStatsOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bodyBg">
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                </div>
            </div>
        );
    }

    if (!displayUser) {
        return (
            <div className="min-h-screen bg-bodyBg">
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-64px)] text-textColor">
                    User not found.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bodyBg">
            <Navbar />

            <ProfileBanner />

            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
                    {/* Left Sidebar */}
                    <div className="relative">
                        <ProfileSidebar
                            user={{
                                name: displayUser.name,
                                username: displayUser.username || displayUser.email?.split('@')[0],
                                role: displayUser.role === 'creator' ? "Creator" : "User",
                                avatar: displayUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayUser.name)}`,
                                bio: displayUser.bio,
                                website: displayUser.website,
                                location: "San Francisco, CA", // Mock location for now
                                joinedDate: displayUser.createdAt ? new Date(displayUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "N/A",
                                isVerified: displayUser.isVerified || false
                            }}
                            stats={{
                                followers: followerCount,
                                following: displayUser.following || 0,
                                projects: projects.length, // Use actual fetched projects count
                                likes: 0 // TODO: Implement likes tracking in the future
                            }}
                            isOwnProfile={isOwnProfile}
                            isFollowing={isFollowing}
                            onEditClick={() => setIsSettingsOpen(true)}
                            onFollowClick={handleFollowToggle}
                            onFollowersClick={() => handleOpenFollowStats('followers')}
                            onFollowingClick={() => handleOpenFollowStats('following')}
                        />
                    </div>

                    {/* Right Content */}
                    <div className="pt-8">
                        <ProfileTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            isOwnProfile={isOwnProfile}
                        />

                        <div className="mt-6">
                            {activeTab === 'work' && (
                                <div className="animate-fade-in">
                                    <ProjectsGrid
                                        projects={displayedProjects}
                                        isOwnProfile={!!isOwnProfile}
                                        onEdit={handleEditProject}
                                        onDelete={handleDeleteProject}
                                        onBookmark={handleBookmarkProject}
                                        onClick={handleProjectClick}
                                    />
                                </div>
                            )}
                            {activeTab === 'saved' && (
                                <div className="animate-fade-in">
                                    <ProjectsGrid
                                        projects={[]}
                                        isOwnProfile={!!isOwnProfile}
                                        onBookmark={handleBookmarkProject}
                                        onClick={handleProjectClick}
                                    />
                                </div>
                            )}
                            {activeTab === 'awards' && (
                                <div className="flex items-center justify-center h-[400px] text-textColorWeak">
                                    <p>No awards won yet.</p>
                                </div>
                            )}
                            {activeTab === 'about' && (
                                <div className="text-textColorWeak">
                                    <p className="text-lg">{displayUser.bio || "No bio yet."}</p>
                                    {displayUser.website && (
                                        <a href={displayUser.website} target="_blank" rel="noreferrer" className="text-mainColor hover:underline mt-4 block">
                                            {displayUser.website}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            <SubmitProjectModal
                isOpen={isSubmitOpen}
                onClose={() => setIsSubmitOpen(false)}
            />

            {editProjectId && (
                <EditProjectModal
                    isOpen={!!editProjectId}
                    onClose={() => setEditProjectId(null)}
                    projectId={editProjectId}
                />
            )}

            {deleteProjectId && (
                <DeleteConfirmDialog
                    isOpen={!!deleteProjectId}
                    onClose={() => setDeleteProjectId(null)}
                    onConfirm={handleConfirmDelete}
                    projectName={projects.find(p => p.id === deleteProjectId)?.name || 'Project'}
                />
            )}

            {viewScreensProject && (
                <ScreensViewPage
                    isOpen={!!viewScreensProject}
                    onClose={() => setViewScreensProject(null)}
                    images={viewScreensProject.images || [viewScreensProject.cover_image_url]}
                    title={viewScreensProject.name}
                />
            )}

            {effectiveProfileId && (
                <FollowStatsModal
                    isOpen={isFollowStatsOpen}
                    onClose={() => setIsFollowStatsOpen(false)}
                    userId={effectiveProfileId}
                    initialTab={followStatsTab}
                />
            )}

            {/* Project Details Modal */}
            <AnimatePresence mode="wait">
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                                duration: 0.32,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="w-full max-w-[84%] max-lg:max-w-full mx-auto h-[calc(100svh-56px)] overflow-y-auto bg-modalBg rounded-t-3xl shadow-xl fixed top-14 left-0 right-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col max-w-[88%] mx-auto pb-10 max-lg:pb-6">
                                <div className="w-full sticky top-0 z-10 bg-modalBg px-10 pt-8 max-xl:px-10 max-lg:pt-6 max-lg:px-0 flex items-start justify-between max-md:flex-col max-md:items-start gap-3 max-md:gap-0">
                                    <div className="flex gap-4 items-start mb-6 min-w-fit">
                                        <img
                                            src={selectedProject.logo_url || selectedProject.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProject.name || selectedProject.title)}`}
                                            className="w-14 h-14 rounded-2xl"
                                            alt={selectedProject.name || selectedProject.title}
                                        />
                                        <div>
                                            <h2 className="text-3xl font-bold text-textColor">
                                                {selectedProject.name || selectedProject.title}{" "}
                                                {selectedProject.type && selectedProject.type !== "project" && (
                                                    <span className="text-textColorWeak">
                                                        (
                                                        {selectedProject.type === "ui_element"
                                                            ? "UI Element"
                                                            : selectedProject.type === "screens"
                                                                ? "Screen"
                                                                : "Theme"}
                                                        )
                                                    </span>
                                                )}
                                            </h2>
                                            <p className="text-textColor">
                                                {selectedProject.tagline || selectedProject.description}
                                            </p>
                                            <div className="flex items-start justify-start gap-2 flex-wrap mt-3">
                                                {selectedProject.categories?.map((cat: string, idx: number) => (
                                                    <p key={idx} className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">
                                                        {cat}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-end gap-6 pt-3 max-md:pt-0 max-sm:gap-3 max-md:flex-row-reverse">
                                        <div className="border-r pr-6 max-md:border-r-[0] mr-0 border-linesColor h-[48px] flex items-center flex-col max-sm:items-end">
                                            <h1 className="flex items-center text-xl font-semibold gap-1">
                                                <HiStar className="text-2xl text-orange-500 dark:text-orange-400" />
                                                {selectedProject.averageRating || 3.3}
                                            </h1>
                                            <p className="text-sm font-medium text-textColorWeak">
                                                ({selectedProject.reviewsCount || 0}<span className="max-sm:hidden"> Reviews</span>)
                                            </p>
                                        </div>
                                        <button className="text-textColor h-[48px] aspect-square flex items-center justify-center text-2xl rounded-full bg-cardItemBg">
                                            <HiOutlineBookmark />
                                        </button>
                                        {selectedProject.type === "project" || selectedProject.submissionType === "developed" ? (
                                            <Link
                                                to="/preview/$projectId"
                                                params={{ projectId: selectedProject.id.toString() }}
                                                className="text-left text-white h-[48px] max-md:flex-1 max-md:justify-center bg-mainColor pl-4 pr-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                                            >
                                                <HiCursorClick className="text-xl" />
                                                Start Testing
                                            </Link>
                                        ) : (
                                            <button
                                                className="text-left text-white h-[48px] max-md:flex-1 max-md:justify-center bg-mainColor pl-4 pr-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                                            >
                                                <RiChatSmile2Line className="text-xl" />
                                                Review
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="px-10 max-xl:px-10 max-lg:px-0">
                                    {selectedProject.cover_image_url && (
                                        <img
                                            src={selectedProject.cover_image_url}
                                            className="w-full rounded-2xl mt-6 shadow-2xl"
                                            alt={selectedProject.name || selectedProject.title}
                                        />
                                    )}

                                    {/* Author Section */}
                                    <div className="w-full border-t border-linesColor mt-20 max-md:mt-14 pb-10 flex items-center justify-center flex-col gap-1.5 max-w-[90%] mx-auto">
                                        <div className="size-20 max-md:size-14 -mt-11 max-md:-mt-8 ring-[10px] ring-modalBg rounded-full bg-cardBg shadow-md mb-2.5 overflow-hidden cursor-pointer">
                                            <img
                                                src={
                                                    selectedProject.author?.avatar ||
                                                    profileUser?.avatar ||
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser?.name || "User")}`
                                                }
                                                className="w-full h-full object-cover"
                                                alt={profileUser?.name || "User"}
                                            />
                                        </div>
                                        <p className="text-textColor text-lg font-medium">
                                            {profileUser?.name || "Anonymous"}
                                        </p>
                                        <p className="text-textColorWeak text-sm">
                                            @{profileUser?.username || profileUser?.email?.split("@")[0] || "user"}
                                        </p>
                                        {!isOwnProfile && (
                                            <Link
                                                to="/profile/$profileId"
                                                params={{ profileId: effectiveProfileId || "" }}
                                                className="text-left text-white h-[44px] mt-3 max-md:justify-center bg-mainColor px-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                                            >
                                                View profile
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;
