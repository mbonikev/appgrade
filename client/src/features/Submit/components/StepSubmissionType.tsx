import React from 'react';
import { RiLayoutMasonryLine, RiCodeSSlashLine } from 'react-icons/ri';

interface StepSubmissionTypeProps {
    onSelect: (type: 'design' | 'developed') => void;
}

const StepSubmissionType: React.FC<StepSubmissionTypeProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-col gap-6 py-8">
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-textColor">How was this created?</h3>
                <p className="text-textColorWeak mt-2">Choose the submission type.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect('design')}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-cardItemBg border border-linesColor hover:border-mainColor hover:bg-cardBg transition-all group"
                >
                    <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <RiLayoutMasonryLine className="text-2xl" />
                    </div>
                    <h4 className="font-bold text-textColor mb-2">Design UI</h4>
                    <p className="text-sm text-textColorWeak">Upload images of your design for feedback.</p>
                </button>

                <button
                    onClick={() => onSelect('developed')}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-cardItemBg border border-linesColor hover:border-mainColor hover:bg-cardBg transition-all group"
                >
                    <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <RiCodeSSlashLine className="text-2xl" />
                    </div>
                    <h4 className="font-bold text-textColor mb-2">Developed</h4>
                    <p className="text-sm text-textColorWeak">Submit a live link to your developed project.</p>
                </button>
            </div>
        </div>
    );
};

export default StepSubmissionType;
