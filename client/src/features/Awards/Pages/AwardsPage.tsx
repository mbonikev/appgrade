import AwardsShowcase from '../components/AwardsShowcase';
import AwardsTable from '../components/AwardsTable';
import { awardCategories } from '../data/mockAwards';

const AwardsPage = () => {
    // Get all winners for the showcase
    const featuredAwards = awardCategories.map(cat => cat.winner);

    return (
        <div className="min-h-screen bg-bodyBg">
            {/* Awards Showcase Section */}
            <AwardsShowcase awards={featuredAwards} />

            {/* Awards Table with Tabs */}
            <AwardsTable />
        </div>
    );
};

export default AwardsPage;
