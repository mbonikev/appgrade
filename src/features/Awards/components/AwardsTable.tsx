import React, { useState } from 'react';
import { honorableMentions, bestDesign, bestUX } from '../data/mockAwards';
import Button from '../../../components/ui/Button';
import { RiAddLine, RiGlobalLine, RiMapPin2Line, RiEarthLine } from 'react-icons/ri';

const AwardsTable = () => {
    const [activeTab, setActiveTab] = useState<'country' | 'continent' | 'world'>('world');

    // Mock data for the table - reusing existing data for demo
    const allApps = [...honorableMentions, ...bestDesign, ...bestUX];

    // Filter logic (mocked for now since we don't have location data)
    const getFilteredApps = () => {
        // Just shuffling or slicing for demo purposes to show different data per tab
        if (activeTab === 'country') return allApps.slice(0, 5);
        if (activeTab === 'continent') return allApps.slice(3, 8);
        return allApps;
    };

    const filteredApps = getFilteredApps();

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-textColor mb-4">Leaderboard</h2>
                    <div className="flex p-1 bg-cardBg rounded-full w-fit">
                        <Tab
                            label="Country"
                            icon={<RiMapPin2Line />}
                            isActive={activeTab === 'country'}
                            onClick={() => setActiveTab('country')}
                        />
                        <Tab
                            label="Continent"
                            icon={<RiEarthLine />}
                            isActive={activeTab === 'continent'}
                            onClick={() => setActiveTab('continent')}
                        />
                        <Tab
                            label="World"
                            icon={<RiGlobalLine />}
                            isActive={activeTab === 'world'}
                            onClick={() => setActiveTab('world')}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-textColor font-bold">Submit your project</p>
                        <p className="text-textColorWeak text-xs">Join the competition</p>
                    </div>
                    <Button
                        label="Submit Project"
                        icon={<RiAddLine />}
                        special
                        className="rounded-full px-6"
                    />
                </div>
            </div>

            <div className="bg-cardBg rounded-3xl overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-textColorWeak text-sm uppercase tracking-wider">
                                <th className="p-6 font-medium">Rank</th>
                                <th className="p-6 font-medium">Project</th>
                                <th className="p-6 font-medium">Developer</th>
                                <th className="p-6 font-medium">Category</th>
                                <th className="p-6 font-medium text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApps.map((app, index) => (
                                <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                                    <td className="p-6 text-textColor font-bold text-xl">
                                        #{index + 1}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <img src={app.logo} alt={app.name} className="w-12 h-12 rounded-xl object-cover bg-white/10" />
                                            <div>
                                                <h3 className="text-textColor font-bold text-lg group-hover:text-mainColor transition-colors">
                                                    {app.name}
                                                </h3>
                                                <p className="text-textColorWeak text-xs">{app.tagline}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-textColor">
                                        {app.developer}
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 rounded-full bg-white/5 text-textColorWeak text-xs border border-white/10">
                                            {app.category}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="inline-flex flex-col items-end">
                                            <span className="text-mainColor font-bold text-lg">
                                                {(9.8 - (index * 0.2)).toFixed(1)}
                                            </span>
                                            <span className="text-textColorWeak text-[10px]">
                                                / 10
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Tab = ({ label, icon, isActive, onClick }: { label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                ? 'bg-mainColor text-white shadow-lg shadow-mainColor/20'
                : 'text-textColorWeak hover:text-textColor hover:bg-white/5'
            }`}
    >
        {icon}
        {label}
    </button>
);

export default AwardsTable;
