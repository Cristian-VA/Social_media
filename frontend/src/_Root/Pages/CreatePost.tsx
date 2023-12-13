import React from 'react'
import FormPost from '@/components/Reusable/Forms/FormPost'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
        <div className='container'>
          <div className='max-w-5xl flex-start gap-2 justify-start w-full flex'>
              <img 
                src="/assets/Icons/AddPost.svg" 
                alt=" addpost "
                className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] '
                />
              <h1 className='base md:text-[24px] my-auto'> Create Post</h1>

          </div>
        <FormPost/>

        </div>

    </div>
  )
}

export default CreatePost