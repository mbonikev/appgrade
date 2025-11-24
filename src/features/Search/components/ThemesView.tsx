import React from 'react';
import type { SearchItem } from '../data/mockSearchData';

interface ThemesViewProps {
    items: SearchItem[];
}

const ThemesView: React.FC<ThemesViewProps> = ({ items }) => {
    return (
        <div className="flex-1 h-full overflow-y-auto p-6">
            <h3 className="text-textColorWeak text-sm font-medium mb-4">Themes</h3>
            <div className="flex flex-col gap-1">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-cardItemBg transition-colors group"
                    >
                        <div className="flex flex-col">
                            <span className="text-textColor font-medium group-hover:text-white transition-colors">
                                {item.name}
                            </span>
                            <span className="text-textColorWeak text-xs group-hover:text-white/60 transition-colors">
                                Community theme
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            {item.font && (
                                <span className="text-textColorWeak text-sm group-hover:text-white/60 transition-colors">
                                    {item.font}
                                </span>
                            )}

                            {item.colors && (
                                <div className="flex items-center gap-1">
                                    {item.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-6 h-8 rounded-sm border border-linesColor/20"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemesView;
