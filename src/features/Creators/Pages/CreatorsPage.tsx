import React from 'react';
import Navbar from '../../../components/layout/Navbar';
import CreatorsList from '../components/CreatorsList';
import { topCreators, mostActiveCreators } from '../data/mockCreators';

const CreatorsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-bodyBg text-textColor">
            <Navbar />

            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10 py-8">
                {/* Header Section */}
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-textColor">
                        Meet the Creators
                    </h1>
                    <p className="text-textColorWeak text-lg">
                        Discover the talented developers and designers building the next generation of applications.
                    </p>
                </div>

                {/* Lists */}
                <CreatorsList title="Top Creators" creators={topCreators} />
                <CreatorsList title="Most Active This Week" creators={mostActiveCreators} />
            </div>
        </div>
    );
};

export default CreatorsPage;
