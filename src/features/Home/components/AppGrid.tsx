import AppCard from './AppCard';

// Mock Data based on the image
const apps = [
    {
        id: 1,
        title: 'Acctual',
        description: 'Crypto invoice & B2B payments',
        image: 'https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg', // Placeholder
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // Placeholder
        badge: 'New' as const,
        hasVideo: true,
    },
    {
        id: 2,
        title: 'Hers',
        description: "Women's healthcare",
        image: 'https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg', // Placeholder
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // Placeholder
        badge: 'New' as const,
    },
    {
        id: 3,
        title: 'ClickUp',
        description: 'The everything app for work',
        image: 'https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg', // Placeholder
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // Placeholder
        badge: 'Updated' as const,
    },
    {
        id: 4,
        title: 'Adaline',
        description: 'End-to-end AI agent platform',
        image: 'https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg', // Placeholder
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // Placeholder
    },
    {
        id: 5,
        title: 'Fabric',
        description: 'AI notes, files, ideas',
        image: 'https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg', // Placeholder
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // Placeholder
        isLocked: true,
        hasVideo: true,
    },
    {
        id: 6,
        title: 'Babbel',
        description: 'Learn a language online',
        image: 'https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg', // Placeholder
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // Placeholder
        isLocked: true,
    },
];

const AppGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {apps.map((app) => (
                <AppCard key={app.id} {...app} />
            ))}
        </div>
    );
};

export default AppGrid;
