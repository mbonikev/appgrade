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

export interface AwardCategory {
    id: string;
    title: string;
    winner: AwardApp;
    nominees: AwardApp[];
}

// Individual award apps
export const appOfTheDay: AwardApp = {
    id: 'aod1',
    name: 'Zenith',
    tagline: 'Elevate your daily productivity flow',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4120b?w=800&auto=format&fit=crop&q=60',
    developer: 'Zenith Team',
    category: 'Site of the Week'
};

export const honorableMentions: AwardApp[] = [
    {
        id: 'hm1',
        name: 'FlowState',
        tagline: 'Focus on what matters',
        image: 'https://images.unsplash.com/photo-1481487484168-9b930d5b7d9f?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60',
        developer: 'Flow Inc.',
        category: 'People\'s Choice Award'
    },
    {
        id: 'hm2',
        name: 'Lumina',
        tagline: 'Brighten your photos instantly',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&auto=format&fit=crop&q=60',
        developer: 'Lumina Labs',
        category: 'Rising Designer Award'
    },
    {
        id: 'hm3',
        name: 'Pulse',
        tagline: 'Track your health metrics',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&auto=format&fit=crop&q=60',
        developer: 'HealthFirst',
        category: 'Most Innovative Concept'
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
        category: 'Most Improved Design'
    },
    {
        id: 'bd2',
        name: 'Prism',
        tagline: 'Refract your workflow',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
        developer: 'Prism Co.',
        category: 'Site of the Week'
    },
    {
        id: 'bd3',
        name: 'Velvet',
        tagline: 'Smooth social interactions',
        image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60',
        developer: 'Velvet Social',
        category: 'People\'s Choice Award'
    },
    {
        id: 'bd4',
        name: 'Oasis',
        tagline: 'Find your calm',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
        developer: 'Mindful',
        category: 'Rising Designer Award'
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
        category: 'Most Innovative Concept'
    },
    {
        id: 'bux2',
        name: 'Chef',
        tagline: 'Cook like a pro',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&auto=format&fit=crop&q=60',
        developer: 'Culinary Arts',
        category: 'Most Improved Design'
    },
    {
        id: 'bux3',
        name: 'Wallet',
        tagline: 'Manage finances easily',
        image: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=800&auto=format&fit=crop&q=60',
        developer: 'FinTech',
        category: 'Site of the Week'
    },
    {
        id: 'bux4',
        name: 'Learn',
        tagline: 'Master new skills',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60',
        developer: 'EduTech',
        category: 'People\'s Choice Award'
    },
    {
        id: 'bux5',
        name: 'Nexus',
        tagline: 'Connect everything seamlessly',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
        developer: 'Nexus Labs',
        category: 'Site of the Month'
    }
];

