import Navbar from '../../../components/layout/Navbar'
import FilterBar from '../components/FilterBar'
import ProBanner from '../components/ProBanner'
import AppGrid from '../components/AppGrid'

function Home() {
  return (
    <div className="h-fit bg-bodyBg text-textColor">
      <Navbar />
      <div className="w-full h-fit px-10 md:px-10 max-md:px-4">
        <FilterBar />
        <ProBanner />
        <AppGrid />
      </div>
    </div>
  )
}

export default Home