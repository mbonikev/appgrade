import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiMapPinTimeLine, RiCheckboxCircleLine } from "react-icons/ri";

interface ChangelogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.17 }}
                        className="absolute w-full top-0 left-0 inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.17 }}
                        className="relative w-full max-w-3xl h-[80vh] bg-modalBg rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-linesColor"
                    >
                        {/* Header */}
                        <div className="h-16 border-b border-linesColor flex items-center justify-between px-8 bg-cardBg">
                            <h2 className="text-lg font-semibold text-textColor">Changelog & Roadmap</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-cardItemBg rounded-full text-textColorWeak hover:text-textColor transition-colors"
                            >
                                <RiCloseLine className="text-xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-bodyBg">
                            <div className="max-w-2xl mx-auto">
                                <div className="mb-12">
                                    <p className="text-textColorWeak text-lg">Stay updated with our latest features and see what's coming next.</p>
                                </div>

                                {/* Roadmap / Coming Soon */}
                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-textColor mb-6 flex items-center gap-2">
                                        <RiMapPinTimeLine className="text-mainColor" />
                                        Coming Soon
                                    </h2>
                                    <div className="grid gap-4">
                                        <div className="bg-cardBg p-6 rounded-2xl border border-linesColor hover:border-mainColor/30 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">In Progress</span>
                                                <h3 className="text-lg font-bold text-textColor">User Dashboard</h3>
                                            </div>
                                            <p className="text-textColorWeak">A comprehensive dashboard for users to manage their submissions, view analytics, and track reviews.</p>
                                        </div>
                                        <div className="bg-cardBg p-6 rounded-2xl border border-linesColor hover:border-mainColor/30 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Planned</span>
                                                <h3 className="text-lg font-bold text-textColor">Community Discussions</h3>
                                            </div>
                                            <p className="text-textColorWeak">Engage with other developers and designers in dedicated discussion threads for each project.</p>
                                        </div>
                                        <div className="bg-cardBg p-6 rounded-2xl border border-linesColor hover:border-mainColor/30 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Planned</span>
                                                <h3 className="text-lg font-bold text-textColor">Advanced Search & Filtering</h3>
                                            </div>
                                            <p className="text-textColorWeak">More powerful search capabilities including filtering by tech stack, color palette, and more.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Released Versions */}
                                <div className="space-y-12">
                                    <h2 className="text-2xl font-bold text-textColor mb-6 flex items-center gap-2">
                                        <RiCheckboxCircleLine className="text-green-500" />
                                        Released
                                    </h2>

                                    {/* Version 1.0.0 */}
                                    <div className="relative pl-8 border-l border-linesColor">
                                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-mainColor ring-4 ring-bodyBg" />
                                        <div className="mb-2">
                                            <span className="text-sm font-medium text-mainColor bg-mainColor/10 px-2 py-1 rounded-md">v1.0.0</span>
                                            <span className="text-textColorWeak text-sm ml-3">November 26, 2025</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-textColor mb-4">Initial Release</h2>
                                        <ul className="space-y-3 text-textColorWeak">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-textColorWeak/50 shrink-0" />
                                                <span>Launched AppGrade platform for showcasing web applications.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-textColorWeak/50 shrink-0" />
                                                <span>Implemented project submission flow for Developers and Designers.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-textColorWeak/50 shrink-0" />
                                                <span>Added user profiles, authentication, and review system.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChangelogModal;
