import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { AwardApp } from '../data/mockAwards';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface NomineesCarouselProps {
    category: string;
    nominees: AwardApp[];
}

const NomineesCarousel: React.FC<NomineesCarouselProps> = ({ category, nominees }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="w-full bg-bodyBg py-12">
            <div className="max-w-[1300px] mx-auto px-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-textColor mb-1">
                            {category} Nominees
                        </h3>
                        <p className="text-sm text-textColorWeak">
                            Other outstanding submissions
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-cardItemBg hover:bg-cardBg text-textColor transition-colors"
                            aria-label="Scroll left"
                        >
                            <RiArrowLeftSLine className="text-xl" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-cardItemBg hover:bg-cardBg text-textColor transition-colors"
                            aria-label="Scroll right"
                        >
                            <RiArrowRightSLine className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Nominees Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {nominees.map((nominee, index) => (
                        <motion.div
                            key={nominee.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-[280px] group cursor-pointer"
                        >
                            {/* Nominee Card */}
                            <div className="bg-cardBg rounded-2xl overflow-hidden border border-linesColor hover:border-mainColor transition-all duration-300 group-hover:shadow-lg">
                                {/* Rank Badge */}
                                <div className="relative">
                                    <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                        #{index + 1}
                                    </div>

                                    {/* Cover Image */}
                                    <div className="aspect-[16/10] bg-cardItemBg overflow-hidden">
                                        <img
                                            src={nominee.image}
                                            alt={nominee.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-start gap-3">
                                        {/* Logo */}
                                        <img
                                            src={nominee.logo}
                                            alt={`${nominee.name} logo`}
                                            className="w-10 h-10 rounded-full bg-cardItemBg flex-shrink-0"
                                        />

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-semibold text-textColor truncate mb-1">
                                                {nominee.name}
                                            </h4>
                                            <p className="text-sm text-textColorWeak truncate">
                                                {nominee.tagline}
                                            </p>
                                            <p className="text-xs text-textColorWeak mt-1">
                                                by {nominee.developer}
                                            </p>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <button className="w-full mt-4 px-4 py-2 bg-cardItemBg hover:bg-mainColor hover:text-white text-textColor text-sm font-medium rounded-lg transition-colors">
                                        View
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NomineesCarousel;
