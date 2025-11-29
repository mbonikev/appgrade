import React, { ReactNode } from 'react';

interface ChangelogTimelineItemProps {
    date: string;
    title: string;
    description?: string;
    content?: ReactNode;
    version?: string;
    isLast?: boolean;
}

const ChangelogTimelineItem: React.FC<ChangelogTimelineItemProps> = ({
    date,
    title,
    description,
    content,
    version,
    isLast = false
}) => {
    return (
        <div className="flex gap-8 md:gap-16 relative">
            {/* Left Column: Date & Timeline */}
            <div className="flex-shrink-0 w-24 md:w-32 text-right pt-1 relative">
                <span className="text-sm font-medium text-mainColor block mb-1">{date}</span>
                {version && (
                    <span className="text-xs text-textColorWeak bg-cardItemBg px-2 py-0.5 rounded-full inline-block">
                        {version}
                    </span>
                )}

                {/* Timeline Dot */}
                <div className="absolute top-2 -right-[37px] md:-right-[69px] w-3 h-3 rounded-full bg-mainColor ring-4 ring-bodyBg z-10" />
            </div>

            {/* Middle: Timeline Line */}
            {!isLast && (
                <div className="absolute left-[107px] md:left-[147px] top-3 bottom-[-48px] w-px bg-linesColor" />
            )}

            {/* Right Column: Content */}
            <div className="flex-1 pb-12">
                <h3 className="text-xl font-bold text-textColor mb-2">{title}</h3>
                {description && (
                    <p className="text-textColorWeak mb-4 leading-relaxed">
                        {description}
                    </p>
                )}
                {content && (
                    <div className="mt-4">
                        {content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangelogTimelineItem;
