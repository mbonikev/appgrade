export const mockUser = {
  id: '1',
  username: 'thierrygusenga',
  display_name: 'Thierry Gusenga',
  email: 'thierry@example.com',
  avatar_url: 'https://i.pinimg.com/736x/a9/70/8f/a9708f9840565fc2aae91b5847fcceab.jpg',
  bio: 'Product designer & developer building the future of web apps.',
  website: 'https://appgrade.com',
  role: 'creator',
  followers_count: 1234,
  following_count: 89,
  created_at: '2024-01-15',
};

export const mockStats = {
  projects: 12,
  views: 5234,
  upvotes: 890,
  awards: 3,
  followers: 1234,
  following: 89,
};

export const mockProjects: {
  id: string;
  creator_id: string;
  name: string;
  tagline: string;
  description: string;
  website_url?: string;
  logo_url?: string;
  cover_image_url: string;
  status: string;
  views_count: number;
  upvotes_count: number;
  categories: string[];
  created_at: string;
  type: 'project' | 'screens' | 'ui_element' | 'theme';
  code_snippet?: string;
  is_bookmarked?: boolean;
}[] = [
    {
      id: '1',
      creator_id: '1',
      name: 'AppGrade',
      tagline: 'Discover amazing apps',
      description: 'Platform for discovering and awarding the best web applications.',
      website_url: 'https://appgrade.com',
      logo_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
      cover_image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
      status: 'approved',
      views_count: 1234,
      upvotes_count: 234,
      categories: ['Productivity', 'Design'],
      created_at: '2024-11-01',
      type: 'project',
      is_bookmarked: false,
    },
    {
      id: '2',
      creator_id: '1',
      name: 'Dashboard UI Kit',
      tagline: 'Modern dashboard screens',
      description: 'A set of clean and modern dashboard screens for SaaS apps.',
      cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
      status: 'approved',
      views_count: 856,
      upvotes_count: 120,
      categories: ['Design', 'UI Kit'],
      created_at: '2024-11-05',
      type: 'screens',
      is_bookmarked: true,
    },
    {
      id: '3',
      creator_id: '1',
      name: 'Glassmorphism Card',
      tagline: 'React component with glass effect',
      description: 'A reusable React component implementing the glassmorphism design trend.',
      cover_image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
      status: 'approved',
      views_count: 2100,
      upvotes_count: 450,
      categories: ['Development', 'React'],
      created_at: '2024-11-10',
      type: 'ui_element',
      code_snippet: `const GlassCard = ({ children }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl">
    {children}
  </div>
);`,
      is_bookmarked: false,
    },
    {
      id: '4',
      creator_id: '1',
      name: 'Neon Nights Theme',
      tagline: 'Dark mode Tailwind theme',
      description: 'A vibrant dark mode theme for Tailwind CSS inspired by cyberpunk aesthetics.',
      cover_image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
      status: 'approved',
      views_count: 3400,
      upvotes_count: 670,
      categories: ['Design', 'Tailwind'],
      created_at: '2024-11-15',
      type: 'theme',
      code_snippet: `module.exports = {
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff00ff',
          blue: '#00ffff',
          purple: '#bd00ff',
        }
      }
    }
  }
}`,
      is_bookmarked: false,
    },
  ];
