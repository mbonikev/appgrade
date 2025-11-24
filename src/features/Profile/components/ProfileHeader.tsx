import React from 'react';

interface ProfileHeaderProps {
    name?: string;
    handle?: string;
    role?: string;
    avatar?: string;
    isOwnProfile?: boolean;
    onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name = "Thierry Gusenga",
    handle = "@strixx_legacy",
    role = "Product designer",
    avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    isOwnProfile = true,
    onEditClick
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 rounded-full bg-cardBg border-4 border-bodyBg overflow-hidden mb-4">
                <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>
            <h1 className="text-3xl font-bold text-textColor mb-1">{name}</h1>
            <div className="flex items-center gap-2 text-textColorWeak text-sm mb-6">
                <span>{handle}</span>
                <span>·</span>
                <span>{role}</span>
            </div>
            {isOwnProfile ? (
                <button
                    onClick={onEditClick}
                    className="px-6 py-2 rounded-full border border-linesColor text-textColor font-medium hover:bg-cardBg transition-colors"
                >
                    Edit profile
                </button>
            ) : (
                <button className="px-6 py-2 rounded-full bg-mainColor text-white font-medium hover:bg-mainColorHover transition-colors">
                    Follow
                </button>
            )}
        </div>
    );
};

export default ProfileHeader;
