import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

interface ScreensViewPageProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    title: string;
}

const ScreensViewPage: React.FC<ScreensViewPageProps> = ({
    isOpen,
    onClose,
    images,
    title
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < images.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] bg-black flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
                    <h2 className="text-white font-medium text-lg">{title}</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-white/60 text-sm">
                            {currentIndex + 1} / {images.length}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        >
                            <RiCloseLine className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                    <motion.img
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        src={images[currentIndex]}
                        alt={`${title} - Screen ${currentIndex + 1}`}
                        className="max-h-full max-w-full object-contain p-4"
                    />

                    {/* Navigation Arrows */}
                    {currentIndex > 0 && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                        >
                            <RiArrowLeftLine className="text-2xl" />
                        </button>
                    )}
                    {currentIndex < images.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                        >
                            <RiArrowRightLine className="text-2xl" />
                        </button>
                    )}
                </div>

                {/* Thumbnails (Optional - for future) */}
                <div className="h-20 bg-black/50 backdrop-blur-md flex items-center justify-center gap-2 p-4 overflow-x-auto">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-full aspect-video rounded-md overflow-hidden border-2 transition-colors ${idx === currentIndex ? 'border-mainColor' : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </AnimatePresence>
    );
};

export default ScreensViewPage;
