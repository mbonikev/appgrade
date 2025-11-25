import React from 'react';
import { RiFolderOpenLine } from 'react-icons/ri';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionLabel, onAction }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-cardItemBg rounded-full flex items-center justify-center mb-4 text-textColorWeak">
                <RiFolderOpenLine className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-textColor mb-2">{title}</h3>
            <p className="text-textColorWeak max-w-sm mb-6">{description}</p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-2 bg-mainColor text-white rounded-full font-medium hover:bg-mainColorHover transition-colors shadow-lg shadow-mainColor/20"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
