import React, { useMemo } from 'react';
import type { Creator } from '../../Creators/data/types';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { Link } from '@tanstack/react-router';

interface CreatorsViewProps {
    items: Creator[];
    searchQuery: string;
    onClose: () => void;
    selectedCategory?: string;
}

const CreatorsView: React.FC<CreatorsViewProps> = ({ items, searchQuery, onClose, selectedCategory = 'All' }) => {
    const filteredItems = useMemo(() => {
        let result = items;

        // Filter by category if needed (assuming creators have categories, if not, this might need adjustment or be omitted)
        // For now, assuming creators might not have categories directly, but if they did:
        // if (selectedCategory !== 'All') {
        //     result = result.filter(item => item.category === selectedCategory);
        // }

        if (!searchQuery) return result;
        const query = searchQuery.toLowerCase();
        return result.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.username.toLowerCase().includes(query)
        );
    }, [items, searchQuery, selectedCategory]);

    return (
        <div className="flex-1 overflow-y-auto px-6 py-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-textColor">Designers</h2>
                <span className="text-sm text-textColorWeak">{filteredItems.length} results</span>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-linesColor ">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-linesColor bg-cardItemBg/50">
                            <th className="p-4 font-medium text-textColorWeak text-sm">Designer</th>

                            <th className="p-4 font-medium text-textColorWeak text-sm text-right">Followers</th>
                            <th className="p-4 font-medium text-textColorWeak text-sm text-right">Apps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((creator) => (
                            <tr
                                key={creator.id}
                                className="border-b border-linesColor last:border-none hover:bg-cardItemBg transition-colors group"
                            >
                                <td className="px-4 py-3">
                                    <Link
                                        to="/profile/$profileId"
                                        params={{ profileId: creator.id }}
                                        onClick={onClose}
                                        className="flex items-center gap-3"
                                    >
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-textColor group-hover:text-mainColor transition-colors">{creator.name}</span>
                                                {creator.isVerified && (
                                                    <RiVerifiedBadgeFill className="text-blue-500 text-xs" />
                                                )}
                                            </div>
                                            <p className="text-xs text-textColorWeak">{creator.username}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-sm font-medium text-textColor">
                                        {(creator.followers / 1000).toFixed(1)}k
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-sm font-medium text-textColor">{creator.appsCount}</span>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-textColorWeak">
                                    No designers found matching "{searchQuery}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreatorsView;
