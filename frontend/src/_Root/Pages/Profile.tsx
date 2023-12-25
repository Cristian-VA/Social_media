import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByIdMutation, useGetPostsByUserID } from '@/lib/react-query/queriesAndMutations'
import Loader from '@/components/Reusable/Loader'
import GridPostsLists from '@/components/Reusable/GridPostsLists'

const Profile = () => {
  const {id} = useParams()
  
  const {data:userPosts, isPending} = useGetPostsByUserID(id || "")
  const {data:userDetails, isPending: isLoadingUserDetails } = useGetUserByIdMutation(id || "")

  console.log(userPosts)

  


  

  return (
    <div className='container'>
      {isLoadingUserDetails? (
          <div className="fixed top-0 flex justify-center flex-col gap-2 items-center h-screen">
          <Loader
          color= "white"
          shape= "spiner"
          width= "w-[90px] my-auto"
          />
           <p>Loading profile...</p>
          </div>
      ): (
        <>
      <div className='max-w-5xl flex  items-center w-full gap-6 md:gap-9 '>
        <img src={userDetails?.imageUrl} 
        alt="" 
        className='w-[100px] md:w-[140px] rounded-[8px] mb-auto'/>

        <div className='flex flex-col gap-2'>
          <h1 className='h2'>{userDetails?.name}</h1>
          <p className='base text-slate-500'>@{userDetails?.username} </p>
          <div className='flex mb-2 gap-4'>
            <div className=' flex-col'>
                <p className='text-center text-blue-500 '>{userDetails?.posts.length}</p>
                <p className=''>Posts</p>
            </div>
            <div className=' flex-col'>
                <p className='text-center text-blue-500 '>{userDetails?.followers || 0}</p>
                <p>Followers</p>
            </div>
            <div className=' flex-col'>
                <p className='text-center text-blue-500 '>{userDetails?.following || 0}</p>
                <p>Following</p>
            </div>
           
          </div>
          <p className='hidden lg:block text-justify'>{userDetails?.bio}</p>
        </div>
      </div>
        <p className='block lg:hidden text-[14px] text-justify'>{userDetails?.bio}</p>

        <div className="flex justify-between w-full max-w-5xl   ">
      <h3 className='text-[16px] md:text-[18px]   my-auto bg-slate-700 bg-opacity-60 px-4 py-2 rounded-[8px]'>Posts</h3>

      <div className="flex-center flex gap-3 rounded-[8px] bg-slate-700 bg-opacity-60 px-4 py-2 cursor-pointer">
        <p className="text-[16px] md:text-[18px] font-light my-auto">All</p>
        <img 
          src="/assets/Icons/Filter.svg"
          alt="" 
          className='w-6 h-6 md:w-7 md:h-7 my-auto'
        />

      </div>
      </div>


        <div className=' w-full'>
          <GridPostsLists posts={userPosts?.documents} showUser={false}/>
        
        </div>

      </>
      )}
      
    </div>
   
  )
}

export default Profile