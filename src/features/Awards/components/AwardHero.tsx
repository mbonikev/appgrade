import React from 'react';
import type { AwardApp } from '../data/mockAwards';
import { RiTrophyFill } from 'react-icons/ri';
import Button from '../../../components/ui/Button';

interface AwardHeroProps {
    app: AwardApp;
}

const AwardHero: React.FC<AwardHeroProps> = ({ app }) => {
    return (
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
            {/* Background Image */}
            <img
                src={app.image}
                alt={app.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <RiTrophyFill />
                            App of the Day
                        </div>
                        <span className="text-white/80 text-sm font-medium px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                            {app.category}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {app.name}
                    </h2>
                    <p className="text-xl text-white/80 font-medium max-w-xl">
                        {app.tagline}
                    </p>
                    <p className="text-white/60 mt-2 text-sm">
                        by {app.developer}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        label="View Project"
                        className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg rounded-full font-bold"
                    />
                </div>
            </div>
        </div>
    );
};

export default AwardHero;
