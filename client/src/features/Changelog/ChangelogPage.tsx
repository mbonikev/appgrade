import Navbar from '../../../components/layout/Navbar';
import { RiMapPinTimeLine, RiCheckboxCircleLine } from 'react-icons/ri';

const ChangelogPage = () => {
    return (
        <div className="min-h-screen bg-bodyBg">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-textColor mb-4">Changelog & Roadmap</h1>
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
    );
};

export default ChangelogPage;
