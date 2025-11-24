export interface AwardApp {
    id: string;
    name: string;
    tagline: string;
    image: string;
    logo: string;
    developer: string;
    category: string;
    votes?: number;
}

export const appOfTheDay: AwardApp = {
    id: 'aod1',
    name: 'Zenith',
    tagline: 'Elevate your daily productivity flow',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4120b?w=800&auto=format&fit=crop&q=60',
    developer: 'Zenith Team',
    category: 'Productivity'
};

export const honorableMentions: AwardApp[] = [
    {
        id: 'hm1',
        name: 'FlowState',
        tagline: 'Focus on what matters',
        image: 'https://images.unsplash.com/photo-1481487484168-9b930d5b7d9f?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60',
        developer: 'Flow Inc.',
        category: 'Productivity'
    },
    {
        id: 'hm2',
        name: 'Lumina',
        tagline: 'Brighten your photos instantly',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&auto=format&fit=crop&q=60',
        developer: 'Lumina Labs',
        category: 'Photo & Video'
    },
    {
        id: 'hm3',
        name: 'Pulse',
        tagline: 'Track your health metrics',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&auto=format&fit=crop&q=60',
        developer: 'HealthFirst',
        category: 'Health'
    }
];

export const bestDesign: AwardApp[] = [
    {
        id: 'bd1',
        name: 'Aether',
        tagline: 'Atmospheric audio experience',
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60',
        developer: 'AudioCraft',
        category: 'Music'
    },
    {
        id: 'bd2',
        name: 'Prism',
        tagline: 'Refract your workflow',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
        developer: 'Prism Co.',
        category: 'Utilities'
    },
    {
        id: 'bd3',
        name: 'Velvet',
        tagline: 'Smooth social interactions',
        image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60',
        developer: 'Velvet Social',
        category: 'Social'
    },
    {
        id: 'bd4',
        name: 'Oasis',
        tagline: 'Find your calm',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
        developer: 'Mindful',
        category: 'Health'
    }
];

export const bestUX: AwardApp[] = [
    {
        id: 'bux1',
        name: 'Navigate',
        tagline: 'Never get lost again',
        image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&auto=format&fit=crop&q=60',
        developer: 'MapMasters',
        category: 'Navigation'
    },
    {
        id: 'bux2',
        name: 'Chef',
        tagline: 'Cook like a pro',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&auto=format&fit=crop&q=60',
        developer: 'Culinary Arts',
        category: 'Food'
    },
    {
        id: 'bux3',
        name: 'Wallet',
        tagline: 'Manage finances easily',
        image: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=800&auto=format&fit=crop&q=60',
        developer: 'FinTech',
        category: 'Finance'
    },
    {
        id: 'bux4',
        name: 'Learn',
        tagline: 'Master new skills',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60',
        developer: 'EduTech',
        category: 'Education'
    }
];
