import React from 'react'
import { useGetCurrentUserMutation } from '@/lib/react-query/queriesAndMutations'
import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations'
import GridPostsLists from '@/components/Reusable/GridPostsLists'

const Saved = () => {
  const {data: user} = useGetCurrentUserMutation()
  console.log(user)

  const savedPostArray = user?.save?.map((item:any) => item.post)
  console.log(savedPostArray)
  
  return (
  <div className='container'>
    <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
    <div className='max-w-5xl flex-start gap-2 justify-start w-full flex'>
            
            <img 
              src="/assets/Icons/Bookmark.svg" 
              alt=" addpost "
              className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] '
              />
            <h1 className='base md:text-[24px] my-auto tracking-tight'> Saved Posts</h1>
        </div>
       
        <hr className="border-2 border-slate-600 opacity-20  w-full" />
      </div>

      <div className="flex justify-between w-full max-w-5xl    ">
        <h3 className="text-[16px] md:text-[20px]   my-auto bg-slate-700 bg-opacity-60 px-4 py-2 rounded-[8px]">
          All posts
        </h3>

        <div className="flex-center flex gap-3 rounded-[8px] bg-slate-700 bg-opacity-60 px-4 py-2 cursor-pointer">
          <p className="text-[16px] md:text-[18px] font-light my-auto">All</p>
          <img
            src="/assets/Icons/Filter.svg"
            alt=""
            className="w-6 h-6 md:w-7 md:h-7 my-auto"
          />
        </div>
      </div>
    <GridPostsLists posts={savedPostArray} showStats={true}  showUser={false}/>
  
  
  </div>
  )
}

export default Saved