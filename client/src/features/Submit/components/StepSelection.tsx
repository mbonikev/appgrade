import React from 'react';
import { RiLayoutGridFill, RiPriceTag3Fill, RiFileCodeFill, RiSmartphoneLine } from 'react-icons/ri';

interface StepSelectionProps {
    onSelect: (type: 'design' | 'developed' | 'ui_elements' | 'themes') => void;
}

const StepSelection: React.FC<StepSelectionProps> = ({ onSelect }) => {
    const options = [
        {
            id: 'design',
            title: 'Design UI',
            description: 'Upload screens for UI/UX testing and feedback.',
            icon: RiLayoutGridFill,
            color: 'bg-blue-500',
        },
        {
            id: 'developed',
            title: 'Developed App',
            description: 'Share a fully developed application with a link.',
            icon: RiSmartphoneLine,
            color: 'bg-green-500',
        },
        {
            id: 'ui_elements',
            title: 'UI Elements',
            description: 'Share components with code and previews.',
            icon: RiFileCodeFill,
            color: 'bg-purple-500',
        },
        {
            id: 'themes',
            title: 'Themes',
            description: 'Share Tailwind CSS themes and styles.',
            icon: RiPriceTag3Fill,
            color: 'bg-orange-500',
        },
    ] as const;

    return (
        <div className="flex flex-col gap-6 py-8">
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-textColor">What would you like to add?</h3>
                <p className="text-textColorWeak mt-2">Choose the type of content you want to submit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.id)}
                        className="flex flex-col items-center text-center p-6 rounded-2xl bg-cardItemBg border border-linesColor hover:border-mainColor hover:bg-cardBg transition-all group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${option.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <option.icon className="text-2xl" />
                        </div>
                        <h4 className="font-bold text-textColor mb-2">{option.title}</h4>
                        <p className="text-sm text-textColorWeak">{option.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StepSelection;
