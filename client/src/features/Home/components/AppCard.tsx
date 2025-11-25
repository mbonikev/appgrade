import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import { RiMore2Fill, RiPencilLine, RiDeleteBinLine, RiBookmarkLine, RiBookmarkFill, RiCodeSSlashLine, RiLayoutMasonryLine, RiPaletteLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

interface AppCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
  badge?: "New" | "Updated";
  type?: 'project' | 'screens' | 'ui_element' | 'theme';
  isOwnProject?: boolean;
  isBookmarked?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onBookmark?: () => void;
  onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  image,
  icon,
  badge,
  type = 'project',
  isOwnProject,
  isBookmarked,
  onEdit,
  onDelete,
  onBookmark,
  onClick
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getTypeIcon = () => {
    switch (type) {
      case 'screens': return <RiLayoutMasonryLine className="text-blue-500" />;
      case 'ui_element': return <RiCodeSSlashLine className="text-purple-500" />;
      case 'theme': return <RiPaletteLine className="text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col"
    >
      {/* Media Section */}
      <div className="relative w-full p-6 bg-cardBg group-hover:bg-cardItemBg hover:transition rounded-3xl overflow-hidden">
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-mainColor text-white text-xs font-bold px-2 py-1 rounded-xl backdrop-blur-md shadow-sm">
            {badge}
          </div>
        )}

        {/* Action Menu (Own Project) */}
        {isOwnProject && (
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
            >
              <RiMore2Fill />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 top-full mt-2 w-32 bg-bodyBg border border-linesColor rounded-xl shadow-xl overflow-hidden py-1"
                >
                  <button onClick={(e) => { e.stopPropagation(); onEdit?.(); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm text-textColor hover:bg-cardItemBg flex items-center gap-2">
                    <RiPencilLine /> Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDelete?.(); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-cardItemBg flex items-center gap-2">
                    <RiDeleteBinLine /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Bookmark Button (Other Projects) */}
        {!isOwnProject && onBookmark && (
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark(); }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
          >
            {isBookmarked ? <RiBookmarkFill className="text-mainColor" /> : <RiBookmarkLine />}
          </button>
        )}

        <div className="relative aspect-[16/10] bg-cardBg overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Type Indicator Overlay */}
          {type !== 'project' && (
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg text-white text-xs">
              {getTypeIcon()}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-2 pb-5 pt-4 flex items-start space-x-3">
        {icon && (
          <img
            src={icon}
            alt={`${title} icon`}
            className="w-10 h-10 rounded-full bg-cardBg shadow-lg"
          />
        )}
        <div className="flex flex-col flex-1">
          <h3 className="text-textColor font-semibold leading-tight flex items-center gap-2">
            {title}
          </h3>
          <p className="text-textColorWeak text-sm mt-1 line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center text-sm font-semibold gap-1">
          <HiStar className="text-base text-orange-500 dark:text-orange-400 " />
          3.4
        </div>
      </div>
    </div>
  );
};

export default AppCard;
