import React from 'react';
import { RiLayoutGridFill, RiPriceTag3Fill, RiFileCodeFill } from 'react-icons/ri';

interface StepSelectionProps {
    onSelect: (type: 'project' | 'category' | 'template') => void;
}

const StepSelection: React.FC<StepSelectionProps> = ({ onSelect }) => {
    const options = [
        {
            id: 'project',
            title: 'New Project',
            description: 'Submit a new application or tool to the directory.',
            icon: RiLayoutGridFill,
            color: 'bg-blue-500',
        },
        {
            id: 'category',
            title: 'New Category',
            description: 'Propose a new category for organizing projects.',
            icon: RiPriceTag3Fill,
            color: 'bg-purple-500',
        },
        {
            id: 'template',
            title: 'New Template',
            description: 'Share a project template for others to use.',
            icon: RiFileCodeFill,
            color: 'bg-orange-500',
        },
    ] as const;

    return (
        <div className="flex flex-col gap-6 py-8">
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-textColor">What would you like to add?</h3>
                <p className="text-textColorWeak mt-2">Choose the type of content you want to submit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
