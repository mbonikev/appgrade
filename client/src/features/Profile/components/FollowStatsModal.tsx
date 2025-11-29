import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearch2Line, RiCloseLine, RiVerifiedBadgeFill } from 'react-icons/ri';
import { Link } from '@tanstack/react-router';
import api from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';
import { formatCount } from '../../../utils/formatters';

interface FollowStatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    initialTab?: 'followers' | 'following';
}

const FollowStatsModal: React.FC<FollowStatsModalProps> = ({
    isOpen,
    onClose,
    userId,
    initialTab = 'followers'
}) => {
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentUserFollowing, setCurrentUserFollowing] = useState<string[]>([]);

    // Reset tab when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            setSearchQuery('');
        }
    }, [isOpen, initialTab]);

    // Fetch data when tab or userId changes
    useEffect(() => {
        if (!isOpen || !userId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch list based on active tab
                const endpoint = activeTab === 'followers'
                    ? `/api/users/${userId}/followers`
                    : `/api/users/${userId}/following`;

                const response = await api.get(endpoint);
                setUsers(response.data);

                // If logged in, fetch who current user follows to show correct button state
                if (currentUser) {
                    const myId = currentUser.id || (currentUser as any)._id;
                    const followingRes = await api.get(`/api/users/${myId}/following`);
                    setCurrentUserFollowing(followingRes.data.map((u: any) => u._id));
                }
            } catch (error) {
                console.error(`Failed to fetch ${activeTab}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen, userId, activeTab, currentUser]);

    const handleFollowToggle = async (targetUserId: string) => {
        if (!currentUser) return;

        const myId = currentUser.id || (currentUser as any)._id;
        const isFollowing = currentUserFollowing.includes(targetUserId);

        try {
            if (isFollowing) {
                await api.delete(`/api/users/${targetUserId}/follow`, { data: { followerId: myId } });
                setCurrentUserFollowing(prev => prev.filter(id => id !== targetUserId));
            } else {
                await api.post(`/api/users/${targetUserId}/follow`, { followerId: myId });
                setCurrentUserFollowing(prev => [...prev, targetUserId]);
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        const query = searchQuery.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query)
        );
    }, [users, searchQuery]);

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
                        className="relative w-full max-w-2xl h-[70vh] max-md:h-svh bg-modalBg rounded-3xl max-md:rounded-none shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between py-4 px-6 border-b border-linesColor bg-modalBg z-10">
                            <div className="flex items-center gap-1 bg-cardBg p-1 rounded-full">
                                <button
                                    onClick={() => setActiveTab('followers')}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'followers'
                                            ? 'bg-bodyBg text-textColor shadow-sm'
                                            : 'text-textColorWeak hover:text-textColor'
                                        }`}
                                >
                                    Followers
                                </button>
                                <button
                                    onClick={() => setActiveTab('following')}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'following'
                                            ? 'bg-bodyBg text-textColor shadow-sm'
                                            : 'text-textColorWeak hover:text-textColor'
                                        }`}
                                >
                                    Following
                                </button>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-cardItemBg rounded-full text-textColorWeak hover:text-textColor transition-colors"
                            >
                                <RiCloseLine className="text-2xl" />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="px-6 py-4 border-b border-linesColor bg-modalBg">
                            <div className="flex items-center gap-3 bg-cardBg px-4 py-2.5 rounded-xl">
                                <RiSearch2Line className="text-textColorWeak text-lg" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    className="flex-1 bg-transparent text-sm text-textColor placeholder-textColorWeak outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* List Content */}
                        <div className="flex-1 overflow-y-auto bg-modalBgWeak">
                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
                                </div>
                            ) : (
                                <div className="p-4">
                                    {filteredUsers.length > 0 ? (
                                        <div className="w-full overflow-hidden rounded-2xl border border-linesColor bg-cardBg">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-linesColor bg-cardItemBg/50">
                                                        <th className="p-4 font-medium text-textColorWeak text-xs uppercase tracking-wider">User</th>
                                                        <th className="p-4 font-medium text-textColorWeak text-xs uppercase tracking-wider text-right">Stats</th>
                                                        <th className="p-4 font-medium text-textColorWeak text-xs uppercase tracking-wider text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUsers.map((u) => {
                                                        const isMe = currentUser && (currentUser.id === u._id || (currentUser as any)._id === u._id);
                                                        const isFollowing = currentUserFollowing.includes(u._id);

                                                        return (
                                                            <tr
                                                                key={u._id}
                                                                className="border-b border-linesColor last:border-none hover:bg-cardItemBg transition-colors group"
                                                            >
                                                                <td className="px-4 py-3">
                                                                    <Link
                                                                        to="/profile/$profileId"
                                                                        params={{ profileId: u._id }}
                                                                        onClick={onClose}
                                                                        className="flex items-center gap-3"
                                                                    >
                                                                        <img
                                                                            src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`}
                                                                            alt={u.name}
                                                                            className="w-10 h-10 rounded-full object-cover"
                                                                        />
                                                                        <div>
                                                                            <div className="flex items-center gap-1">
                                                                                <span className="font-medium text-textColor group-hover:text-mainColor transition-colors">{u.name}</span>
                                                                                {u.isVerified && (
                                                                                    <RiVerifiedBadgeFill className="text-blue-500 text-xs" />
                                                                                )}
                                                                            </div>
                                                                            <p className="text-xs text-textColorWeak">@{u.username}</p>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className="p-4 text-right">
                                                                    <div className="flex flex-col items-end gap-0.5">
                                                                        <span className="text-xs font-medium text-textColor">
                                                                            {formatCount(u.followers || 0)} <span className="text-textColorWeak font-normal">Followers</span>
                                                                        </span>
                                                                        <span className="text-xs font-medium text-textColor">
                                                                            {u.appsCount || 0} <span className="text-textColorWeak font-normal">Apps</span>
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="p-4 text-right">
                                                                    {!isMe && currentUser && (
                                                                        <button
                                                                            onClick={() => handleFollowToggle(u._id)}
                                                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isFollowing
                                                                                    ? 'bg-cardItemBg text-textColor border border-linesColor hover:bg-red-500 hover:text-white hover:border-transparent'
                                                                                    : 'bg-mainColor text-white hover:bg-mainColorHover'
                                                                                }`}
                                                                        >
                                                                            {isFollowing ? 'Following' : 'Follow'}
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 text-textColorWeak">
                                            <p>No users found matching "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FollowStatsModal;
