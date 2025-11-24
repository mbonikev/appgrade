import Navbar from '../../../components/layout/Navbar';
import AwardHero from '../components/AwardHero';
import { appOfTheDay, honorableMentions, bestDesign, bestUX } from '../data/mockAwards';
import { RiMedalFill, RiPaletteFill, RiUserSmileFill } from 'react-icons/ri';

const AwardsPage = () => {
    return (
        <div className="min-h-screen bg-bodyBg">
            <Navbar />

            <div className="max-w-[1600px] mx-auto px-4 md:px-10 pb-20">
                {/* Header */}
                <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-textColor mb-6">
                        AppGrade Awards
                    </h1>
                    <p className="text-textColorWeak text-lg md:text-xl">
                        Celebrating the most innovative, beautiful, and user-friendly applications built by our community.
                    </p>
                </div>

                {/* Hero Section - App of the Day */}
                <div className="mb-20">
                    <AwardHero app={appOfTheDay} />
                </div>

                {/* Honorable Mentions */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                            <RiMedalFill className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-textColor">Honorable Mentions</h2>
                            <p className="text-textColorWeak text-sm">Runner-ups that deserve spotlight</p>
                        </div>
                    </div>
                    {/* Reusing AppGrid logic but manually mapping for custom award card style if needed, 
                        or just using AppGrid if it fits. For now, let's use a simple grid to match the mock data structure 
                        which is slightly different from AppGrid's expected input, or we can adapt.
                        Actually, let's create a simple card grid here for flexibility.
                    */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {honorableMentions.map(app => (
                            <div key={app.id} className="group cursor-pointer">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-cardBg">
                                    <img
                                        src={app.image}
                                        alt={app.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                        {app.category}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-textColor group-hover:text-mainColor transition-colors">
                                    {app.name}
                                </h3>
                                <p className="text-textColorWeak text-sm">{app.tagline}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best Design */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                            <RiPaletteFill className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-textColor">Best Design</h2>
                            <p className="text-textColorWeak text-sm">Outstanding visual aesthetics</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bestDesign.map(app => (
                            <div key={app.id} className="group cursor-pointer">
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-cardBg">
                                    <img
                                        src={app.image}
                                        alt={app.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-textColor group-hover:text-mainColor transition-colors">
                                    {app.name}
                                </h3>
                                <p className="text-textColorWeak text-xs">{app.developer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best UX */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                            <RiUserSmileFill className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-textColor">Best User Experience</h2>
                            <p className="text-textColorWeak text-sm">Intuitive and seamless interactions</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bestUX.map(app => (
                            <div key={app.id} className="group cursor-pointer">
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-cardBg">
                                    <img
                                        src={app.image}
                                        alt={app.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-textColor group-hover:text-mainColor transition-colors">
                                    {app.name}
                                </h3>
                                <p className="text-textColorWeak text-xs">{app.developer}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AwardsPage;
