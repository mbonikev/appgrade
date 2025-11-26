import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { RiArrowLeftLine, RiBookmarkLine, RiBookmarkFill, RiChatSmile2Line, RiExternalLinkLine, RiStarFill } from 'react-icons/ri';
import ReviewModal from '../components/ReviewModal';
import Navbar from '../../../components/layout/Navbar';

const PreviewPage: React.FC = () => {
    // const { projectId } = useParams({ from: '/preview/$projectId' });
    const navigate = useNavigate();
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Mock Data - In real app, fetch based on ID
    // Scenario 1: Developed App
    const project = {
        name: "ITK Equity",
        url: "https://itk-equity.vercel.app/",
        type: "project",
        submissionType: "developed",
        initials: "IE"
    };

    // Scenario 2: Design UI / Theme / UI Element
    // const project = {
    //     name: "Modern Dashboard UI",
    //     url: "", // No live URL for designs usually, or maybe a link to Figma?
    //     type: "screens", // or 'ui_elements', 'themes'
    //     submissionType: "design",
    //     initials: "MD",
    //     images: [
    //         "https://cdn.dribbble.com/userupload/13004326/file/original-4e650352497645068962638848805626.png?resize=1504x1128",
    //         "https://cdn.dribbble.com/userupload/13004327/file/original-4e650352497645068962638848805626.png?resize=1504x1128" // Mock images
    //     ]
    // };

    const isDeveloped = project.submissionType === 'developed';

    return (
        <div className="flex flex-col h-screen bg-bodyBg">
            <Navbar />
            {/* Toolbar */}
            <header className="h-14 bg-cardBg border-b border-linesColor flex items-center justify-between px-4 md:px-6 z-10 shadow-sm shrink-0">
                <div className="flex items-center gap-4 min-w-0 flex-1 mr-4">
                    {/* <button
                        onClick={() => window.history.back()}
                        className="p-2 -ml-2 hover:bg-cardItemBg rounded-full text-textColor transition-colors"
                    >
                        <RiArrowLeftLine />
                    </button> */}
                    <div className="h-6 w-px bg-linesColor shrink-0" />
                    <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-mainColor flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {project.initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h1 className="font-bold text-textColor text-sm truncate">{project.name}</h1>
                            {isDeveloped && project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-textColorWeak hover:text-mainColor flex items-center gap-1 transition-colors truncate"
                                >
                                    <span className="truncate">{project.url}</span> <RiExternalLinkLine className="shrink-0" />
                                </a>
                            )}
                            {!isDeveloped && (
                                <span className="text-xs text-textColorWeak truncate">
                                    {project.type === 'screens' ? 'UI Design' : project.type === 'themes' ? 'Theme' : 'UI Element'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className="p-2 hover:bg-cardItemBg rounded-full text-textColor transition-colors"
                        title="Save Project"
                    >
                        {isSaved ? (
                            <RiBookmarkFill className="text-xl text-mainColor" />
                        ) : (
                            <RiBookmarkLine className="text-xl" />
                        )}
                    </button>

                    {/* Review Button */}
                    <button
                        onClick={() => setIsReviewOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-textColor text-bodyBg rounded-full font-medium hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
                    >
                        {isDeveloped ? <RiStarFill className="text-lg text-orange-500" /> : <RiChatSmile2Line className="text-lg" />}
                        <span className="hidden sm:inline">{isDeveloped ? "Rate & Review" : "Review Design"}</span>
                        <span className="sm:hidden">Review</span>
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 bg-bodyBgWeak relative overflow-hidden">
                {isDeveloped ? (
                    <iframe
                        src={project.url}
                        className="w-full h-full border-none"
                        title="Project Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex flex-col items-center gap-8">
                        {/* Display Images for Design/Themes */}
                        {project.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Preview ${index + 1}`}
                                className="max-w-full rounded-xl shadow-lg border border-linesColor"
                            />
                        ))}
                        {(!project.images || project.images.length === 0) && (
                            <div className="flex flex-col items-center justify-center h-full text-textColorWeak">
                                <p>No preview images available.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Review Modal */}
            <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                onSubmit={() => {
                    setIsReviewOpen(false);
                }}
            />
        </div>
    );
};

export default PreviewPage;
