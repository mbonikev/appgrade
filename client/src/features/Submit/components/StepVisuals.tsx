import React from 'react';
import { RiImageAddLine, RiCodeSSlashLine, RiGalleryUploadLine } from 'react-icons/ri';

interface StepVisualsProps {
    data: {
        logo: File | null;
        coverImage: File | null;
        gallery: File[];
        videoUrl: string;
        codeSnippet?: string;
    };
    updateData: (data: any) => void;
    type: 'screens' | 'ui_elements' | 'themes';
    isDeveloped?: boolean;
}

const StepVisuals: React.FC<StepVisualsProps> = ({ data, updateData, type, isDeveloped }) => {
    // Mock file upload handlers
    const handleLogoUpload = () => {
        console.log("Logo upload clicked");
    };

    const handleCoverUpload = () => {
        console.log("Cover upload clicked");
    };

    const handleGalleryUpload = () => {
        console.log("Gallery upload clicked");
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-6">
                {/* Logo Upload - Always visible */}
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

                {/* Cover Image / Preview Upload */}
                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-medium text-textColor">
                        {type === 'screens' ? 'Cover Screen' : 'Preview Image'}
                    </label>
                    <div
                        onClick={handleCoverUpload}
                        className="w-full h-24 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group"
                    >
                        <RiImageAddLine className="text-2xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                        <span className="text-xs text-textColorWeak mt-1">
                            Upload {type === 'screens' ? 'Screen (16:10)' : 'Preview'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Gallery Upload - Only for Design UI Screens */}
            {type === 'screens' && !isDeveloped && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textColor">Project Screens (Gallery)</label>
                    <div
                        onClick={handleGalleryUpload}
                        className="w-full h-32 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group"
                    >
                        <RiGalleryUploadLine className="text-3xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                        <span className="text-sm text-textColorWeak mt-2">Upload multiple screens</span>
                        <span className="text-xs text-textColorWeak opacity-60">Supports PNG, JPG</span>
                    </div>
                    {data.gallery.length > 0 && (
                        <div className="text-sm text-textColorWeak mt-1">
                            {data.gallery.length} screens selected
                        </div>
                    )}
                </div>
            )}

            {/* Code Snippet - Only for UI Elements and Themes */}
            {(type === 'ui_elements' || type === 'themes') && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textColor">
                        {type === 'themes' ? 'Theme Config / CSS' : 'Component Code'}
                    </label>
                    <div className="relative">
                        <RiCodeSSlashLine className="absolute left-4 top-4 text-textColorWeak text-xl" />
                        <textarea
                            value={data.codeSnippet || ''}
                            onChange={(e) => updateData({ codeSnippet: e.target.value })}
                            placeholder={type === 'themes' ? "Paste your tailwind.config.js or CSS here..." : "Paste your React/HTML code here..."}
                            className="w-full h-32 bg-cardItemBg border border-linesColor rounded-xl pl-12 pr-4 py-3 text-textColor placeholder-textColorWeak focus:outline-none focus:border-mainColor transition-colors resize-none font-mono text-sm"
                        />
                    </div>
                </div>
            )}


        </div>
    );
};

export default StepVisuals;
