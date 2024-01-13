
import { useParams } from 'react-router-dom'
import { useGetUserByIdMutation } from '@/lib/react-query/queriesAndMutations'
import Loader from '@/components/Reusable/Loader'
import FormProfile from '@/components/Reusable/Forms/FormProfile'


const UpdateProfile = () => {
const { id } = useParams()
const { data: userDetails, isPending: isLoadingUserDetails } =
    useGetUserByIdMutation(id || "");



  return (
    <>
      <div className='flex flex-1'>
        <div className='container'>
          
          {isLoadingUserDetails? (
             <div className="fixed top-0 flex-col justify-center flex items-center h-screen">
             <Loader
             color= "white"
             shape= "spiner"
             width= "w-[90px] my-auto"
             />
             <p>Loading Info...</p>
             </div>
          ) :(

          <>
          <div className='max-w-5xl flex-start gap-2 justify-start w-full flex'>
            
              <img 
                src="/assets/Icons/EditProfile.svg" 
                alt=" addpost "
                className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] '
                />
              <h1 className='base md:text-[24px] my-auto'> Edit Profile</h1>
          </div>
           <FormProfile profile={userDetails}/>
        </>
        ) }
        </div>

    </div>
    
    
    </>
  )
}

export default UpdateProfile