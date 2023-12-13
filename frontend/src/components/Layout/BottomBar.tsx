import React from 'react'
import {  NavLink, useLocation} from "react-router-dom"
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const BottomBar = () => {

  const { pathname } = useLocation()
  const sideBarLinksmap = sidebarLinks.map((link:INavLink) => {
    const isActive = pathname === link.route;
    return (
      <div
      key={link.label}
      className={`group leftsidebar-link   ${
        isActive && "bg-blue-500 bg-opacity-80"
      }`}>
      <NavLink
        to={link.route}
        className="flex flex-col gap-1 items-center p-3 small">
        <img
          src={link.imgURL}
          alt={link.label}
          className={` w-8 h-8 group-hover:brightness-0 group-hover:invert ${
            isActive && "invert-white" 
          }`}
        />
        
      </NavLink>
    </div>
  
    )
  })
  return (
    <div className='bg-dark bottombar justify-between py-4 px-6' >
      
         {sideBarLinksmap}
      
      
    </div>
  )
}

export default BottomBar