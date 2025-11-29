import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import api from '../../../lib/api';
import ProjectsGrid from '../components/ProjectsGrid';
import SettingsModal from '../components/SettingsModal';
import SubmitProjectModal from '../../Submit/components/SubmitProjectModal';
import EditProjectModal from '../components/EditProjectModal';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import ScreensViewPage from '../components/ScreensViewPage';
import { mockUser, mockProjects, mockStats } from '../data/mockProfile';
import { useAuth } from '../../../contexts/AuthContext';

interface ProfilePageProps {
    profileId?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profileId }) => {
    const { user: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState('work');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);

    // Management Modals State
    const [editProjectId, setEditProjectId] = useState<string | null>(null);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const [viewScreensProject, setViewScreensProject] = useState<any | null>(null);

    const [profileUser, setProfileUser] = useState<any>(null);
    const [loading, setLoading] = useState(!!profileId);

    useEffect(() => {
        if (profileId) {
            setLoading(true);
            api.get(`/api/users/${profileId}`)
                .then(response => {
                    const data = response.data;
                    setProfileUser({
                        ...data,
                        display_name: data.name,
                        avatar_url: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`,
                        followers_count: data.followers,
                        following_count: data.following,
                    });
                })
                .catch(error => {
                    console.error('Failed to fetch profile:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setProfileUser(null);
        }
    }, [profileId]);

    // Determine if viewing own profile
    const isOwnProfile = !profileId || (authUser?.id === profileId);

    // Merge auth data with mock data if viewing own profile
    const user = isOwnProfile && authUser ? {
        ...mockUser,
        display_name: authUser.name,
        username: authUser.email.split('@')[0], // Derive username from email if needed
        avatar_url: authUser.avatar || mockUser.avatar_url,
        email: authUser.email,
    } : (profileUser || mockUser);

    // Filter projects based on active tab
    const displayedProjects = useMemo(() => {
        if (activeTab === 'saved') {
            return mockProjects.filter(p => p.is_bookmarked); // Mock bookmark filter
        }
        return mockProjects; // Default to all projects for 'work'
    }, [activeTab]);

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

    // Mock function to handle clicking on a project card
    const handleProjectClick = (project: any) => {
        if (project.type === 'screens') {
            setViewScreensProject(project);
        } else {
            console.log('Navigate to project:', project.id);
        }
    };

    return (
        <div className="min-h-screen bg-bodyBg">
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                </div>
            ) : (
                <div className="w-full h-fit px-10 md:px-10 max-md:px-4">
                    <ProfileHeader
                        name={user.display_name}
                        handle={`@${user.username}`}
                        role={user.role === 'creator' ? "Creator" : "User"}
                        avatar={user.avatar_url}
                        isOwnProfile={isOwnProfile}
                        onEditClick={() => setIsSettingsOpen(true)}
                        stats={{
                            ...mockStats,
                            followers: user.followers_count || 0,
                            following: user.following_count || 0,
                            projects: user.appsCount || 0
                        }}
                    />

                    <ProfileTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        isOwnProfile={isOwnProfile}
                    />

                    {/* Tab Content */}
                    <div className="min-h-[400px] pb-20">
                        {activeTab === 'work' && (
                            <div className="animate-fade-in">
                                <ProjectsGrid
                                    projects={displayedProjects}
                                    isOwnProfile={isOwnProfile}
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
                                    projects={[]} // Empty for now to test empty state
                                    isOwnProfile={isOwnProfile}
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
                            <div className="max-w-2xl mx-auto text-center text-textColorWeak">
                                <p className="text-lg">{user.bio}</p>
                                <a href={user.website} target="_blank" rel="noreferrer" className="text-mainColor hover:underline mt-4 block">
                                    {user.website}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
                    projectName={mockProjects.find(p => p.id === deleteProjectId)?.name || 'Project'}
                />
            )}

            {viewScreensProject && (
                <ScreensViewPage
                    isOpen={!!viewScreensProject}
                    onClose={() => setViewScreensProject(null)}
                    images={[viewScreensProject.cover_image_url, viewScreensProject.cover_image_url, viewScreensProject.cover_image_url]} // Mock multiple images
                    title={viewScreensProject.name}
                />
            )}
        </div>
    );
};

export default ProfilePage;
