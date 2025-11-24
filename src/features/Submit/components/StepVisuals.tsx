import React from 'react';
import { RiImageAddLine, RiVideoAddLine } from 'react-icons/ri';

interface StepVisualsProps {
    data: {
        logo: File | null;
        coverImage: File | null;
        gallery: File[];
        videoUrl: string;
    };
    updateData: (data: Partial<StepVisualsProps['data']>) => void;
}

const StepVisuals: React.FC<StepVisualsProps> = ({ data, updateData }) => {
    // Mock file upload handlers - in a real app these would handle file selection
    const handleLogoUpload = () => {
        // Simulate upload
        console.log("Logo upload clicked");
    };

    const handleCoverUpload = () => {
        console.log("Cover upload clicked");
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-6">
                {/* Logo Upload */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textColor">Logo</label>
                    <div
                        onClick={handleLogoUpload}
                        className="w-24 h-24 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group"
                    >
                        <RiImageAddLine className="text-2xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                        <span className="text-xs text-textColorWeak mt-1">Upload</span>
                    </div>
                </div>

                {/* Cover Image Upload */}
                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-medium text-textColor">Cover Image</label>
                    <div
                        onClick={handleCoverUpload}
                        className="w-full h-24 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group"
                    >
                        <RiImageAddLine className="text-2xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                        <span className="text-xs text-textColorWeak mt-1">Upload Cover (16:9 recommended)</span>
                    </div>
                </div>
            </div>

            {/* Video URL */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-textColor">Video Demo URL (Optional)</label>
                <div className="relative">
                    <RiVideoAddLine className="absolute left-4 top-1/2 -translate-y-1/2 text-textColorWeak text-xl" />
                    <input
                        type="url"
                        value={data.videoUrl}
                        onChange={(e) => updateData({ videoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-cardItemBg border border-linesColor rounded-xl pl-12 pr-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepVisuals;
