import React from 'react';
import { HiStar } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface AwardCardProps {
    title: string;
    appName: string;
    image: string;
    category: string;
    awardType: 'sotd' | 'uiux' | 'functionality';
    rating: number;
}

const AwardCard: React.FC<AwardCardProps> = ({ title, appName, image, category, awardType, rating }) => {
    const getBadgeColor = () => {
        switch (awardType) {
            case 'sotd': return 'bg-mainColor text-white';
            case 'uiux': return 'bg-purple-500 text-white';
            case 'functionality': return 'bg-orange-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="relative group overflow-hidden rounded-3xl bg-cardBg border border-linesColor shadow-sm h-full"
        >
            <div className="absolute top-4 left-4 z-10">
                <span className={`${getBadgeColor()} text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider`}>
                    {title}
                </span>
            </div>

            <div className="h-full flex flex-col">
                <div className="flex-1 relative overflow-hidden">
                    <img
                        src={image}
                        alt={appName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/80 text-sm font-medium mb-1">{category}</p>
                                <h3 className="text-white text-2xl font-bold">{appName}</h3>
                            </div>
                            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg">
                                <HiStar className="text-yellow-400" />
                                <span className="text-white font-bold">{rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AwardsSection = () => {
    const awards = [
        {
            id: 1,
            title: "Site of the Day",
            appName: "Lumina",
            image: "https://cdn.dribbble.com/userupload/13546789/file/original-135467890.jpg", // Placeholder
            category: "AI Platform",
            awardType: 'sotd' as const,
            rating: 4.9
        },
        {
            id: 2,
            title: "Best UI/UX",
            appName: "Velvet",
            image: "https://cdn.dribbble.com/users/418188/screenshots/16382746/media/9f664535359483321523456789.jpg", // Placeholder
            category: "Finance",
            awardType: 'uiux' as const,
            rating: 4.8
        },
        {
            id: 3,
            title: "Honorable Mention",
            appName: "Echo",
            image: "https://cdn.dribbble.com/users/123456/screenshots/12345678/media/123456789.jpg", // Placeholder
            category: "Music",
            awardType: 'functionality' as const,
            rating: 4.7
        }
    ];

    return (
        <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
                <HiStar className="text-mainColor text-xl" />
                <h2 className="text-xl font-bold text-textColor">Featured Awards</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px] max-lg:h-auto">
                {/* Main Feature - Site of the Day */}
                <div className="lg:col-span-2 h-full max-lg:h-[400px]">
                    <AwardCard {...awards[0]} />
                </div>

                {/* Side Features */}
                <div className="flex flex-col gap-6 h-full">
                    <div className="flex-1 max-lg:h-[250px]">
                        <AwardCard {...awards[1]} />
                    </div>
                    <div className="flex-1 max-lg:h-[250px]">
                        <AwardCard {...awards[2]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwardsSection;
