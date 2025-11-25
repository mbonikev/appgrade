import AwardsShowcase from '../components/AwardsShowcase';
import { appOfTheDay, honorableMentions, bestDesign} from '../data/mockAwards';
const AwardsPage = () => {
    // Combine awards for the showcase
    const featuredAwards = [appOfTheDay, ...honorableMentions, ...bestDesign.slice(0, 2)];

    return (
        <div className="min-h-screen bg-bodyBg">
            {/* <Navbar /> */}

            {/* New Awards Showcase Section */}
            <AwardsShowcase awards={featuredAwards} />

        </div>
    );
};

export default AwardsPage;
