import React, { useState } from "react";
import {
  HiTrendingUp,
  HiViewGrid,
  HiTemplate,
  HiCollection,
  HiUserGroup,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface SearchSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const menuItems = [
    { id: "trending", label: "Trending", icon: HiTrendingUp },
    { id: "categories", label: "Categories", icon: HiCollection },
    { id: "screens", label: "Screens", icon: HiViewGrid },
    { id: "ui_elements", label: "UI Elements", icon: HiTemplate },
    { id: "themes", label: "Themes", icon: HiCollection },
    { id: "creators", label: "Creators", icon: HiUserGroup },
  ];

  return (
    <>
      {/* Mobile dropdown toggle */}
      <div className="md:hidden w-full px-4 py-2 max-md:border-t border-linesColor ">
        <button
          onClick={() => setOpenMobileMenu((p) => !p)}
          className="w-full py-2.5 px-4 rounded-full bg-cardItemBg text-textColor font-medium flex items-center justify-between"
        >
          <span>
            {menuItems.find((m) => m.id === activeTab)?.label ?? "Select"}
          </span>
          <span className="text-2xl">{openMobileMenu ? <BiChevronUp /> : <BiChevronDown />}</span>
        </button>

        <div className="relative w-full">
          <AnimatePresence>
            {openMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="absolute w-full left-0 top-0 z-20 ring-1 ring-linesColor mt-2 bg-bodyBg p-2 rounded-[28px] flex flex-col gap-1 overflow-hidden shadow-lg"
              >
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setOpenMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left rounded-3xl font-medium transition-colors ${activeTab === item.id
                        ? "bg-mainColor text-white"
                        : "text-textColorWeak hover:bg-cardBg hover:text-textColor"
                      }`}
                  >
                    <item.icon className="text-xl" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence></div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[240px] py-2 pl-4 max-md:pl-0 flex-col gap-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 border ${activeTab === item.id
                ? "bg-cardItemBg text-textColor border-transparent shadow-sm"
                : "bg-transparent text-textColorWeak border-transparent hover:bg-cardBg hover:text-textColor hover:scale-105 hover:shadow-sm hover:border-linesColor"
              }`}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchSidebar;
