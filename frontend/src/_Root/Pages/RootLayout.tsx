
import TopBar from '@/components/Layout/TopBar'
import LeftSideBar from '@/components/Layout/LeftSideBar'
import BottomBar from '@/components/Layout/BottomBar'
import { Outlet } from 'react-router-dom'
import ParticleBg from '@/components/Reusable/ParticleBg'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar/>
      <LeftSideBar/>
      
      <section className='flex flex-1 h-full'>
          <ParticleBg/>
          <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default RootLayout