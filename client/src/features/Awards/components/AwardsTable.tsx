import { useState } from 'react';
import { awardCategories } from '../data/mockAwards';
import Button from '../../../components/ui/Button';
import { RiAddLine } from 'react-icons/ri';
import { Link } from '@tanstack/react-router';

const AwardsTable = () => {
    // Default to the first category
    const [activeCategoryId, setActiveCategoryId] = useState(awardCategories[0].id);

    // Get active category data
    const activeCategory = awardCategories.find(c => c.id === activeCategoryId) || awardCategories[0];
    const nominees = activeCategory.nominees;

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-textColor mb-4">Nominees & Winners</h2>
                    <div className="flex flex-wrap gap-2">
                        {awardCategories.map((category) => (
                            <Tab
                                key={category.id}
                                label={category.title}
                                isActive={activeCategoryId === category.id}
                                onClick={() => setActiveCategoryId(category.id)}
                            />
                        ))}
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
                                <th className="p-6 font-medium">Project</th>
                                <th className="p-6 font-medium">Developer</th>
                                <th className="p-6 font-medium">Status</th>
                                <th className="p-6 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Winner Row */}
                            <tr className="border-b border-white/5 bg-mainColor/5 hover:bg-mainColor/10 transition-colors group cursor-pointer">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={activeCategory.winner.logo} alt={activeCategory.winner.name} className="w-14 h-14 rounded-xl object-cover bg-white/10 ring-2 ring-mainColor" />
                                            <div className="absolute -top-2 -right-2 bg-mainColor text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                                                WINNER
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-textColor font-bold text-lg group-hover:text-mainColor transition-colors">
                                                {activeCategory.winner.name}
                                            </h3>
                                            <p className="text-textColorWeak text-xs">{activeCategory.winner.tagline}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-textColor">
                                    {activeCategory.winner.developer}
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 rounded-full bg-mainColor/20 text-mainColor text-xs font-bold border border-mainColor/20">
                                        Winner
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <Link to="/preview/$projectId" params={{ projectId: activeCategory.winner.id }} className="text-mainColor hover:underline text-sm font-medium">
                                        View Project
                                    </Link>
                                </td>
                            </tr>

                            {/* Nominees Rows */}
                            {nominees.map((app) => (
                                <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
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
                                            Nominee
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <Link to="/preview/$projectId" params={{ projectId: app.id }} className="text-textColorWeak hover:text-textColor text-sm font-medium">
                                            View Project
                                        </Link>
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

const Tab = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${isActive
            ? 'bg-mainColor text-white shadow-lg shadow-mainColor/20'
            : 'bg-cardBg text-textColorWeak hover:text-textColor hover:bg-white/5 border border-white/5'
            }`}
    >
        {label}
    </button>
);

export default AwardsTable;
