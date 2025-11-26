import React from 'react';

interface StepEssentialsProps {
    data: {
        name: string;
        tagline: string;
        description: string;
        website: string;
        link?: string;
    };
    updateData: (data: Partial<StepEssentialsProps['data']>) => void;
    showLinkInput?: boolean;
}

const StepEssentials: React.FC<StepEssentialsProps> = ({ data, updateData, showLinkInput }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-textColor">Project Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateData({ name: e.target.value })}
                    placeholder="e.g. AppGrade"
                    className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-textColor">Tagline</label>
                <input
                    type="text"
                    value={data.tagline}
                    onChange={(e) => updateData({ tagline: e.target.value })}
                    placeholder="e.g. The best place to find apps"
                    className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-textColor">Description</label>
                <textarea
                    value={data.description}
                    onChange={(e) => updateData({ description: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors resize-none"
                />
            </div>



            {showLinkInput && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textColor">Project Link (Live URL)</label>
                    <input
                        type="url"
                        value={data.link || ''}
                        onChange={(e) => updateData({ link: e.target.value })}
                        placeholder="https://your-project-demo.com"
                        className="w-full bg-cardItemBg border border-linesColor rounded-xl px-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                    />
                </div>
            )}
        </div>
    );
};

export default StepEssentials;
