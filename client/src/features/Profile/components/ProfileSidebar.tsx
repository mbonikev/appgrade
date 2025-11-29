import React from "react";
import {
  RiVerifiedBadgeFill,
  RiMapPinLine,
  RiLink,
  RiCalendarLine,
} from "react-icons/ri";

interface ProfileSidebarProps {
  user: {
    name: string;
    username: string;
    role: string;
    avatar: string;
    bio?: string;
    website?: string;
    location?: string;
    joinedDate?: string;
    isVerified?: boolean;
  };
  stats: {
    followers: number;
    following: number;
    projects: number;
    views?: number;
    likes?: number;
  };
  isOwnProfile: boolean;
  onEditClick?: () => void;
}
export const getHighResAvatar = (url: string) => {
  if (!url) return url;

  if (url.includes("googleusercontent")) {
    return url.replace(/=s\d+-c/, "=s300-c");
  }

  return url;
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  stats,
  isOwnProfile,
  onEditClick,
}) => {
  return (
    <div className="flex flex-col gap-6 relative -mt-20 px-4 md:px-0">
      {/* Avatar */}
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-bodyBg overflow-hidden bg-cardBg shadow-lg">
        <img
          src={getHighResAvatar(user.avatar)}
        //   alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-textColor">{user.name}</h1>
            {user.isVerified && (
              <RiVerifiedBadgeFill className="text-blue-500" />
            )}
          </div>
          <p className="text-textColorWeak">@{user.username}</p>
        </div>

        {user.bio && (
          <p className="text-textColor leading-relaxed text-sm">{user.bio}</p>
        )}

        {/* Metadata */}
        <div className="flex flex-col gap-2 text-sm text-textColorWeak">
          {user.location && (
            <div className="flex items-center gap-2">
              <RiMapPinLine />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-mainColor transition-colors"
            >
              <RiLink />
              <span className="truncate max-w-[200px]">
                {user.website.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}
          {user.joinedDate && (
            <div className="flex items-center gap-2">
              <RiCalendarLine />
              <span>Joined {user.joinedDate}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 py-4 border-y border-linesColor">
          <div className="flex flex-col">
            <span className="font-bold text-textColor text-lg">
              {(stats.followers / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-textColorWeak">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-textColor text-lg">
              {stats.projects}
            </span>
            <span className="text-xs text-textColorWeak">Posts</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-textColor text-lg">
              {(stats.likes || 0 / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-textColorWeak">Likes</span>
          </div>
        </div>

        {/* Actions */}
        {isOwnProfile ? (
          <button
            onClick={onEditClick}
            className="w-full py-2.5 rounded-xl border border-linesColor text-textColor font-medium hover:bg-cardBg transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 rounded-xl bg-mainColor text-white font-medium hover:bg-mainColorHover transition-colors shadow-lg shadow-mainColor/20">
              Follow
            </button>
            <button className="flex-1 py-2.5 rounded-xl border border-linesColor text-textColor font-medium hover:bg-cardBg transition-colors">
              Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
