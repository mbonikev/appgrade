import { useState } from 'react';
import { RiFilter3Line } from 'react-icons/ri';

const tabs = ['Latest', 'Most popular', 'Top rated', 'Animations'];

const FilterBar = () => {
    const [activeTab, setActiveTab] = useState('Latest');

    return (
        <div className="flex items-center justify-between py-4 px-4 md:px-0 text-textColor border-b border-[#2c2c2c] mb-6">
            <div className="flex items-center space-x-1 bg-cardBg p-1 rounded-lg">
                <div className="flex rounded-md p-0.5">
                    <button className="px-3 py-1 text-sm font-medium rounded-md bg-[#181818] shadow-sm text-textColor">Testing</button>
                    <button className="px-3 py-1 text-sm font-medium rounded-md text-textColorWeak hover:text-textColor">Ready</button>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-medium transition-colors duration-200 ${activeTab === tab ? 'text-textColor border-b-2 border-textColor pb-1' : 'text-textColorWeak hover:text-textColor'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <button className="flex items-center space-x-2 text-sm text-textColorWeak hover:text-textColor transition-colors">
                <RiFilter3Line className="text-lg" />
                <span>Filter</span>
            </button>
        </div>
    );
};

export default FilterBar;
