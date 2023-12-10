import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { TbLogout } from "react-icons/tb";
import { useUserContext } from '@/context/AuthContext';
const LeftSideBar = () => {
  const navigate = useNavigate()
  const { mutate: signOut,  isSuccess } = useSignOutAccountMutation()
  const { user } = useUserContext()
  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  return (
    <nav className='bg-dark leftsidebar '>
      <div className='flex flex-col gap-10 h-full'>
        <Link to="/" className='flex gap-2'>
            <img 
                  src="/assets/Logo.png" 
                  alt=" Logo"
                  className='w-[51px] my-auto'
                  />
            <h1 className="h2 font-bold text-center my-auto"> GrooveGram</h1>  
        </Link>

        <Link to={`/profile/${user.id}`}> 
            <div className='flex gap-4'>
              <img 
              src={user.imageUrl || "/assets/DefaultProfile.png" }
              className='w-[70px] rounded-[8px] my-auto'
              alt="" />

              <div>
                  <h1 className='h3 capitalize'>{user.name}</h1>
                  <h2 className='base text-slate-500'> @{user.username}</h2>
              </div>
            </div>
        </Link>
        
      </div>

      <TbLogout onClick={() => signOut()} className="my-auto h-[30px] w-[30px]  text-blue-500  transition hover:text-blue-400 cursor-pointer" />
    </nav>
  )
}

export default LeftSideBar