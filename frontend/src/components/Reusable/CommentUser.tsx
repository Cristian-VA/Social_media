import React from 'react'
import { useGetCurrentUserMutation } from '@/lib/react-query/queriesAndMutations'
import { Input } from '../ui/input'

const CommentUser = () => {
    const {data: user, isPending}=useGetCurrentUserMutation()
  return (

    <div className='flex gap-2 w-full  mt-2'>
        <img 
              src={user?.imageUrl || "/assets/Icons/loading.svg" }
              className='w-[50px] rounded-[8px] my-auto bg-slate-700 object-cover'
              alt="" />
                 <Input placeholder='Write your comment..'  className="text-slate-800 my-auto  bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 " />                    
        </div>
  )
}

export default CommentUser