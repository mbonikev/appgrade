import React from 'react';
import { motion } from 'framer-motion';
import AppCard from '../../Home/components/AppCard';
import EmptyState from './EmptyState';

interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    cover_image_url: string;
    logo_url?: string;
    type?: 'project' | 'screens' | 'ui_element' | 'theme';
    is_bookmarked?: boolean;
}

interface ProjectsGridProps {
    projects: Project[];
    isLoading?: boolean;
    isOwnProfile: boolean;
    onEdit?: (projectId: string) => void;
    onDelete?: (projectId: string) => void;
    onBookmark?: (projectId: string) => void;
    onClick?: (project: Project) => void;
    emptyTitle?: string;
    emptyDescription?: string;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
    projects,
    isLoading,
    isOwnProfile,
    onEdit,
    onDelete,
    onBookmark,
    onClick,
    emptyTitle,
    emptyDescription
}) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[16/10] bg-cardItemBg rounded-3xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <EmptyState
                title={emptyTitle || (isOwnProfile ? "No projects yet" : "No projects found")}
                description={emptyDescription || (isOwnProfile
                    ? "Share your first project with the community!"
                    : "This creator hasn't published any projects yet.")}
                actionLabel={isOwnProfile && !emptyTitle ? "Submit Project" : undefined}
                onAction={isOwnProfile && !emptyTitle ? () => { /* Open submit modal */ } : undefined}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <AppCard
                        id={project.id}
                        title={project.name}
                        description={project.tagline || project.description}
                        image={project.cover_image_url}
                        icon={project.logo_url}
                        type={project.type}
                        isOwnProject={isOwnProfile}
                        isBookmarked={project.is_bookmarked}
                        onEdit={() => onEdit?.(project.id)}
                        onDelete={() => onDelete?.(project.id)}
                        onBookmark={() => onBookmark?.(project.id)}
                        onClick={() => onClick?.(project)}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default ProjectsGrid;
