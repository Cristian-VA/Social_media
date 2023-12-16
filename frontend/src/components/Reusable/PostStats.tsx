import React, {useState, useEffect} from 'react'
import { PostTypeProps } from '@/types'
import { useLikePostMutation, usesSavedPostMutation, useDeleteSavedPostMutation } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { checkIsLiked } from '@/lib/utils'

const PostStats = ({post, userId}:PostTypeProps) => {
  const likesList = post.likes.map((user:Models.Document) => user.$id)
  
  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(true)

  const {mutate: likePost} = useLikePostMutation()
  const {mutate: savePost} = usesSavedPostMutation()
  const {mutate: deletePost} = useDeleteSavedPostMutation()

  const {user} =useUserContext()

  const handleLikePost = () => {}

  const handleSavePost = () => {}
  
  return (
    <div className='flex justify-between items-center z-20'>
        <div className='flex gap-2 mr-5'>
            <img src={checkIsLiked(likes,userId)? 
            "/assets/Icons/HeartFilled.svg" :
             "/assets/Icons/Heart.svg"}

            alt="like" 
            className='w-6 h-6 md:h-7 md:w-7 cursor-pointer'
            onClick={handleLikePost}
            />
            <p className='my-auto lg:text-[18px]'>{likes.length}</p>
        </div>

        <div className='flex'>
        <img src={isSaved? 
            "/assets/Icons/BookmarkSfilled.svg" :
             "/assets/Icons/BookmarkS.svg"}
            alt="like" 
            className='w-6 h-6 md:h-7 md:w-7 cursor-pointer'
            onClick={handleSavePost}
            />
        </div>
       
    </div>
  )
}

export default PostStats
//4:16:18