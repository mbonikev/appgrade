import React from 'react';
import { HiBadgeCheck, HiUserGroup, HiCube } from 'react-icons/hi';
import type { Creator } from '../data/types';

interface CreatorCardProps {
    creator: Creator;
}

import { Link } from '@tanstack/react-router';

// ... imports

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
    return (
        <Link
            to="/profile/$profileId"
            params={{ profileId: creator.id }}
            className="group relative bg-cardBg rounded-3xl overflow-hidden hover:bg-cardItemBg transition-colors duration-300 cursor-pointer flex flex-col h-full"
        >
            {/* Cover Image */}
            <div className="h-24 w-full overflow-hidden">
                <img
                    src={creator.coverImage}
                    alt={`${creator.name} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Avatar & Info */}
            <div className="px-5 pb-5 flex-1 flex flex-col">
                <div className="-mt-10 mb-3 flex justify-between items-end">
                    <div className="relative">
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-20 h-20 rounded-2xl border-4 border-cardBg group-hover:border-cardItemBg transition-colors duration-300 object-cover bg-cardBg"
                        />
                        {creator.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                <HiBadgeCheck className="text-blue-500 text-xl" />
                            </div>
                        )}
                    </div>
                    <button className="bg-mainColor/10 hover:bg-mainColor text-mainColor hover:text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors duration-300">
                        Follow
                    </button>
                </div>

                <div className="mb-4">
                    <h3 className="text-textColor text-lg font-bold flex items-center gap-1">
                        {creator.name}
                    </h3>
                    <p className="text-textColorWeak text-sm font-medium">{creator.username}</p>
                </div>

                <p className="text-textColorWeak text-sm line-clamp-2 mb-4 flex-1">
                    {creator.bio}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-linesColor">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-textColor">
                        <HiUserGroup className="text-textColorWeak text-lg" />
                        <span>{(creator.followers / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-textColor">
                        <HiCube className="text-textColorWeak text-lg" />
                        <span>{creator.appsCount} Apps</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CreatorCard;
