import { useState } from "react";
import { RxMixerHorizontal } from "react-icons/rx";

const tabs = ["Latest", "Most popular", "Top rated"];

const FilterBar = () => {
  const [activeTab, setActiveTab] = useState("Latest");

  return (
    <div className="flex items-center justify-between py-4 px-4 max-md:px-0 gap-6 md:px-0 text-textColor border-b border-linesColor mb-6">
      <div className="flex items-center space-x-1 bg-cardBg p-1 rounded-full">
        <button className="px-3.5 py-1.5 text-base font-medium rounded-full bg-bodyBg shadow-sm text-textColor">
          Testing
        </button>
        <button className="px-3.5 py-1.5 text-base font-medium rounded-full text-textColorWeak hover:text-textColor">
          Ready
        </button>
      </div>

      <div className="hidden flex-1 md:flex items-center space-x-6 border-l border-linesColor pl-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium transition-colors duration-200 pt-2 pb-1 border-b-2 ${activeTab === tab
                ? "text-textColor border-textColor"
                : "text-textColorWeak border-transparent hover:text-textColor"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <button className="flex items-center space-x-2 text-textColor bg-cardBg h-[44px] px-4 rounded-full hover:transition">
        <RxMixerHorizontal className="text-lg" />
        <span className="font-medium">Filter</span>
      </button>
    </div>
  );
};

export default FilterBar;
