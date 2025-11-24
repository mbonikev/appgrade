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
    image: 'https://cdn.dribbble.com/userupload/13004323/file/original-50950330691232840902890409038902.png?resize=1504x1128',
    logo: 'https://cdn.dribbble.com/users/1233499/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
    developer: 'Zenith Team',
    category: 'Productivity'
};

export const honorableMentions: AwardApp[] = [
    {
        id: 'hm1',
        name: 'FlowState',
        tagline: 'Focus on what matters',
        image: 'https://cdn.dribbble.com/userupload/12975878/file/original-123908123098123.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'Flow Inc.',
        category: 'Productivity'
    },
    {
        id: 'hm2',
        name: 'Lumina',
        tagline: 'Brighten your photos instantly',
        image: 'https://cdn.dribbble.com/userupload/12975879/file/original-987987987987.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'Lumina Labs',
        category: 'Photo & Video'
    },
    {
        id: 'hm3',
        name: 'Pulse',
        tagline: 'Track your health metrics',
        image: 'https://cdn.dribbble.com/userupload/12975880/file/original-456456456456.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'HealthFirst',
        category: 'Health'
    }
];

export const bestDesign: AwardApp[] = [
    {
        id: 'bd1',
        name: 'Aether',
        tagline: 'Atmospheric audio experience',
        image: 'https://cdn.dribbble.com/userupload/12975881/file/original-123123123123.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'AudioCraft',
        category: 'Music'
    },
    {
        id: 'bd2',
        name: 'Prism',
        tagline: 'Refract your workflow',
        image: 'https://cdn.dribbble.com/userupload/12975882/file/original-789789789789.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'Prism Co.',
        category: 'Utilities'
    },
    {
        id: 'bd3',
        name: 'Velvet',
        tagline: 'Smooth social interactions',
        image: 'https://cdn.dribbble.com/userupload/12975883/file/original-456456456456.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'Velvet Social',
        category: 'Social'
    },
    {
        id: 'bd4',
        name: 'Oasis',
        tagline: 'Find your calm',
        image: 'https://cdn.dribbble.com/userupload/12975884/file/original-123123123123.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'Mindful',
        category: 'Health'
    }
];

export const bestUX: AwardApp[] = [
    {
        id: 'bux1',
        name: 'Navigate',
        tagline: 'Never get lost again',
        image: 'https://cdn.dribbble.com/userupload/12975885/file/original-789789789789.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'MapMasters',
        category: 'Navigation'
    },
    {
        id: 'bux2',
        name: 'Chef',
        tagline: 'Cook like a pro',
        image: 'https://cdn.dribbble.com/userupload/12975886/file/original-456456456456.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'Culinary Arts',
        category: 'Food'
    },
    {
        id: 'bux3',
        name: 'Wallet',
        tagline: 'Manage finances easily',
        image: 'https://cdn.dribbble.com/userupload/12975887/file/original-123123123123.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'FinTech',
        category: 'Finance'
    },
    {
        id: 'bux4',
        name: 'Learn',
        tagline: 'Master new skills',
        image: 'https://cdn.dribbble.com/userupload/12975888/file/original-789789789789.png?resize=1200x900',
        logo: 'https://cdn.dribbble.com/users/418188/screenshots/16384873/media/4166258076632085732098234.png?resize=400x300&vertical=center',
        developer: 'EduTech',
        category: 'Education'
    }
];
