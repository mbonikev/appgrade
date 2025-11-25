import { useState } from 'react';



import Navbar from '../../../components/layout/Navbar'
import FilterBar from '../components/FilterBar'
import ProBanner from '../components/ProBanner'
import AppGrid from '../components/AppGrid'

function Home() {
  const [activeView, setActiveView] = useState<"Following" | "Discover">("Following");
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="h-fit bg-bodyBg text-textColor">
      <Navbar />
      <div className="w-full h-fit px-10 md:px-10 max-md:px-4">
        <FilterBar
          activeView={activeView}
          onViewChange={setActiveView}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProBanner />
        <AppGrid activeView={activeView} selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}

export default Home