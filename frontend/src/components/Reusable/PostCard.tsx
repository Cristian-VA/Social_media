import React from 'react'
import { Models } from 'appwrite'
import { calculateDaysDifference } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'

const PostCard = ({ post }:Models.Document ) => {
    
    const { user } = useUserContext()
    console.log(user)
    console.log(post)
    const daysPosted= calculateDaysDifference(post.$createdAt)

  return (
    <div className='bg-dark rounded-[8px] border-2 border-slate-700 p-5 lg:p-7 w-full '>
        <div className='flex gap-4  items-center'>
            <Link to={`/profile/${post.creator.$id}`}>
                <img 
                src={post?.creator?.imageUrl}
                alt="Poster Profile" 
                className='rounded-[8px] w-[60px] '
                />
            </Link>

            <div className='flex flex-col justify-center  w-full'>
                <h1 className='capitalize md:text-[18px] text-[16px]'>{post.creator.username}</h1>
                    <div className='text-slate-500 capitalize text-[14px] md:text-[16px]  flex gap-4 '>
                      <p >{daysPosted}</p>

                      <div className='flex gap-1'>
                        <img src="/assets/Icons/location.svg" alt="location Icon" className='w-[18px]' />
                        <p>{post.location}</p>
                      </div>
                      

                    </div>
                
            </div>
            {user.id === post.creator.$id? (
                 <Link to={`/update-post/${post.$id}`}>
                 <img src="/assets/Icons/Edit.svg" alt="location Icon" className='w-[30px] h-[30px] my-auto cursor-pointer hover:brightness-0 transition hover:invert' />
                 
             </Link>
            ) : ""}
           
        </div>
    </div>
  )
}

export default PostCard