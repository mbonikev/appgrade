import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearch2Line, RiCloseLine, RiMacbookLine, RiSmartphoneLine } from 'react-icons/ri';
import SearchSidebar from './SearchSidebar';
import TrendingView from './TrendingView';
import ListPreviewView from './ListPreviewView';
import { categories, uiElements, flows, trendingScreens } from '../data/mockSearchData';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('trending');
    const [searchQuery, setSearchQuery] = useState('');

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const renderContent = () => {
        switch (activeTab) {
            case 'trending':
                return <TrendingView />;
            case 'categories':
                return <ListPreviewView items={categories} title="Categories" />;
            case 'ui_elements':
                return <ListPreviewView items={uiElements} title="UI Elements" />;
            case 'flows':
                return <ListPreviewView items={flows} title="Flows" />;
            case 'screens':
                return <ListPreviewView items={trendingScreens} title="Screens" />; // Reusing trendingScreens for now, ideally would be a full list
            default:
                return <TrendingView />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-5xl h-[80vh] bg-modalBg rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-linesColor"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4 p-4 border-b border-linesColor bg-modalBg z-10">
                            <RiSearch2Line className="text-textColorWeak text-xl" />
                            <input
                                type="text"
                                placeholder="Web Apps, Screens, UI Elements, Flows or Keywords..."
                                className="flex-1 bg-transparent text-lg text-textColor placeholder-textColorWeak outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <div className="flex items-center gap-2 text-textColorWeak">
                                <RiSmartphoneLine className="text-xl hover:text-textColor cursor-pointer" />
                                <RiMacbookLine className="text-xl hover:text-textColor cursor-pointer" />
                            </div>
                            <div className="w-px h-6 bg-linesColor mx-2" />
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-cardBg rounded-lg text-textColorWeak hover:text-textColor transition-colors"
                            >
                                <RiCloseLine className="text-2xl" />
                            </button>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-1 overflow-hidden bg-bodyBgWeak">
                            <SearchSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                            {renderContent()}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
