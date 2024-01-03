import React from 'react'
import { useGetCurrentUserMutation } from '@/lib/react-query/queriesAndMutations'
import { Input } from '../ui/input'
import CommentForm from './Forms/CommentForm'
import { Models } from 'appwrite'


const CommentUser = ({postId }:{postId:string }) => {
    const {data: user, isPending}=useGetCurrentUserMutation()
   
  return (

    <div className='flex gap-2 w-full  mt-2'>
        <img 
              src={user?.imageUrl || "/assets/Icons/loading.svg" }
              className='w-[50px] rounded-[8px] my-auto bg-slate-700 object-cover'
              alt="" />
              <CommentForm postId={postId}/>                 
        </div>
  )
}

export default CommentUser