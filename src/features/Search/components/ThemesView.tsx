import React from 'react';
import type { SearchItem } from '../data/mockSearchData';

interface ThemesViewProps {
    items: SearchItem[];
}

const ThemesView: React.FC<ThemesViewProps> = ({ items }) => {
    return (
        <div className="flex-1 h-full overflow-y-auto px-6 py-2">
            <h3 className="text-textColorWeak text-sm font-medium mb-4">Themes</h3>
            <div className="flex flex-col gap-1">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-cardItemBg transition-colors group"
                    >
                        <div className="flex flex-col">
                            <span className="text-textColor font-medium transition-colors">
                                {item.name}
                            </span>
                            <span className="text-textColorWeak text-xs transition-colors">
                                Community theme
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            {item.font && (
                                <span className="text-textColorWeak text-sm transition-colors">
                                    {item.font}
                                </span>
                            )}

                            {item.colors && (
                                <div className="flex items-center gap-2">
                                    {item.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-7 rounded-full aspect-square ring-1 ring-linesColor shadow-md"
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
