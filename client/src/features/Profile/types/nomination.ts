export interface Nomination {
    _id: string;
    user: string;
    project: {
        _id: string;
        title: string;
        tagline: string;
        logo?: string;
        images?: string[];
        averageRating?: number;
        reviewsCount?: number;
    };
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface AwardCategory {
    id: string;
    title: string;
    description: string;
}

export const AWARD_CATEGORIES: AwardCategory[] = [
    {
        id: 'sotw',
        title: 'Site of the Week',
        description: 'Best website of the week'
    },
    {
        id: 'pca',
        title: "People's Choice Award",
        description: 'Most popular among users'
    },
    {
        id: 'rda',
        title: 'Rising Designer Award',
        description: 'Best emerging designer'
    },
    {
        id: 'mic',
        title: 'Most Innovative Concept',
        description: 'Most creative and innovative idea'
    },
    {
        id: 'mid',
        title: 'Most Improved Design',
        description: 'Best design improvement'
    },
    {
        id: 'sotm',
        title: 'Site of the Month',
        description: 'Best website of the month'
    }
];
