import Loader from './Loader'
const LogOutModal = () => {
  return (
    
    <div className='absolute top-0 h-screen w-screen inset-0 bg-opacity-10 bg-slate-900 backdrop-filter backdrop-blur-sm z-10 flex items-center justify-center'>
      
    <div className='md:w-[300px] w-[200px] h-[200px]  md:h-[300px] bg-dark border-2 border-slate-600 rounded-[8px] flex justify-center items-center flex-col gap-2'>
    <Loader
             color= "white"
             shape= "spiner"
             width= "w-[120px] my-auto"
             />
              <p>Logging out</p>
    </div>
  </div>
  )
}

export default LogOutModal