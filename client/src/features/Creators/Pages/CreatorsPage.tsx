import React, { useEffect, useState, useRef } from 'react';
import { HiBadgeCheck, HiUserGroup, HiCube } from 'react-icons/hi';
import { Link } from '@tanstack/react-router';
import Navbar from '../../../components/layout/Navbar';
import api from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { formatCount } from '../../../utils/formatters';
import type { Creator } from '../data/types';

const CreatorsPage: React.FC = () => {
    const { user } = useAuth();
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [followingIds, setFollowingIds] = useState<string[]>([]);

    // Refs for scrolling to sections
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch creators first
                const creatorsRes = await api.get('/api/users/creators');
                setCreators(creatorsRes.data);

                // Then fetch following data if user is logged in
                if (user) {
                    try {
                        const userId = user.id || (user as any)._id;
                        const followingRes = await api.get(`/api/users/${userId}/following`);
                        if (followingRes.data) {
                            setFollowingIds(followingRes.data.map((u: any) => u._id));
                        }
                    } catch (followErr) {
                        console.error('Failed to fetch following data:', followErr);
                        // Don't show error to user, just log it
                    }
                }
            } catch (err) {
                console.error('Failed to fetch creators:', err);
                setError('Failed to load creators. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

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

    const { showToast } = useToast();

    const handleFollow = async (e: React.MouseEvent, creatorId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            showToast('Please sign in to follow creators', 'info');
            return;
        }

        const isFollowing = followingIds.includes(creatorId);
        const userId = user.id || (user as any)._id;

        // Optimistic Update
        if (isFollowing) {
            setFollowingIds(prev => prev.filter(id => id !== creatorId));
            setCreators(prev => prev.map(c =>
                c.id === creatorId ? { ...c, followers: Math.max(0, c.followers - 1) } : c
            ));
        } else {
            setFollowingIds(prev => [...prev, creatorId]);
            setCreators(prev => prev.map(c =>
                c.id === creatorId ? { ...c, followers: c.followers + 1 } : c
            ));
        }

        try {
            if (isFollowing) {
                await api.delete(`/api/users/${creatorId}/follow`, { data: { followerId: userId } });
            } else {
                await api.post(`/api/users/${creatorId}/follow`, { followerId: userId });
            }
        } catch (error) {
            console.error('Error toggling follow:', error);

            // Revert Optimistic Update
            if (isFollowing) {
                setFollowingIds(prev => [...prev, creatorId]);
                setCreators(prev => prev.map(c =>
                    c.id === creatorId ? { ...c, followers: c.followers + 1 } : c
                ));
            } else {
                setFollowingIds(prev => prev.filter(id => id !== creatorId));
                setCreators(prev => prev.map(c =>
                    c.id === creatorId ? { ...c, followers: Math.max(0, c.followers - 1) } : c
                ));
            }

            showToast('Failed to update follow status', 'error');
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
                                ref={(el) => { sectionRefs.current[letter] = el; }}
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
                                    {groupedCreators[letter].map((creator) => {
                                        const isFollowing = followingIds.includes(creator.id);
                                        return (
                                            <Link
                                                key={creator.id}
                                                to="/profile/$profileId"
                                                params={{ profileId: creator.id }}
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
                                                            onClick={(e) => handleFollow(e, creator.id)}
                                                            className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300 ${isFollowing
                                                                ? 'bg-cardItemBg text-textColor border border-linesColor hover:bg-red-500 hover:text-white hover:border-transparent'
                                                                : 'bg-mainColor text-white hover:bg-mainColorHover'
                                                                }`}
                                                        >
                                                            {isFollowing ? 'Following' : 'Follow'}
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
                                                            <span>{formatCount(creator.followers)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm font-medium text-textColor">
                                                            <HiCube className="text-textColorWeak text-lg" />
                                                            <span>{creator.appsCount} Apps</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default CreatorsPage;
