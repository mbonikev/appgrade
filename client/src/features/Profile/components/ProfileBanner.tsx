import React from 'react';

interface ProfileBannerProps {
    bannerUrl?: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ bannerUrl }) => {
    return (
        <div className="w-full h-64 md:h-80 bg-gray-200 relative overflow-hidden">
            <img
                src={bannerUrl || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"}
                alt="Profile Banner"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
    );
};

export default ProfileBanner;
