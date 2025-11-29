
import Navbar from '../../components/layout/Navbar';
import ChangelogTimelineItem from './components/ChangelogTimelineItem';
import { RiRssLine, RiMailLine } from 'react-icons/ri';

const ChangelogPage = () => {
    return (
        <div className="min-h-screen bg-bodyBg relative">
            {/* Dotted Background Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-20">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium text-textColor mb-3">Changelog</h1>
                            <p className="text-textColorWeak text-lg">New updates, improvements, and fixes to AppGrade</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-textColorWeak hover:text-textColor transition-colors">
                                <RiRssLine size={24} />
                            </button>
                            <button className="p-2 text-textColorWeak hover:text-textColor transition-colors">
                                <RiMailLine size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-0">
                        <ChangelogTimelineItem
                            date="24 Nov 2025"
                            version="v1.1.0"
                            title="Creator Profiles & Navigation"
                            description="We've completely revamped how you interact with creators on AppGrade."
                            content={
                                <div className="space-y-6">
                                    <div className="bg-cardBg border border-linesColor rounded-xl p-6">
                                        <h4 className="font-bold text-textColor mb-3">What's New:</h4>
                                        <ul className="space-y-2 text-textColorWeak">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mainColor shrink-0" />
                                                <span><strong>Enhanced Profile Pages:</strong> View detailed stats, bio, and all projects by a creator in one place.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mainColor shrink-0" />
                                                <span><strong>Direct Navigation:</strong> Click on any creator card to instantly visit their dedicated profile.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mainColor shrink-0" />
                                                <span><strong>Follow System:</strong> You can now follow your favorite creators to stay updated with their latest work.</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
                                        alt="Profile Update"
                                        className="rounded-xl border border-linesColor w-full object-cover h-64"
                                    />
                                </div>
                            }
                        />

                        <ChangelogTimelineItem
                            date="15 Nov 2025"
                            title="Search & Discovery"
                            description="Finding inspiration just got easier with our new search capabilities."
                            content={
                                <div className="bg-cardBg border border-linesColor rounded-xl overflow-hidden">
                                    <div className="p-4 border-b border-linesColor bg-cardItemBg/50 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50" />
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-2 text-textColorWeak">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-textColorWeak/50 shrink-0" />
                                                <span>Added global search with keyboard shortcut (Cmd+K)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-textColorWeak/50 shrink-0" />
                                                <span>Filter projects by category, tags, and tools used</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-textColorWeak/50 shrink-0" />
                                                <span>Trending section to see what's hot this week</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        />

                        <ChangelogTimelineItem
                            date="01 Nov 2025"
                            version="v1.0.0"
                            title="Initial Launch"
                            description="Welcome to AppGrade! The platform for showcasing and discovering high-quality web applications."
                            isLast={true}
                            content={
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-cardBg p-4 rounded-xl border border-linesColor text-center">
                                        <span className="text-2xl mb-2 block">🚀</span>
                                        <span className="font-bold text-textColor block">Project Showcase</span>
                                    </div>
                                    <div className="bg-cardBg p-4 rounded-xl border border-linesColor text-center">
                                        <span className="text-2xl mb-2 block">💎</span>
                                        <span className="font-bold text-textColor block">Premium UI</span>
                                    </div>
                                    <div className="bg-cardBg p-4 rounded-xl border border-linesColor text-center">
                                        <span className="text-2xl mb-2 block">🤝</span>
                                        <span className="font-bold text-textColor block">Community</span>
                                    </div>
                                    <div className="bg-cardBg p-4 rounded-xl border border-linesColor text-center">
                                        <span className="text-2xl mb-2 block">📱</span>
                                        <span className="font-bold text-textColor block">Responsive</span>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangelogPage;
