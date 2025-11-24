import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearch2Line, RiCloseLine } from 'react-icons/ri';
import SearchSidebar from './SearchSidebar';
import TrendingView from './TrendingView';
import ListPreviewView from './ListPreviewView';
import ThemesView from './ThemesView';
import CreatorsView from './CreatorsView';
import { uiElements, trendingScreens, themes } from '../data/mockSearchData';
import { topCreators, mostActiveCreators } from '../../Creators/data/mockCreators';

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
            // case 'categories':
            //     return <ListPreviewView items={categories} title="Categories" />;
            case 'ui_elements':
                return <ListPreviewView items={uiElements} title="UI Elements" />;
            // case 'flows':
            //     return <ListPreviewView items={flows} title="Flows" />;
            case 'screens':
                return <ListPreviewView items={trendingScreens} title="Screens" />;
            case 'themes':
                return <ThemesView items={themes} />;
            case 'creators':
                return <CreatorsView items={[...topCreators, ...mostActiveCreators]} searchQuery={searchQuery} onClose={onClose} />;
            default:
                return <TrendingView />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-md:p-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-5xl h-[80vh] max-md:h-svh bg-modalBg rounded-3xl max-md:rounded-none shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-5 py-3 px-5 bg-modalBg z-10">
                            <RiSearch2Line className="text-textColorWeak text-xl" />
                            <input
                                type="text"
                                placeholder="Web Apps, Screens, UI Elements, Creators or Keywords..."
                                className="flex-1 bg-transparent text-base text-textColor placeholder-textColorWeak outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />

                            <div className="w-px h-6 bg-linesColor" />
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-cardItemBg rounded-full text-textColorWeak hover:text-textColor transition-colors"
                            >
                                <RiCloseLine className="text-2xl" />
                            </button>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-1 max-md:flex-col overflow-hidden bg-modalBgWeak pb-5">
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
