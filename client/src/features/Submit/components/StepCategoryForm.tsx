import React, { useState } from 'react';

interface StepCategoryFormProps {
    onSubmit: (data: { name: string; description: string }) => void;
}

const StepCategoryForm: React.FC<StepCategoryFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && description) {
            onSubmit({ name, description });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-textColor">Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. AI Tools"
                    className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-textColor">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what kind of projects belong here..."
                    rows={4}
                    className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors resize-none"
                    required
                />
            </div>
        </form>
    );
};

export default StepCategoryForm;
