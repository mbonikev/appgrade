import AwardsShowcase from '../components/AwardsShowcase';
import NomineesCarousel from '../components/NomineesCarousel';
import { awardCategories } from '../data/mockAwards';

const AwardsPage = () => {
    // Get all winners for the showcase
    const featuredAwards = awardCategories.map(cat => cat.winner);

    return (
        <div className="min-h-screen bg-bodyBg">
            {/* Awards Showcase Section */}
            <AwardsShowcase awards={featuredAwards} />

            {/* Nominees Sections - One for each award category */}
            {awardCategories.map((category) => (
                <NomineesCarousel
                    key={category.id}
                    category={category.title}
                    nominees={category.nominees}
                />
            ))}
        </div>
    );
};

export default AwardsPage;
