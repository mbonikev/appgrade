import React from "react";
import { RiSearch2Line } from "react-icons/ri";

interface TrendingViewProps {
  selectedCategory?: string;
  projects: any[];
}

const TrendingView: React.FC<TrendingViewProps> = ({
  selectedCategory = "All",
  projects,
}) => {
  // Filter projects by category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Build "apps" row from projects (using logo or first image)
  const apps = filteredProjects.map((p) => ({
    id: p._id,
    name: p.title,
    image: p.logo || p.images?.[0], // use logo first, fallback to cover
  }));

  // Build "screens" grid from projects (using first image)
  const screens = filteredProjects.map((p) => ({
    id: p._id,
    name: p.title,
    image: p.images?.[0],
  }));

  // mock searchTags stays as-is
  const searchTags = [
    { label: "Dashboard" },
    { label: "Fintech" },
    { label: "E-commerce" },
    { label: "AI" },
    { label: "SaaS" },
  ];

  return (
    <div className="flex-1 px-6 py-2 overflow-y-auto">
      {/* Recent Searchs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {searchTags.map((tag, index) => (
          <button
            key={index}
            className="flex items-center gap-2 bg-cardBg hover:bg-cardItemBg px-4 py-2 rounded-full text-sm font-medium text-textColor transition-colors border border-linesColor"
          >
            <RiSearch2Line className="text-textColorWeak text-lg" />
            {tag.label}
          </button>
        ))}
      </div>

      {/* Apps Row */}
      <h3 className="text-textColorWeak text-sm font-medium mb-4">Apps</h3>
      <div className="flex flex-wrap gap-4 mb-8 p-1 overflow-x-auto pb-4 scrollbar-hide">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex-shrink-0 size-16 bg-cardBg ring-1 ring-linesColor rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform flex items-center justify-center shadow-sm"
          >
            <img
              src={app.image}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Screens Grid */}
      <div>
        <h3 className="text-textColorWeak text-sm font-medium mb-4">Screens</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {screens.slice(0, 4).map((screen) => (
            <div key={screen.id} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-cardBg rounded-2xl overflow-hidden mb-2 relative border border-linesColor">
                <img
                  src={screen.image}
                  alt={screen.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <p className="text-textColor font-medium text-base px-1">
                {screen.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingView;
