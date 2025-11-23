import React from 'react';
import { RiPlayFill, RiLockFill } from 'react-icons/ri';

interface AppCardProps {
    title: string;
    description: string;
    image: string;
    icon: string;
    badge?: 'New' | 'Updated';
    isLocked?: boolean;
    hasVideo?: boolean;
}

const AppCard: React.FC<AppCardProps> = ({ title, description, image, icon, badge, isLocked, hasVideo }) => {
    return (
        <div className="group relative flex flex-col bg-transparent rounded-2xl overflow-hidden hover:bg-cardBg transition-colors duration-300 p-2">
            {/* Media Section */}
            <div className="relative aspect-[16/10] bg-cardBg overflow-hidden rounded-xl mb-3 border border-linesColor">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                {/* Badge */}
                {badge && (
                    <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md backdrop-blur-md shadow-sm">
                        {badge}
                    </div>
                )}

                {/* Top Right Icon (Video or Lock) */}
                <div className="absolute top-3 right-3">
                    {isLocked ? (
                        <div className="bg-black/50 p-1.5 rounded-full backdrop-blur-md text-white">
                            <RiLockFill className="text-xs" />
                        </div>
                    ) : hasVideo ? (
                        <div className="bg-black/50 p-1.5 rounded-full backdrop-blur-md text-white">
                            <RiPlayFill className="text-xs" />
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Content Section */}
            <div className="px-2 pb-2 flex items-center space-x-3">
                <img src={icon} alt={`${title} icon`} className="w-10 h-10 rounded-xl bg-cardBg border border-linesColor" />
                <div className="flex flex-col">
                    <h3 className="text-textColor text-sm font-semibold leading-tight">{title}</h3>
                    <p className="text-textColorWeak text-xs mt-0.5">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default AppCard;
