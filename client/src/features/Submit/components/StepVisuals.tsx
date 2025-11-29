import React, { useRef, useState } from 'react';
import { RiImageAddLine, RiCodeSSlashLine, RiGalleryUploadLine, RiCloseLine } from 'react-icons/ri';

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
    const logoInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateData({ logo: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateData({ coverImage: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            updateData({ gallery: [...data.gallery, ...files] });

            // Create previews
            const newPreviews: string[] = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    if (newPreviews.length === files.length) {
                        setGalleryPreviews([...galleryPreviews, ...newPreviews]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeGalleryImage = (index: number) => {
        const newGallery = data.gallery.filter((_, i) => i !== index);
        const newPreviews = galleryPreviews.filter((_, i) => i !== index);
        updateData({ gallery: newGallery });
        setGalleryPreviews(newPreviews);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-6">
                {/* Logo Upload */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textColor">Logo</label>
                    <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                    />
                    <div
                        onClick={() => logoInputRef.current?.click()}
                        className="w-24 h-24 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group overflow-hidden"
                    >
                        {logoPreview ? (
                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <RiImageAddLine className="text-2xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                                <span className="text-xs text-textColorWeak mt-1">Upload</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Cover Image / Preview Upload */}
                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-medium text-textColor">
                        {type === 'screens' ? 'Cover Screen' : 'Preview Image'}
                    </label>
                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                    />
                    <div
                        onClick={() => coverInputRef.current?.click()}
                        className="w-full h-24 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group overflow-hidden"
                    >
                        {coverPreview ? (
                            <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <RiImageAddLine className="text-2xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                                <span className="text-xs text-textColorWeak mt-1">
                                    Upload {type === 'screens' ? 'Screen (16:10)' : 'Preview'}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Upload - Only for Design UI Screens */}
            {type === 'screens' && !isDeveloped && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textColor">Project Screens (Gallery)</label>
                    <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                    />
                    <div
                        onClick={() => galleryInputRef.current?.click()}
                        className="w-full h-32 rounded-2xl border-2 border-dashed border-linesColor bg-cardItemBg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor transition-colors group"
                    >
                        <RiGalleryUploadLine className="text-3xl text-textColorWeak group-hover:text-mainColor transition-colors" />
                        <span className="text-sm text-textColorWeak mt-2">Upload multiple screens</span>
                        <span className="text-xs text-textColorWeak opacity-60">Supports PNG, JPG</span>
                    </div>
                    {data.gallery.length > 0 && (
                        <div className="mt-4">
                            <div className="text-sm text-textColorWeak mb-2">
                                {data.gallery.length} screens selected
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {galleryPreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-20 object-cover rounded-lg border border-linesColor"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeGalleryImage(index);
                                            }}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <RiCloseLine size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
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

