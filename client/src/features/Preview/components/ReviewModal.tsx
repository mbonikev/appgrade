import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiStarFill, RiStarLine, RiArrowLeftLine } from 'react-icons/ri';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { ux: number; ui: number; review: string }) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [ratings, setRatings] = useState({
        ux: 0,
        ui: 0,
        review: ''
    });

    const totalSteps = 4;

    const handleRating = (field: 'ux' | 'ui', value: number) => {
        setRatings(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(prev => prev + 1);
        } else {
            // Submit logic
            console.log('Submitted Review:', ratings);
            onSubmit(ratings);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };

    const renderStars = (field: 'ux' | 'ui') => {
        return (
            <div className="flex gap-2 justify-center my-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRating(field, star)}
                        className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                    >
                        {star <= ratings[field] ? (
                            <RiStarFill className="text-yellow-400" />
                        ) : (
                            <RiStarLine className="text-textColorWeak hover:text-yellow-400" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-textColor mb-2">How would you rate the User Experience?</h3>
                        <p className="text-textColorWeak mb-8">Do you find the app easy to use?</p>
                        {renderStars('ux')}
                    </div>
                );
            case 2:
                return (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-textColor mb-2">How would you rate the User Interface?</h3>
                        <p className="text-textColorWeak mb-8">Is the design visually pleasing? Does it feel delightful?</p>
                        {renderStars('ui')}
                    </div>
                );
            case 3:
                return (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-textColor mb-2">Write a review</h3>
                        <p className="text-textColorWeak mb-6">Anything else that you'd like to share?</p>
                        <textarea
                            value={ratings.review}
                            onChange={(e) => setRatings(prev => ({ ...prev, review: e.target.value }))}
                            placeholder="Your overall feedback..."
                            className="w-full h-32 bg-cardItemBg border border-linesColor rounded-xl p-4 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor resize-none"
                        />
                    </div>
                );
            case 4:
                return (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-textColor mb-6">Review Summary</h3>
                        <div className="bg-cardItemBg rounded-2xl p-6 text-left space-y-4">
                            <div className="flex justify-between items-center border-b border-linesColor pb-3">
                                <span className="text-textColorWeak font-medium">User Experience</span>
                                <div className="flex text-yellow-400 text-lg">
                                    {[...Array(5)].map((_, i) => (
                                        i < ratings.ux ? <RiStarFill key={i} /> : <RiStarLine key={i} className="text-textColorWeak" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-b border-linesColor pb-3">
                                <span className="text-textColorWeak font-medium">User Interface</span>
                                <div className="flex text-yellow-400 text-lg">
                                    {[...Array(5)].map((_, i) => (
                                        i < ratings.ui ? <RiStarFill key={i} /> : <RiStarLine key={i} className="text-textColorWeak" />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-textColorWeak font-medium block mb-2">Your Feedback</span>
                                <p className="text-textColor text-sm italic">
                                    "{ratings.review || 'No written feedback provided.'}"
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-bodyBg rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center">
                            {step > 1 ? (
                                <button onClick={handleBack} className="p-2 hover:bg-cardItemBg rounded-full text-textColor transition-colors">
                                    <RiArrowLeftLine className="text-xl" />
                                </button>
                            ) : (
                                <div className="w-9" /> // Spacer
                            )}
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div
                                        key={i}
                                        className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-mainColor' : 'bg-cardItemBg'}`}
                                    />
                                ))}
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-cardItemBg rounded-full text-textColor transition-colors">
                                <RiCloseLine className="text-xl" />
                            </button>
                        </div>

                        <div className="px-8 py-4 min-h-[300px] flex flex-col justify-center">
                            {renderStep()}
                        </div>

                        <div className="p-6 flex justify-center">
                            <button
                                onClick={handleNext}
                                disabled={(step === 1 && ratings.ux === 0) || (step === 2 && ratings.ui === 0)}
                                className={`px-12 py-3 rounded-full font-medium transition-all ${((step === 1 && ratings.ux === 0) || (step === 2 && ratings.ui === 0))
                                    ? 'bg-cardItemBg text-textColorWeak cursor-not-allowed'
                                    : 'bg-white text-black hover:scale-105 shadow-lg shadow-white/10'
                                    }`}
                            >
                                {step === totalSteps ? 'Submit Review' : 'Next'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;
