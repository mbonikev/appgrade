export interface SearchItem {
    id: string;
    name: string;
    count?: number;
    image?: string;
    category?: string;
    group?: string;
    font?: string;
    colors?: string[];
    gradient?: string;
    type: 'app' | 'screen' | 'ui_element' | 'flow' | 'category' | 'theme';
}

export const trendingApps: SearchItem[] = [
    { id: '1', name: 'Airbnb', type: 'app', image: 'https://logo.clearbit.com/airbnb.com' },
    { id: '2', name: 'Linear', type: 'app', image: 'https://logo.clearbit.com/linear.app' },
    { id: '3', name: 'Shopify', type: 'app', image: 'https://logo.clearbit.com/shopify.com' },
    { id: '4', name: 'Spotify', type: 'app', image: 'https://logo.clearbit.com/spotify.com' },
    { id: '5', name: 'Notion', type: 'app', image: 'https://logo.clearbit.com/notion.so' },
    { id: '6', name: 'HubSpot', type: 'app', image: 'https://logo.clearbit.com/hubspot.com' },
    { id: '7', name: 'Jira', type: 'app', image: 'https://logo.clearbit.com/atlassian.com' },
];

export const trendingScreens: SearchItem[] = [
    { id: 's1', name: 'Signup', type: 'screen', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
    { id: 's2', name: 'Login', type: 'screen', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500' },
    { id: 's3', name: 'Home', type: 'screen', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500' },
    { id: 's4', name: 'Dashboard', type: 'screen', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500' },
    { id: 's5', name: 'Checkout', type: 'screen', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
    { id: 's6', name: 'Error', type: 'screen', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500' },
    { id: 's7', name: 'Search', type: 'screen', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500' },
    { id: 's8', name: 'Filter & Sort', type: 'screen', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500' },
];

export const uiElements: SearchItem[] = [
    { id: 'u1', name: 'Accordion', count: 1799, type: 'ui_element', group: 'Control', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
    { id: 'u2', name: 'Breadcrumbs', count: 704, type: 'ui_element', group: 'Navigation', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500' },
    { id: 'u3', name: 'Button', count: 8990, type: 'ui_element', group: 'Control', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500' },
    { id: 'u4', name: 'Checkbox', count: 958, type: 'ui_element', group: 'Control', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500' },
    { id: 'u5', name: 'Color Picker', count: 579, type: 'ui_element', group: 'Input', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
    { id: 'u6', name: 'Combobox', count: 751, type: 'ui_element', group: 'Input', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500' },
    { id: 'u7', name: 'Date Picker', count: 527, type: 'ui_element', group: 'Input', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500' },
    { id: 'u8', name: 'Editable Text', count: 307, type: 'ui_element', group: 'Input', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500' },
    { id: 'u9', name: 'File Upload', count: 898, type: 'ui_element', group: 'Input', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
];

export const flows: SearchItem[] = [
    { id: 'f1', name: 'Browsing Tutorial', count: 199, type: 'flow', group: 'New User Experience', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
    { id: 'f2', name: 'Creating Account', count: 568, type: 'flow', group: 'New User Experience', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500' },
    { id: 'f3', name: 'Onboarding', count: 437, type: 'flow', group: 'New User Experience', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500' },
    { id: 'f4', name: 'Editing Profile', count: 857, type: 'flow', group: 'Account Management', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500' },
    { id: 'f5', name: 'Deleting & Deactivating Account', count: 270, type: 'flow', group: 'Account Management', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500' },
    { id: 'f6', name: 'Logging In', count: 576, type: 'flow', group: 'Account Management', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500' },
    { id: 'f7', name: 'Logging Out', count: 530, type: 'flow', group: 'Account Management', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500' },
];

export const categories: SearchItem[] = [
    { id: 'c1', name: 'Entertainment', count: 450, type: 'category', gradient: 'from-orange-400 to-red-500', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/popcorn-5354256-4476634.png' },
    { id: 'c2', name: 'Productivity', count: 320, type: 'category', gradient: 'from-blue-400 to-cyan-300', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/task-management-4896066-4081284.png' },
    { id: 'c3', name: 'Social Networking', count: 280, type: 'category', gradient: 'from-purple-500 to-indigo-500', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/chat-bubbles-4965393-4128682.png' },
    { id: 'c4', name: 'Lifestyle', count: 250, type: 'category', gradient: 'from-rose-400 to-orange-300', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/sofa-4034237-3336764.png' },
    { id: 'c5', name: 'Photo & Video', count: 200, type: 'category', gradient: 'from-yellow-400 to-orange-400', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/camera-4034227-3336754.png' },
    { id: 'c6', name: 'Education', count: 180, type: 'category', gradient: 'from-green-400 to-emerald-600', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/graduation-cap-5650228-4708027.png' },
    { id: 'c7', name: 'Finance', count: 450, type: 'category', gradient: 'from-emerald-400 to-teal-500', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/wallet-4034238-3336765.png' },
    { id: 'c8', name: 'Health & Fitness', count: 320, type: 'category', gradient: 'from-red-400 to-pink-500', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/dumbell-4034230-3336757.png' },
];

export const themes: SearchItem[] = [
    { id: 't1', name: 'Medium', type: 'theme', font: 'sohne', colors: ['#22c55e', '#ffffff', '#1f2937'] },
    { id: 't2', name: 'Lemon Squeezy', type: 'theme', font: 'Inter', colors: ['#8b5cf6', '#ffffff', '#1f2937'] },
    { id: 't3', name: 'Clay', type: 'theme', font: 'Verlag', colors: ['#f97316', '#ffffff', '#1f2937'] },
    { id: 't4', name: 'Loom', type: 'theme', font: 'Circular', colors: ['#6366f1', '#ffffff', '#1f2937'] },
    { id: 't5', name: 'Equals', type: 'theme', font: 'Aeonik Pro', colors: ['#2563eb', '#ffffff', '#000000'] },
    { id: 't6', name: 'Dovetail', type: 'theme', font: 'Plus Jakarta Sans', colors: ['#6366f1', '#ffffff', '#1e1b4b'] },
    { id: 't7', name: 'IFTTT', type: 'theme', font: 'Avenir Next', colors: ['#000000', '#ffffff', '#333333'] },
    { id: 't8', name: 'Basecamp', type: 'theme', font: '', colors: ['#facc15', '#ffffff', '#0f172a'] },
];

export const searchTags = [
    { label: 'Brilliant', icon: null },
    { label: 'trading', icon: null },
    { label: 'agency', icon: null },
    { label: 'bank', icon: null },
];
