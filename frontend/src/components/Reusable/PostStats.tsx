import React, {useState, useEffect} from 'react'
import { PostTypeProps } from '@/types'
import { useLikePostMutation, usesSavedPostMutation, useDeleteSavedPostMutation, useGetCurrentUserMutation } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { checkIsLiked } from '@/lib/utils'
import { ModalLikes } from './ModalLikes'


const PostStats = ({post, userId}:PostTypeProps) => {
  const likesList = post.likes.map((currentUser: Models.Document) => currentUser.$id)
  const likesInfo = post.likes.map((currentUser: Models.Document) => currentUser)
  
  

  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(true)
  const lastLike= likes.length - 1
  const {mutate: likePost} = useLikePostMutation()
  const {mutate: savePost} = usesSavedPostMutation()
  const {mutate: deletePost} = useDeleteSavedPostMutation()

  const { data: currentUser } = useGetCurrentUserMutation() //need to use queries for refetching so we use the mutation and not the context
  const userWhoLike = likesInfo[lastLike]?.username === currentUser?.username ? "You" : likesInfo[lastLike]?.username
 

  const likeDisplayMessage = lastLike === 1 ? `${userWhoLike} and ${likesInfo[0]?.username} liked this` : 
  lastLike > 1? `${userWhoLike} and ${lastLike} others liked this` : `${userWhoLike} liked this`
 

  


  const handleLikePost = (e:React.MouseEvent) => {
    e.stopPropagation()//will only like the post, it will stop it from navigating to post details.

    let newLikes= [...likes]
    const hasLiked= newLikes.includes(currentUser?.$id)
  
    if (hasLiked){
      newLikes=  newLikes.filter((id) => id !== currentUser?.$id)
    } else {
      newLikes.push(currentUser?.$id)
    }

    setLikes(newLikes)
    likePost({postId:post.$id, likesArray:newLikes})
  }

 

  const handleSavePost = (e:React.MouseEvent) => {
    
  }

  
  return (
    <div className='flex justify-between items-center z-20'>
        <div className='flex gap-2 mr-5'>
            <img src={checkIsLiked(likes,userId)? 
            "/assets/Icons/HeartFilled.svg" :
             "/assets/Icons/Heart.svg"}

            alt="like" 
            className='w-5 h-5  md:h-7 md:w-7 cursor-pointer my-auto'
            onClick={handleLikePost}
            />
            <p className=' lg:text-[18px] text-[14px] my-auto'>{likes.length}</p>
            <div>
              
            <ModalLikes
            btnText={likesInfo[lastLike]?.username? likeDisplayMessage : likes.length === 0? "Be the first to like" : "Liking post..."}
            PeopleWhoLiked = {likesInfo}
            /> 

            </div>
           
        </div>

       
        <img src={isSaved? 
            "/assets/Icons/BookmarkSfilled.svg" :
             "/assets/Icons/BookmarkS.svg"}
            alt="like" 
            className='w-5 h-5 mb-auto md:h-7 md:w-7 cursor-pointer my-auto'
            onClick={handleSavePost}
            />
  
       
    </div>
  )
}

export default PostStats
//4:16:18

//{likesInfo[lastLike]?.name} and {lastLike}