import React from 'react'
import { useGetCurrentUserMutation } from '@/lib/react-query/queriesAndMutations'
import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations'
import GridPostsLists from '@/components/Reusable/GridPostsLists'

const Saved = () => {
  const {data: user} = useGetCurrentUserMutation()
  const {data: savedposts, isPending}= useGetSavedPosts()
  console.log(user)
  const mapGrid = savedposts?.documents.map((saved) => {
    return (
     <GridPostsLists posts={saved.post} showStats={false} showUser={false}/>
    )
  })
  return (
  <div className='w-full'>
  
  
  </div>
  )
}

export default Saved