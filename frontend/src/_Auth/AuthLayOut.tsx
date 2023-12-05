
import { Outlet, Navigate} from 'react-router-dom'
import ParticleBg from "../components/Reusable/ParticleBg.tsx"
import { motion } from "framer-motion"

const AuthLayOut = () => {

  

  const isAuthenticated = false

  return (
   <>
    <ParticleBg/>
    {isAuthenticated ? (
      <Navigate to="/"/>
    ): (
      <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet/>
      </section>
      
      <div className='w-1/2 h-screen  justify-center items-center hidden xl:flex'>
        <motion.img 
        src="/assets/LogoBig.png" 
        alt=" Logo"
        className='max-w-[616.8px]'

        animate = {{
          y: [ 0,10,0 ]
        }}

        transition = {{
          duration:2.5,
          repeat:Infinity,
          ease:"easeInOut"
        }}
        />
       </div>
      </>
    )}
   </>
  )
}

export default AuthLayOut