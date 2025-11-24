import React from 'react';
import type { SearchItem } from '../data/mockSearchData';

interface CategoriesViewProps {
    items: SearchItem[];
}

const CategoriesView: React.FC<CategoriesViewProps> = ({ items }) => {
    return (
        <div className="flex-1 h-full overflow-y-auto px-6 py-4">
            <h3 className="text-white text-base font-semibold mb-4">Browse Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pb-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`relative h-40 rounded-xl p-4 cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden bg-gradient-to-br ${item.gradient || 'from-gray-700 to-gray-900'}`}
                    >
                        <div className="absolute bottom-4 left-4 z-10">
                            <h4 className="text-white font-semibold text-sm leading-tight">
                                {item.name}
                            </h4>
                        </div>

                        {item.image && (
                            <div className="absolute -top-2 -right-2 w-20 h-20 flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain drop-shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesView;