import React from 'react';
import { motion } from 'framer-motion';

interface ProfileTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isOwnProfile: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange, isOwnProfile }) => {
    const tabs = [
        { id: 'work', label: 'Work' },
        ...(isOwnProfile ? [{ id: 'saved', label: 'Saved' }] : []),
        { id: 'awards', label: 'Awards' },
        { id: 'about', label: 'About' },
    ];

    return (
        <div className="flex items-center justify-center gap-8 border-b border-linesColor mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                        ? 'text-textColor'
                        : 'text-textColorWeak hover:text-textColor'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-textColor rounded-t-full"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;
