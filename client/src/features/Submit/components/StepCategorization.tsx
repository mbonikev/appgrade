import React, { useState } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';

interface StepCategorizationProps {
    data: {
        categories: string[];
        tags: string[];
    };
    updateData: (data: Partial<StepCategorizationProps['data']>) => void;
}

const StepCategorization: React.FC<StepCategorizationProps> = ({ data, updateData }) => {
    const [newCategory, setNewCategory] = useState('');
    const [newTag, setNewTag] = useState('');

    const availableCategories = [
        "Productivity", "Design", "Development", "Marketing", "Finance", "Social", "Entertainment"
    ];

    const handleAddCategory = () => {
        if (newCategory && !data.categories.includes(newCategory)) {
            updateData({ categories: [...data.categories, newCategory] });
            setNewCategory('');
        }
    };

    const handleToggleCategory = (category: string) => {
        if (data.categories.includes(category)) {
            updateData({ categories: data.categories.filter(c => c !== category) });
        } else {
            updateData({ categories: [...data.categories, category] });
        }
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag) {
            e.preventDefault();
            if (!data.tags.includes(newTag)) {
                updateData({ tags: [...data.tags, newTag] });
                setNewTag('');
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        updateData({ tags: data.tags.filter(tag => tag !== tagToRemove) });
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Categories */}
            <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-textColor">Categories</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {availableCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleToggleCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${data.categories.includes(category)
                                    ? 'bg-mainColor text-white border-mainColor'
                                    : 'bg-cardItemBg text-textColor border-linesColor hover:border-mainColor'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add custom category..."
                        className="flex-1 bg-cardItemBg border border-linesColor rounded-xl px-4 py-2 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                    />
                    <button
                        onClick={handleAddCategory}
                        disabled={!newCategory}
                        className="px-4 py-2 bg-cardItemBg border border-linesColor rounded-xl text-textColor hover:bg-mainColor hover:text-white hover:border-mainColor transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RiAddLine className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-textColor">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {data.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-cardItemBg border border-linesColor rounded-lg text-sm text-textColor flex items-center gap-2">
                            #{tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                                <RiCloseLine />
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Type a tag and press Enter..."
                    className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                />
            </div>
        </div>
    );
};

export default StepCategorization;
