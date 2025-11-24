import React from 'react';
import { HiTrendingUp, HiViewGrid, HiTemplate, HiCollection, HiLightningBolt } from 'react-icons/hi';

interface SearchSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'trending', label: 'Trending', icon: HiTrendingUp },
        { id: 'categories', label: 'Categories', icon: HiCollection },
        { id: 'screens', label: 'Screens', icon: HiViewGrid },
        { id: 'ui_elements', label: 'UI Elements', icon: HiTemplate },
        { id: 'flows', label: 'Flows', icon: HiLightningBolt },
        { id: 'themes', label: 'Themes', icon: HiCollection },
    ];

    return (
        <div className="w-64 border-r border-linesColor p-4 flex flex-col gap-2">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id
                            ? 'bg-cardItemBg text-white'
                            : 'text-textColorWeak hover:text-textColor hover:bg-cardBg'
                        }`}
                >
                    <item.icon className="text-lg" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SearchSidebar;
