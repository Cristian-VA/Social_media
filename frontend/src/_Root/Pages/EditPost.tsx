
import FormPost from '@/components/Reusable/Forms/FormPost'
import { useParams } from 'react-router-dom'
import { useGetPostByIdMutation } from '@/lib/react-query/queriesAndMutations'
import Loader from '@/components/Reusable/Loader'
const EditPost = () => {
const { id } = useParams()
const {data: post, isPending: isLoadingPost} = useGetPostByIdMutation( id || "")


  
  return (
    <>
      <div className='flex flex-1'>
        <div className='container'>
          
          {isLoadingPost? (
             <div className="fixed top-0 flex-col justify-center flex items-center h-screen">
             <Loader
             color= "white"
             shape= "spiner"
             width= "w-[90px] my-auto"
             />
             <p>Loading Post...</p>
             </div>
          ) :(

          <>
          <div className='max-w-5xl flex-start gap-2 justify-start w-full flex'>
            
              <img 
                src="/assets/Icons/AddPost.svg" 
                alt=" addpost "
                className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] '
                />
              <h1 className='base md:text-[24px] my-auto'> Edit Post</h1>
          </div>
        <FormPost action = "Update" post={post}/>
        </>
        ) }
        </div>

    </div>
    
    
    </>
  )
}

export default EditPost