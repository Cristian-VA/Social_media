import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { TbLogout } from "react-icons/tb";
import { useUserContext } from '@/context/AuthContext';

const TopBar = () => {
  const navigate = useNavigate()
  const { mutate: signOut,  isSuccess } = useSignOutAccountMutation()
  const { user } = useUserContext()
  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])
  

  return (
    <section className='topbar bg-dark'>
      <div className='flex justify-between py-4 px-6'>
        <Link to="/" className='flex gap-2'>
          <img 
                src="/assets/Logo.png" 
                alt=" Logo"
                className='w-[40px] block xl:hidden my-auto'
                />
          <h1 className="h3 font-bold text-center my-auto"> GrooveGram</h1>  
        </Link>
        
        <div className='flex gap-3'>
           
            <TbLogout onClick={() => signOut()} className="my-auto h-[30px] w-[30px]  text-blue-500  transition hover:text-blue-400 cursor-pointer" />
            <Link to={`/profile/${user.id}`}> 
              <img 
              src={user.imageUrl || "/assets/DefaultProfile.png" }
              className='w-[40px] rounded-[8px] my-auto'
              alt="" />
            </Link>
        </div>

        
      
       


      </div>
    </section>
  )
}

export default TopBar

//2:22:17