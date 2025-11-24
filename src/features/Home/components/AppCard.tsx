import React from "react";
import { HiStar } from "react-icons/hi";
// import { RiPlayFill, RiLockFill } from "react-icons/ri";

interface AppCardProps {
  title: string;
  description: string;
  image: string;
  icon: string;
  badge?: "New" | "Updated";
  isLocked?: boolean;
  hasVideo?: boolean;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  image,
  icon,
  badge,
  // isLocked,
  // hasVideo,
}) => {
  return (
    <div className="group cursor-pointer relative flex flex-col">
      {/* Media Section */}
      <div className="relative w-full p-6 bg-cardBg group-hover:bg-cardItemBg hover:transition rounded-3xl overflow-hidden">
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-mainColor text-white text-xs font-bold px-2 py-1 rounded-xl backdrop-blur-md shadow-sm">
            {badge}
          </div>
        )}
        <div className="relative aspect-[16/10] bg-cardBg overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Right Icon (Video or Lock) */}
          {/* <div className="absolute top-3 right-3">
            {isLocked ? (
              <div className="bg-black/50 p-1.5 rounded-full backdrop-blur-md text-white">
                <RiLockFill className="text-xs" />
              </div>
            ) : hasVideo ? (
              <div className="bg-black/50 p-1.5 rounded-full backdrop-blur-md text-white">
                <RiPlayFill className="text-xs" />
              </div>
            ) : null}
          </div> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-2 pb-5 pt-4 flex items-start space-x-3">
        <img
          src={icon}
          alt={`${title} icon`}
          className="w-10 h-10 rounded-full bg-cardBg shadow-lg"
        />
        <div className="flex flex-col flex-1">
          <h3 className="text-textColor font-semibold leading-tight">
            {title}
          </h3>
          <p className="text-textColorWeak text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center text-sm font-semibold gap-1">
          <HiStar className="text-base text-orange-500 dark:text-orange-400 " />
          3.4 (23)
        </div>
      </div>
    </div>
  );
};

export default AppCard;
