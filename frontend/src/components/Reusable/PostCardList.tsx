import React from 'react'
import PostCard from './PostCard'
import { Models } from 'appwrite'

const PostCardList = ({posts}:{posts:Models.Document[]}) => {
    

  return (
    <>
      {posts?.map((post) =>  <PostCard post={post}/> )}
    </>
  )
}

export default PostCardList