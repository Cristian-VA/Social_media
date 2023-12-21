import { useEffect } from 'react'
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { TbLogout } from "react-icons/tb";
import { useUserContext } from '@/context/AuthContext';
import { INavLink } from '@/types';
import { sidebarLinks } from '@/constants';




const LeftSideBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { mutate: signOut,  isSuccess } = useSignOutAccountMutation()
  const { user, isLoading } = useUserContext()

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  const sideBarLinksmap = sidebarLinks.map((link:INavLink) => {
    const isActive = pathname === link.route;
    return (
      <li
      key={link.label}
      className={`group leftsidebar-link  ${
        isActive && "bg-blue-500"
      }`}>
      <NavLink
        to={link.route}
        className="flex gap-4 items-center p-3 small">
        <img
          src={link.imgURL}
          alt={link.label}
          className={` w-6 h-6 group-hover:brightness-0 group-hover:invert ${
            isActive && "invert-white" 
          }`}
        />
        {link.label}
      </NavLink>
    </li>
  
    )
  })

  return (
    <nav className='bg-dark leftsidebar '>
      <div className='flex flex-col  gap-7 h-full'>
        <Link to="/" className='flex gap-2'>
            <img 
                  src="/assets/Logo.png" 
                  alt=" Logo"
                  className='w-[51px] my-auto'
                  />
            <h1 className="h3 font-bold text-center my-auto"> GrooveGram</h1>  
        </Link>

        <Link to={`/profile/${user.id}`}> 
            <div className='flex gap-4'>
              <img 
              src={user.imageUrl || "/assets/Icons/loading.svg" }
              className='w-[70px] rounded-[8px] my-auto bg-slate-700'
              alt="" />

              <div>
                {isLoading? <h1 className='my-5 base '>Loading info...</h1>: (
                  <>
                  <h1 className='h3 capitalize font-semibold'>{user.name}</h1>
                  <h2 className='base text-slate-500'> @{user.username}</h2>
                  </>
                  )}
              </div>
            </div>
          
        </Link>
        
        <ul className='flex flex-col gap-6'>
        {sideBarLinksmap}
            
        </ul>

      </div>

      <div className='hover:brightness-0 transition hover:invert p-3 flex gap-4 cursor-pointer  w-[150px]' onClick={() => signOut()}>
          <img src="/assets/Icons/Logout.svg" className='w-6 h-6  transition ' alt="" />
          <p className=' my-auto small'>Log out</p>
      </div>
    </nav>
  )
}

export default LeftSideBar