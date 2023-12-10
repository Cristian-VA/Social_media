import React from 'react'
import TopBar from '@/components/Layout/TopBar'
import LeftSideBar from '@/components/Layout/LeftSideBar'
import BottomBar from '@/components/Layout/BottomBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar/>
      <LeftSideBar/>
      
      <section className='flex flex-1 h-full'>
          <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default RootLayout