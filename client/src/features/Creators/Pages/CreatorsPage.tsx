import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/layout/Navbar';
import CreatorsList from '../components/CreatorsList';
import api from '../../../lib/api';
import type { Creator } from '../data/types';

const CreatorsPage: React.FC = () => {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    // Derived lists (mock logic for now, can be refined with backend filters later)
    // const topCreators = creators.slice(0, 4);
    // const mostActiveCreators = creators.slice(0, 4); // Just showing same/subset for now

    return (
        <div className="min-h-screen bg-bodyBg text-textColor">
            <Navbar />

            <div className="w-full h-fit px-10 md:px-10 max-md:px-4">
                {/* Header Section */}
                <div className="mb-12 mt-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-textColor">
                        Meet the Creators
                    </h1>
                    <p className="text-textColorWeak text-lg max-md:text-base max-w-[80%] mx-auto text-center">
                        Discover the talented developers and designers building the next generation of applications.
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : (
                    <>
                        <CreatorsList title="All Creators" creators={creators} />
                        {/* <CreatorsList title="Most Active This Week" creators={mostActiveCreators} /> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default CreatorsPage;
