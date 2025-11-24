import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { RiArrowLeftLine, RiBookmarkLine, RiBookmarkFill, RiChatSmile2Line, RiExternalLinkLine } from 'react-icons/ri';
import ReviewModal from '../components/ReviewModal';
import Navbar from '../../../components/layout/Navbar';

const PreviewPage: React.FC = () => {
    // const { projectId } = useParams({ from: '/preview/$projectId' });
    const navigate = useNavigate();
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // In a real app, we would fetch project details using projectId
    // For now, we'll use the demo URL as requested
    const projectUrl = "https://itk-equity.vercel.app/";
    const projectName = "ITK Equity";

    return (
        <div className="flex flex-col h-screen bg-bodyBg">
            <Navbar />
            {/* Toolbar */}
            <header className="h-14 bg-cardBg border-b border-linesColor flex items-center justify-between px-6 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate({ to: '/' })}
                        className="p-2 hover:bg-cardItemBg rounded-full text-textColor transition-colors"
                    >
                        <RiArrowLeftLine className="text-xl" />
                    </button>
                    <div className="h-6 w-px bg-linesColor" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-mainColor flex items-center justify-center text-white font-bold text-sm">
                            IE
                        </div>
                        <div>
                            <h1 className="font-bold text-textColor text-sm">{projectName}</h1>
                            <a
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-textColorWeak hover:text-mainColor flex items-center gap-1 transition-colors"
                            >
                                {projectUrl} <RiExternalLinkLine />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
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
                    <button
                        onClick={() => setIsReviewOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors text-sm"
                    >
                        <RiChatSmile2Line className="text-lg" />
                        Write a Review
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 bg-bodyBgWeak relative p-4 md:p-6 lg:p-8">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-linesColor bg-cardBg">
                    <iframe
                        src={projectUrl}
                        className="w-full h-full border-none"
                        title="Project Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
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
