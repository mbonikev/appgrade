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

            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [effectiveProfileId]);

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

    const handleConfirmDelete = () => {
        console.log('Deleting project:', deleteProjectId);
        setDeleteProjectId(null);
        // In real app: call API and refresh list
    };

    const handleBookmarkProject = (id: string) => {
        console.log('Bookmark project:', id);
    };

    const handleProjectClick = (project: any) => {
        if (project.type === 'screens') {
            setViewScreensProject(project);
        } else {
            console.log('Navigate to project:', project.id);
        }
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
                                followers: displayUser.followers || 0,
                                following: displayUser.following || 0,
                                projects: projects.length, // Use actual fetched projects count
                                likes: 0 // TODO: Implement likes tracking in the future
                            }}
                            isOwnProfile={isOwnProfile}
                            onEditClick={() => setIsSettingsOpen(true)}
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
        </div>
    );
};

export default ProfilePage;
