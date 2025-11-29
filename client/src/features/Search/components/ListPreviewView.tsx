import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ListPreviewViewProps {
  title: string;
  projects: any[];
  selectedCategory?: string;
}

export interface ProjectItem {
  _id: string;
  title: string;
  tagline: string;
  images: string[];
  category?: string;
  group?: string;
  count?: number;
}

const ListPreviewView: React.FC<ListPreviewViewProps> = ({
  title,
  projects,
  selectedCategory = "All",
}) => {
  const [hoveredItem, setHoveredItem] = useState<ProjectItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? projects
      : projects.filter((item) => item.category === selectedCategory);

  // Group projects
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      const group = item.group || "Other";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, ProjectItem[]>
  );

  // Sort groups if needed (e.g., put 'Other' last)
  const groups = Object.keys(groupedItems).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="flex-1 h-full overflow-y-auto px-6 py-2 relative">
      {projects.length > 0 ? (
        <>
          {groups.map((group) => (
            <div key={group} className="mb-8">
              {group !== "Other" && (
                <h3 className="text-textColorWeak text-sm font-medium mb-3">
                  {group}
                </h3>
              )}
              <div className="flex flex-col gap-1">
                {groupedItems[group].map((item: any, index: any) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="flex projects-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-cardItemBg transition-colors group"
                  >
                    <span className="text-textColor font-medium transition-colors">
                      {item.title}
                    </span>
                    {item.count && (
                      <span className="text-textColorWeak text-sm transition-colors">
                        {item.count.toLocaleString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Floating Cursor Preview */}
          <AnimatePresence>
            {hoveredItem && hoveredItem.images[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "fixed",
                  left: mousePosition.x + 20,
                  top: mousePosition.y - 100, // Offset to show above/side of cursor
                  zIndex: 100,
                  pointerEvents: "none",
                }}
                className="w-64 aspect-video bg-cardBg rounded-xl overflow-hidden shadow-2xl border border-linesColor"
              >
                <img
                  src={hoveredItem.images[0]}
                  alt={hoveredItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs font-medium truncate">
                    {hoveredItem.title}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="w-full flex flex-col text-textColorWeak text-center">
          <p>No {title.toLocaleLowerCase()} found matching</p>
        </div>
      )}
    </div>
  );
};

export default ListPreviewView;
