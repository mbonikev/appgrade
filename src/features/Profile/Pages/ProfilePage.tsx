import React, { useState, useMemo } from 'react';
import Navbar from '../../../components/layout/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import SettingsModal from '../components/SettingsModal';
import { topCreators, mostActiveCreators } from '../../Creators/data/mockCreators';
import AppGrid, { apps } from '../../Home/components/AppGrid';

interface ProfilePageProps {
    profileId?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profileId }) => {
    const [activeTab, setActiveTab] = useState('work');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const tabs = [
        { id: 'work', label: 'Work' },
        { id: 'reviewed', label: 'Reviewed' },
        { id: 'collections', label: 'Collections' },
        { id: 'about', label: 'About' },
    ];

    const creator = useMemo(() => {
        if (!profileId) return null;
        const allCreators = [...topCreators, ...mostActiveCreators];
        return allCreators.find(c => c.id === profileId);
    }, [profileId]);

    const isOwnProfile = !profileId;

    return (
        <div className="min-h-screen bg-bodyBg">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <ProfileHeader
                    name={creator?.name}
                    handle={creator?.username}
                    role={creator ? "Creator" : undefined}
                    avatar={creator?.avatar}
                    isOwnProfile={isOwnProfile}
                    onEditClick={() => setIsSettingsOpen(true)}
                />

                {/* Tabs */}
                <div className="flex items-center justify-center gap-8 border-b border-linesColor mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                ? 'text-textColor'
                                : 'text-textColorWeak hover:text-textColor'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-textColor rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content Placeholder */}
                <div className="min-h-[400px]">
                    {activeTab === 'work' && (
                        <div className="animate-fade-in">
                            <AppGrid items={apps.slice(0, 4)} />
                        </div>
                    )}
                    {activeTab === 'reviewed' && (
                        <div className="flex items-center justify-center h-[400px] text-textColorWeak">
                            <p>Reviewed content goes here</p>
                        </div>
                    )}
                    {activeTab === 'collections' && (
                        <div className="flex items-center justify-center h-[400px] text-textColorWeak">
                            <p>Collections content goes here</p>
                        </div>
                    )}
                    {activeTab === 'about' && (
                        <div className="flex items-center justify-center h-[400px] text-textColorWeak">
                            <p>About content goes here</p>
                        </div>
                    )}
                </div>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
};

export default ProfilePage;
