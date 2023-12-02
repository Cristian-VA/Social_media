
import { Outlet, Navigate} from 'react-router-dom'

const AuthLayOut = () => {

  const isAuthenticated = false

  return (
   <>
    {isAuthenticated ? (
      <Navigate to="/"/>
    ): (
      <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet/>
      </section>
      
      <div className='w-1/2 h-screen  justify-center items-center hidden xl:flex'>
        <img 
        src="/assets/Logo.png" 
        alt=" Logo"
        className='p-16'
        />
       </div>
      </>
    )}
   </>
  )
}

export default AuthLayOut