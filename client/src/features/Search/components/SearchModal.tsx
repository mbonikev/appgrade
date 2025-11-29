import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import SearchSidebar from "./SearchSidebar";
import TrendingView from "./TrendingView";
import ListPreviewView from "./ListPreviewView";
import ThemesView from "./ThemesView";
import CreatorsView from "./CreatorsView";
import { uiElements, trendingScreens, themes } from "../data/mockSearchData";
import api from "../../../lib/api";
import type { Creator } from "../../Creators/data/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: any[];
  loading: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await api.get("/api/users/creators");
        setCreators(response.data);
      } catch (error) {
        console.error("Failed to fetch creators:", error);
      }
    };

    if (activeTab === "creators") {
      fetchCreators();
    }
  }, [activeTab]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const searchFiltered = projects.filter((project) => {
    const q = searchQuery.toLowerCase();

    return (
      project.title.toLowerCase().includes(q) ||
      project.tagline?.toLowerCase().includes(q) ||
      project.description?.toLowerCase().includes(q) ||
      project.author?.name?.toLowerCase().includes(q) ||
      project.tags?.some((t: string) => t.toLowerCase().includes(q))
    );
  });

  //   ui-elements
  const filteredApps = searchFiltered.filter((app) => {
    if (activeTab === "screens") return app.type === "screens";
    if (activeTab === "ui_elements") return app.type === "ui_element";
    if (activeTab === "themes") return app.type === "theme";
    return true;
  });

  const renderContent = () => {
    switch (activeTab) {
      case "trending":
        return <TrendingView projects={searchFiltered} />;

      case "ui_elements":
        return <ListPreviewView projects={filteredApps} title="UI Elements" />;

      case "screens":
        return <ListPreviewView projects={filteredApps} title="Screens" />;

      case "themes":
        return <ListPreviewView projects={filteredApps} title="Themes" />;

      case "creators":
        return (
          <CreatorsView
            items={creators}
            searchQuery={searchQuery}
            onClose={onClose}
          />
        );

      default:
        return <TrendingView projects={searchFiltered} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-md:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl h-[80vh] max-md:h-svh bg-modalBg rounded-3xl max-md:rounded-none shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-5 py-3 px-5 bg-modalBg z-10">
              <RiSearch2Line className="text-textColorWeak text-xl" />
              <input
                type="text"
                placeholder="Web Apps, Screens, UI Elements, Creators or Keywords..."
                className="flex-1 bg-transparent text-base text-textColor placeholder-textColorWeak outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />

              <div className="w-px h-6 bg-linesColor" />
              <button
                onClick={onClose}
                className="p-2 hover:bg-cardItemBg rounded-full text-textColorWeak hover:text-textColor transition-colors"
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 max-md:flex-col overflow-hidden bg-modalBgWeak pb-5">
              <SearchSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {renderContent()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
