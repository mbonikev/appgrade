import React from 'react';

interface ProfileHeaderProps {
    name?: string;
    handle?: string;
    role?: string;
    avatar?: string;
    isOwnProfile?: boolean;
    onEditClick?: () => void;
    stats?: {
        projects: number;
        views: number;
        upvotes: number;
        awards: number;
        followers: number;
        following: number;
    };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name = "Thierry Gusenga",
    handle = "@strixx_legacy",
    role = "Product designer",
    avatar = "https://i.pinimg.com/736x/a9/70/8f/a9708f9840565fc2aae91b5847fcceab.jpg",
    isOwnProfile = true,
    onEditClick,
    stats
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

            {/* Stats Grid */}
            {stats && (
                <div className="flex items-center gap-8 mb-8 text-center">
                    <div>
                        <div className="text-lg font-bold text-textColor">{stats.projects}</div>
                        <div className="text-xs text-textColorWeak">Projects</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-textColor">{stats.views}</div>
                        <div className="text-xs text-textColorWeak">Views</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-textColor">{stats.followers}</div>
                        <div className="text-xs text-textColorWeak">Followers</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-textColor">{stats.following}</div>
                        <div className="text-xs text-textColorWeak">Following</div>
                    </div>
                </div>
            )}

            {isOwnProfile && onEditClick && (
                <button
                    onClick={onEditClick}
                    className="px-6 py-2 rounded-full border border-linesColor text-textColor font-medium hover:bg-cardBg transition-colors"
                >
                    Edit profile
                </button>
            )}
        </div>
    );
};

export default ProfileHeader;
