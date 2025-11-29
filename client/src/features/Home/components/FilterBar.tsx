import { useState } from "react";
import { RxMixerHorizontal } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const tabs = ["All", "Projects", "Screens", "UI Elements", "Themes"];

interface FilterBarProps {
  activeView: "Following" | "Discover";
  onViewChange: (view: "Following" | "Discover") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FilterBar = ({
  activeView,
  onViewChange,
  selectedCategory,
  activeTab,
  onCategoryChange,
  onTabChange,
}: FilterBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex items-center justify-between py-4 px-4 max-md:px-0 gap-6 md:px-0 text-textColor border-b border-linesColor mb-6 relative">
      <div className="flex items-center space-x-1 bg-cardBg p-1 rounded-full">
        <button
          onClick={() => onViewChange("Discover")}
          className={`px-3.5 py-1.5 text-base font-medium rounded-full transition-colors ${activeView === "Discover"
            ? "bg-bodyBg shadow-sm text-textColor"
            : "text-textColorWeak hover:text-textColor"
            }`}
        >
          Discover
        </button>
        <button
          onClick={() => onViewChange("Following")}
          className={`px-3.5 py-1.5 text-base font-medium rounded-full transition-colors ${activeView === "Following"
            ? "bg-bodyBg shadow-sm text-textColor"
            : "text-textColorWeak hover:text-textColor"
            }`}
        >
          Following
        </button>
      </div>

      <div className="hidden flex-1 md:flex items-center space-x-6 border-l border-linesColor pl-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`font-medium transition-colors duration-200 pt-2 pb-1 border-b-2 ${activeTab === tab
              ? "text-textColor border-textColor"
              : "text-textColorWeak border-transparent hover:text-textColor"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center space-x-2 text-textColor h-[44px] px-4 rounded-full hover:transition ${isFilterOpen || selectedCategory !== "Latest" ? "bg-mainColor text-white" : "bg-cardBg"}`}
        >
          <RxMixerHorizontal className="text-lg" />
          <span className="font-medium">
            {selectedCategory === "Latest" ? "Filter" : selectedCategory}
          </span>
        </button>

        <AnimatePresence>
          {isFilterOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsFilterOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 top-full mt-2 w-56 bg-cardBg rounded-2xl shadow-xl border border-linesColor z-20 overflow-hidden py-2"
              >
                {["Latest", "Most popular", "Top rated"].map((cat, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onCategoryChange(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 font-medium hover:bg-cardItemBg transition-colors ${selectedCategory === cat ? "text-mainColor" : "text-textColor"}`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterBar;
