import React, {useState, useEffect} from 'react'
import { PostTypeProps } from '@/types'
import { useLikePostMutation, usesSavedPostMutation, useDeleteSavedPostMutation } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { checkIsLiked } from '@/lib/utils'

const PostStats = ({post, userId}:PostTypeProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id)
  const likesInfo = post.likes.map((user: Models.Document) => user)
  
  

  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(true)
  const lastLike= likes.length - 1
  const {mutate: likePost} = useLikePostMutation()
  const {mutate: savePost} = usesSavedPostMutation()
  const {mutate: deletePost} = useDeleteSavedPostMutation()

  const likeDisplayMessage = lastLike === 1 ? `${likesInfo[lastLike]?.name} and ${likesInfo[0]?.name} liked this` : 
  lastLike > 1? `${likesInfo[lastLike]?.name} and ${lastLike} others liked this` : `${likesInfo[lastLike]?.name} liked this`


  const {user} =useUserContext()


  const handleLikePost = (e:React.MouseEvent) => {
    e.stopPropagation()//will only like the post, it will stop it from navigating to post details.

    let newLikes= [...likes]
    const hasLiked= newLikes.includes(user.id)
  
    if (hasLiked){
      newLikes=  newLikes.filter((id) => id !== user.id)
    } else {
      newLikes.push(user.id)
    }

    setLikes(newLikes)
    likePost({postId:post.$id, likesArray:newLikes})
  }

 

  const handleSavePost = (e:React.MouseEvent) => {
    
  }
  console.log(likesInfo)
  
  return (
    <div className='flex justify-between items-center z-20'>
        <div className='flex gap-2 mr-5'>
            <img src={checkIsLiked(likes,userId)? 
            "/assets/Icons/HeartFilled.svg" :
             "/assets/Icons/Heart.svg"}

            alt="like" 
            className='w-6 h-6  md:h-7 md:w-7 cursor-pointer'
            onClick={handleLikePost}
            />
            <p className=' lg:text-[18px]'>{likes.length}</p>
            <p className='text-slate-500 text-[12px] text-right'>{likesInfo[lastLike]?.name? likeDisplayMessage : "Loading Like..."}</p>
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

//{likesInfo[lastLike]?.name} and {lastLike}