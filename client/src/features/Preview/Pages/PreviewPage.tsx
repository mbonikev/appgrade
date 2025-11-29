import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { RiBookmarkLine, RiBookmarkFill, RiChatSmile2Line, RiExternalLinkLine, RiStarFill, RiCodeSSlashLine, RiImageLine, RiFileCopyLine } from 'react-icons/ri';
import ReviewModal from '../components/ReviewModal';
import Navbar from '../../../components/layout/Navbar';
import api from '../../../lib/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PreviewPage: React.FC = () => {
    const { projectId } = useParams({ from: '/preview/$projectId' });
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [codeCopied, setCodeCopied] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/api/projects/${projectId}`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    const handleCopyCode = () => {
        if (project?.codeSnippet) {
            navigator.clipboard.writeText(project.codeSnippet);
            setCodeCopied(true);
            setTimeout(() => setCodeCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col h-screen bg-bodyBg">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex flex-col h-screen bg-bodyBg">
                <Navbar />
                <div className="flex-1 flex items-center justify-center text-textColor">
                    Project not found
                </div>
            </div>
        );
    }

    const isDeveloped = project.submissionType === 'developed';
    const hasCode = (project.type === 'theme' || project.type === 'ui_element') && project.codeSnippet;
    const initials = project.title?.substring(0, 2).toUpperCase() || 'PR';

    return (
        <div className="flex flex-col h-screen bg-bodyBg">
            <Navbar />
            {/* Toolbar */}
            <header className="h-14 bg-cardBg border-b border-linesColor flex items-center justify-between px-4 md:px-6 z-10 shadow-sm shrink-0">
                <div className="flex items-center gap-4 min-w-0 flex-1 mr-4">
                    <div className="h-6 w-px bg-linesColor shrink-0" />
                    <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-mainColor flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h1 className="font-bold text-textColor text-sm truncate">{project.title}</h1>
                            {isDeveloped && project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-textColorWeak hover:text-mainColor flex items-center gap-1 transition-colors truncate"
                                >
                                    <span className="truncate">{project.link}</span> <RiExternalLinkLine className="shrink-0" />
                                </a>
                            )}
                            {!isDeveloped && (
                                <span className="text-xs text-textColorWeak truncate">
                                    {project.type === 'screens' ? 'UI Design' : project.type === 'theme' ? 'Theme' : 'UI Element'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {/* Tabs for Themes/UI Elements */}
                    {hasCode && (
                        <div className="flex items-center bg-cardItemBg rounded-full p-1 mr-2">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'preview'
                                        ? 'bg-bodyBg text-textColor shadow-sm'
                                        : 'text-textColorWeak hover:text-textColor'
                                    }`}
                            >
                                <RiImageLine className="inline mr-1" />
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'code'
                                        ? 'bg-bodyBg text-textColor shadow-sm'
                                        : 'text-textColorWeak hover:text-textColor'
                                    }`}
                            >
                                <RiCodeSSlashLine className="inline mr-1" />
                                Code
                            </button>
                        </div>
                    )}

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
                    // Iframe for developed projects
                    <iframe
                        src={project.link}
                        className="w-full h-full border-none"
                        title="Project Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : hasCode && activeTab === 'code' ? (
                    // Code view for themes/UI elements
                    <div className="w-full h-full overflow-y-auto p-4 md:p-8">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-textColor">
                                    {project.type === 'theme' ? 'Theme Configuration' : 'Component Code'}
                                </h2>
                                <button
                                    onClick={handleCopyCode}
                                    className="flex items-center gap-2 px-4 py-2 bg-cardBg border border-linesColor rounded-lg text-textColor hover:bg-cardItemBg transition-colors"
                                >
                                    <RiFileCopyLine />
                                    {codeCopied ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-linesColor">
                                <SyntaxHighlighter
                                    language={project.type === 'theme' ? 'css' : 'jsx'}
                                    style={vscDarkPlus}
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: 0,
                                        fontSize: '14px',
                                    }}
                                >
                                    {project.codeSnippet || '// No code available'}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Image gallery for designs/themes/UI elements
                    <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex flex-col items-center gap-8">
                        {project.images?.map((img: string, index: number) => (
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

