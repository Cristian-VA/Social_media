import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';

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
        
             <div className='flex gap-4'>
           
                  <img src="/assets/Icons/Logout.svg" className='w-8 h-8 hover:brightness-0 transition hover:invert cursor-pointer my-auto block' alt="logout" onClick={() => signOut()} />
                  
                
                  <Link to={`/profile/${user.id}`}> 
                    <img 
                    src={user.imageUrl || "/assets/Icons/loading.svg" }
                    className='w-[40px] rounded-[8px] my-auto bg-slate-600'
                    alt="" />
                  </Link>
            </div>

        
      
       


      </div>
    </section>
  )
}

export default TopBar

