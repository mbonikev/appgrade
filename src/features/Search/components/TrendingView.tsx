import React from "react";
import {
  trendingApps,
  trendingScreens,
  searchTags,
} from "../data/mockSearchData";
import { RiSearch2Line } from "react-icons/ri";

interface TrendingViewProps {
  selectedCategory?: string;
}

const TrendingView: React.FC<TrendingViewProps> = ({ selectedCategory = 'All' }) => {
  const filteredApps = selectedCategory === 'All'
    ? trendingApps
    : trendingApps.filter(app => app.category === selectedCategory);

  const filteredScreens = selectedCategory === 'All'
    ? trendingScreens
    : trendingScreens.filter(screen => screen.category === selectedCategory);

  return (
    <div className="flex-1 px-6 py-2 overflow-y-auto">
      {/* Recent Searchs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {searchTags.map((tag, index) => (
          <button
            key={index}
            className="flex items-center gap-2 bg-cardBg hover:bg-cardItemBg px-4 py-2 rounded-full text-sm font-medium text-textColor transition-colors border border-linesColor"
          >
            <RiSearch2Line className="text-textColorWeak text-lg" />
            {tag.label}
          </button>
        ))}
      </div>

      {/* Apps Row */}
      <h3 className="text-textColorWeak text-sm font-medium mb-4">Apps</h3>
      <div className="flex flex-wrap gap-4 mb-8 p-1 overflow-x-auto pb-4 scrollbar-hide">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="flex-shrink-0 size-16 bg-cardBg ring-1 ring-linesColor rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform flex items-center justify-center shadow-sm"
          >
            <img
              src={app.image}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Screens Grid */}
      <div>
        <h3 className="text-textColorWeak text-sm font-medium mb-4">Screens</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredScreens.slice(0, 4).map((screen) => (
            <div key={screen.id} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-cardBg rounded-2xl overflow-hidden mb-2 relative border border-linesColor">
                <img
                  src={screen.image}
                  alt={screen.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <p className="text-textColor font-medium text-base px-1">
                {screen.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingView;
