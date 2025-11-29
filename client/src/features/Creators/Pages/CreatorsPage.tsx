import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiBadgeCheck, HiUserGroup, HiCube } from 'react-icons/hi';
import { Link } from '@tanstack/react-router';
import Navbar from '../../../components/layout/Navbar';
import api from '../../../lib/api';
import type { Creator } from '../data/types';

const CreatorsPage: React.FC = () => {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

    // Refs for scrolling to sections
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await api.get('/api/users/creators');
                setCreators(response.data);
            } catch (err) {
                console.error('Failed to fetch creators:', err);
                setError('Failed to load creators. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCreators();
    }, []);

    // Generate alphabet letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Group creators by first letter
    const groupedCreators = creators.reduce((acc, creator) => {
        const firstLetter = creator.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(creator);
        return acc;
    }, {} as Record<string, Creator[]>);

    // Get available letters (letters that have creators)
    const availableLetters = Object.keys(groupedCreators).sort();

    // Scroll to section
    const scrollToSection = (letter: string) => {
        const section = sectionRefs.current[letter];
        if (section) {
            const navbarHeight = 120; // Approximate height of navbar + letter nav
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-bodyBg text-textColor">
            <Navbar />

            <div className="w-full h-fit px-10 md:px-10 max-md:px-4">
                {/* Header Section */}
                <div className="mb-8 mt-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-textColor">
                        Meet the Creators
                    </h1>
                    <p className="text-textColorWeak text-lg max-md:text-base max-w-[80%] mx-auto text-center">
                        Discover the talented developers and designers building the next generation of applications.
                    </p>
                </div>

                {/* Alphabetical Navigation */}
                <div className="mb-8 sticky top-14 z-10 bg-bodyBg py-4 border-b border-linesColor">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="text-sm font-medium text-textColorWeak mr-2 whitespace-nowrap">
                            Jump to:
                        </div>
                        {alphabet.map((letter) => {
                            const hasCreators = availableLetters.includes(letter);
                            const count = groupedCreators[letter]?.length || 0;

                            return (
                                <button
                                    key={letter}
                                    onClick={() => hasCreators && scrollToSection(letter)}
                                    disabled={!hasCreators}
                                    className={`px-3 py-2 rounded-full font-medium transition-colors ${hasCreators
                                            ? 'bg-cardItemBg text-textColor hover:bg-mainColor hover:text-white'
                                            : 'bg-transparent text-textColorWeak opacity-30 cursor-not-allowed'
                                        }`}
                                    title={hasCreators ? `${count} creator${count !== 1 ? 's' : ''}` : 'No creators'}
                                >
                                    {letter}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : creators.length === 0 ? (
                    <div className="text-center text-textColorWeak py-20">
                        <p className="text-lg">No creators found</p>
                    </div>
                ) : (
                    <div className="pb-10">
                        {/* Display creators grouped by letter */}
                        {availableLetters.map((letter) => (
                            <div
                                key={letter}
                                ref={(el) => (sectionRefs.current[letter] = el)}
                                className="mb-12"
                            >
                                {/* Letter Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-mainColor text-white flex items-center justify-center text-2xl font-bold">
                                        {letter}
                                    </div>
                                    <div className="flex-1 h-px bg-linesColor"></div>
                                    <span className="text-sm text-textColorWeak font-medium">
                                        {groupedCreators[letter].length} creator{groupedCreators[letter].length !== 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* Creators Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {groupedCreators[letter].map((creator) => (
                                        <div
                                            key={creator.id}
                                            onClick={() => setSelectedCreator(creator)}
                                            className="group relative bg-cardBg rounded-3xl overflow-hidden hover:bg-cardItemBg hover:transition-colors hover:duration-300 cursor-pointer flex flex-col h-full"
                                        >
                                            {/* Avatar & Info */}
                                            <div className="px-5 py-5 flex-1 flex flex-col">
                                                <div className="mb-3 flex justify-between items-end">
                                                    <div className="relative">
                                                        <img
                                                            src={creator.avatar}
                                                            alt={creator.name}
                                                            className="w-20 h-20 rounded-full border border-cardBg group-hover:border-cardItemBg object-cover bg-cardBg"
                                                        />
                                                        {creator.isVerified && (
                                                            <div className="absolute -bottom-1 -right-1 bg-cardBg rounded-full p-px flex">
                                                                <div className='size-[14px] top-0 left-0 right-0 bottom-0 m-auto bg-white rounded-full absolute z-0'></div>
                                                                <HiBadgeCheck className="text-blue-500 text-2xl z-20" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // TODO: Implement follow functionality
                                                        }}
                                                        className="bg-mainColor text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-mainColorHover transition-colors duration-300"
                                                    >
                                                        Follow
                                                    </button>
                                                </div>

                                                <div className="mb-4">
                                                    <h3 className="text-textColor text-lg font-bold flex items-center gap-1">
                                                        {creator.name}
                                                    </h3>
                                                    <p className="text-textColorWeak text-sm font-medium">@{creator.username}</p>
                                                </div>

                                                <p className="text-textColorWeak text-sm line-clamp-2 mb-4 flex-1">
                                                    {creator.bio}
                                                </p>

                                                <div className="flex items-center gap-4 pt-4 border-t border-linesColor">
                                                    <div className="flex items-center gap-1.5 text-sm font-medium text-textColor">
                                                        <HiUserGroup className="text-textColorWeak text-lg" />
                                                        <span>{(creator.followers / 1000).toFixed(1)}k</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-sm font-medium text-textColor">
                                                        <HiCube className="text-textColorWeak text-lg" />
                                                        <span>{creator.appsCount} Apps</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Creator Details Modal (Similar to Home) */}
            <AnimatePresence mode="wait">
                {selectedCreator && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center"
                        onClick={() => setSelectedCreator(null)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                                duration: 0.32,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="w-full max-w-[84%] max-lg:max-w-full mx-auto h-[calc(100svh-56px)] overflow-y-auto bg-modalBg rounded-t-3xl shadow-xl fixed top-14 left-0 right-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col max-w-[88%] mx-auto pb-10 max-lg:pb-6">
                                {/* Header */}
                                <div className="w-full sticky top-0 z-10 bg-modalBg px-10 pt-8 max-xl:px-10 max-lg:pt-6 max-lg:px-0 flex items-start justify-between max-md:flex-col max-md:items-start gap-3">
                                    <div className="flex gap-4 items-start mb-6 min-w-fit">
                                        <div className="relative">
                                            <img
                                                src={selectedCreator.avatar}
                                                className="w-20 h-20 rounded-2xl object-cover"
                                                alt={selectedCreator.name}
                                            />
                                            {selectedCreator.isVerified && (
                                                <div className="absolute -bottom-1 -right-1 bg-modalBg rounded-full p-px flex">
                                                    <div className='size-[14px] top-0 left-0 right-0 bottom-0 m-auto bg-white rounded-full absolute z-0'></div>
                                                    <HiBadgeCheck className="text-blue-500 text-2xl z-20" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-textColor">
                                                {selectedCreator.name}
                                            </h2>
                                            <p className="text-textColorWeak">@{selectedCreator.username}</p>
                                            <p className="text-textColor mt-2">{selectedCreator.bio}</p>
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-end gap-6 pt-3 max-md:pt-0 max-sm:gap-3">
                                        <div className="border-r pr-6 max-md:border-r-[0] mr-0 border-linesColor h-[48px] flex items-center flex-col max-sm:items-end">
                                            <h1 className="flex items-center text-xl font-semibold gap-1">
                                                <HiUserGroup className="text-2xl text-mainColor" />
                                                {(selectedCreator.followers / 1000).toFixed(1)}k
                                            </h1>
                                            <p className="text-sm font-medium text-textColorWeak">Followers</p>
                                        </div>
                                        <div className="border-r pr-6 max-md:border-r-[0] mr-0 border-linesColor h-[48px] flex items-center flex-col max-sm:items-end">
                                            <h1 className="flex items-center text-xl font-semibold gap-1">
                                                <HiCube className="text-2xl text-mainColor" />
                                                {selectedCreator.appsCount}
                                            </h1>
                                            <p className="text-sm font-medium text-textColorWeak">Apps</p>
                                        </div>
                                        <button className="text-white h-[48px] bg-mainColor px-6 rounded-full font-medium hover:bg-mainColorHover transition-colors">
                                            Follow
                                        </button>
                                        <Link
                                            to="/profile/$profileId"
                                            params={{ profileId: selectedCreator.id }}
                                            className="text-textColor h-[48px] bg-cardItemBg px-6 rounded-full font-medium hover:bg-cardBg transition-colors flex items-center"
                                        >
                                            View Full Profile
                                        </Link>
                                    </div>
                                </div>

                                {/* Creator's Apps */}
                                <div className="px-10 max-xl:px-10 max-lg:px-0 mt-8">
                                    <h3 className="text-2xl font-bold text-textColor mb-6">
                                        Apps by {selectedCreator.name}
                                    </h3>
                                    <div className="text-center py-10 text-textColorWeak">
                                        <p>Apps will be displayed here</p>
                                        <p className="text-sm mt-2">Showing {selectedCreator.appsCount} apps</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreatorsPage;
