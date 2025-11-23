import Navbar from '../../../components/layout/Navbar'
import FilterBar from '../components/FilterBar'
import ProBanner from '../components/ProBanner'
import AppGrid from '../components/AppGrid'

function Home() {
  return (
    <div className="min-h-screen bg-bodyBg text-textColor">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <FilterBar />
        <ProBanner />
        <AppGrid />
      </div>
    </div>
  )
}

export default Home