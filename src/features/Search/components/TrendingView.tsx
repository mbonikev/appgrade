import React from 'react';
import { trendingApps, trendingScreens, searchTags } from '../data/mockSearchData';
import { RiSearch2Line } from 'react-icons/ri';

const TrendingView: React.FC = () => {
    return (
        <div className="flex-1 p-6 overflow-y-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
                {searchTags.map((tag, index) => (
                    <button
                        key={index}
                        className="flex items-center gap-2 bg-cardBg hover:bg-cardItemBg px-4 py-2 rounded-full text-sm font-medium text-textColor transition-colors border border-linesColor"
                    >
                        {tag.icon ? (
                            <img src={tag.icon} alt={tag.label} className="w-5 h-5 rounded-full" />
                        ) : (
                            <RiSearch2Line className="text-textColorWeak text-lg" />
                        )}
                        {tag.label}
                    </button>
                ))}
            </div>

            {/* Apps Row */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                {trendingApps.map((app) => (
                    <div key={app.id} className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl p-3 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center shadow-sm">
                        <img src={app.image} alt={app.name} className="w-full h-full object-contain" />
                    </div>
                ))}
            </div>

            {/* Screens Grid */}
            <div>
                <h3 className="text-textColorWeak text-sm font-medium mb-4">Screens</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trendingScreens.map((screen) => (
                        <div key={screen.id} className="group cursor-pointer">
                            <div className="aspect-[4/3] bg-cardBg rounded-2xl overflow-hidden mb-2 relative border border-linesColor">
                                <img
                                    src={screen.image}
                                    alt={screen.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                            <p className="text-textColor font-bold text-base px-1">{screen.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingView;
