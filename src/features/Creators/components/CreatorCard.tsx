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
            className="group relative bg-cardBg rounded-3xl overflow-hidden hover:bg-cardItemBg hover:transition-colors hover:duration-300 cursor-pointer flex flex-col h-full"
        >
            {/* Cover Image */}
            {/* <div className="h-24 w-full overflow-hidden">
                <img
                    src={creator.coverImage}
                    alt={`${creator.name} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div> */}

            {/* Avatar & Info */}
            <div className="px-5 py-5 flex-1 flex flex-col">
                <div className="mb-3 flex justify-between items-end">
                    <div className="relative">
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-20 h-20 rounded-full border border-cardBg group-hover:border-cardItemBg object-cover bg-cardBg"
                        />
                        {creator.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-cardBg rounded-full p-px flex">
                                <div className='size-[14px] top-0 left-0 right-0 bottom-0 m-auto bg-white rounded-full absolute z-0'></div>
                                <HiBadgeCheck className="text-blue-500 text-2xl z-20" />
                            </div>
                        )}
                    </div>
                    <button className="bg-mainColor text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:transition-colors duration-300">
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
