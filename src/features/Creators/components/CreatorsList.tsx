import React from 'react';
import CreatorCard from './CreatorCard';
import type { Creator } from '../data/types';

interface CreatorsListProps {
    title: string;
    creators: Creator[];
}

const CreatorsList: React.FC<CreatorsListProps> = ({ title, creators }) => {
    return (
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-textColor">{title}</h2>
                <button className="text-mainColor hover:text-mainColorHover font-semibold text-sm transition-colors">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {creators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                ))}
            </div>
        </div>
    );
};

export default CreatorsList;