// Award categories with nominees
export const awardCategories: AwardCategory[] = [
    {
        id: 'sotw',
        title: 'Site of the Week',
        winner: appOfTheDay,
        nominees: [
            {
                id: 'sotw_n1',
                name: 'Sketch',
                tagline: 'UI and graphic design',
                image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format&fit=crop&q=60',
                developer: 'Sketch Team',
                category: 'Site of the Week'
            },
            {
                id: 'sotw_n2',
                name: 'POOLS™',
                tagline: 'Explore, admire and...',
                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
                developer: 'Pools Inc',
                category: 'Site of the Week'
            },
            {
                id: 'sotw_n3',
                name: 'Adobe Lightroom',
                tagline: 'Edit, manage and share',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
                developer: 'Adobe',
                category: 'Site of the Week'
            },
            {
                id: 'sotw_n4',
                name: 'Assassin\'s Creed',
                tagline: 'Enter Feudal Japan',
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60',
                developer: 'Ubisoft',
                category: 'Site of the Week'
            }
        ]
    },
    {
        id: 'pca',
        title: 'People\'s Choice Award',
        winner: honorableMentions[0],
        nominees: [
            {
                id: 'pca_n1',
                name: 'Notion',
                tagline: 'All-in-one workspace',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60',
                developer: 'Notion Labs',
                category: 'People\'s Choice Award'
            },
            {
                id: 'pca_n2',
                name: 'Figma',
                tagline: 'Design together',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
                developer: 'Figma Inc',
                category: 'People\'s Choice Award'
            },
            {
                id: 'pca_n3',
                name: 'Slack',
                tagline: 'Where work happens',
                image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60',
                developer: 'Slack Technologies',
                category: 'People\'s Choice Award'
            },
            {
                id: 'pca_n4',
                name: 'Spotify',
                tagline: 'Music for everyone',
                image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60',
                developer: 'Spotify AB',
                category: 'People\'s Choice Award'
            }
        ]
    },
    {
        id: 'rda',
        title: 'Rising Designer Award',
        winner: honorableMentions[1],
        nominees: [
            {
                id: 'rda_n1',
                name: 'Framer',
                tagline: 'Design and ship sites',
                image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60',
                developer: 'Framer B.V.',
                category: 'Rising Designer Award'
            },
            {
                id: 'rda_n2',
                name: 'Webflow',
                tagline: 'Build without code',
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
                developer: 'Webflow Inc',
                category: 'Rising Designer Award'
            },
            {
                id: 'rda_n3',
                name: 'Canva',
                tagline: 'Design anything',
                image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60',
                developer: 'Canva Pty Ltd',
                category: 'Rising Designer Award'
            },
            {
                id: 'rda_n4',
                name: 'Procreate',
                tagline: 'Create art anywhere',
                image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60',
                developer: 'Savage Interactive',
                category: 'Rising Designer Award'
            }
        ]
    },
    {
        id: 'mic',
        title: 'Most Innovative Concept',
        winner: honorableMentions[2],
        nominees: [
            {
                id: 'mic_n1',
                name: 'ChatGPT',
                tagline: 'AI that understands you',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
                developer: 'OpenAI',
                category: 'Most Innovative Concept'
            },
            {
                id: 'mic_n2',
                name: 'Midjourney',
                tagline: 'AI art generation',
                image: 'https://images.unsplash.com/photo-1686191128892-c1a9e2a9e8e7?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1686191128892-c1a9e2a9e8e7?w=800&auto=format&fit=crop&q=60',
                developer: 'Midjourney Inc',
                category: 'Most Innovative Concept'
            },
            {
                id: 'mic_n3',
                name: 'Runway',
                tagline: 'AI video creation',
                image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=60',
                developer: 'Runway AI',
                category: 'Most Innovative Concept'
            },
            {
                id: 'mic_n4',
                name: 'Replicate',
                tagline: 'Run AI models',
                image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
                developer: 'Replicate Inc',
                category: 'Most Innovative Concept'
            }
        ]
    },
    {
        id: 'mid',
        title: 'Most Improved Design',
        winner: bestDesign[0],
        nominees: [
            {
                id: 'mid_n1',
                name: 'Discord',
                tagline: 'Your place to talk',
                image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&auto=format&fit=crop&q=60',
                developer: 'Discord Inc',
                category: 'Most Improved Design'
            },
            {
                id: 'mid_n2',
                name: 'Linear',
                tagline: 'Issue tracking',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
                developer: 'Linear',
                category: 'Most Improved Design'
            },
            {
                id: 'mid_n3',
                name: 'Arc Browser',
                tagline: 'Browse differently',
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
                developer: 'The Browser Company',
                category: 'Most Improved Design'
            },
            {
                id: 'mid_n4',
                name: 'Raycast',
                tagline: 'Supercharge productivity',
                image: 'https://images.unsplash.com/photo-1633409361618-c73427e4120b?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4120b?w=800&auto=format&fit=crop&q=60',
                developer: 'Raycast Technologies',
                category: 'Most Improved Design'
            }
        ]
    },
    {
        id: 'sotm',
        title: 'Site of the Month',
        winner: bestUX[4],
        nominees: [
            {
                id: 'sotm_n1',
                name: 'Vercel',
                tagline: 'Deploy instantly',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
                developer: 'Vercel Inc',
                category: 'Site of the Month'
            },
            {
                id: 'sotm_n2',
                name: 'Supabase',
                tagline: 'Open source Firebase',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
                developer: 'Supabase Inc',
                category: 'Site of the Month'
            },
            {
                id: 'sotm_n3',
                name: 'Railway',
                tagline: 'Deploy in minutes',
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
                developer: 'Railway Corp',
                category: 'Site of the Month'
            },
            {
                id: 'sotm_n4',
                name: 'Planetscale',
                tagline: 'Database for developers',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
                logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
                developer: 'PlanetScale Inc',
                category: 'Site of the Month'
            }
        ]
    }
];
