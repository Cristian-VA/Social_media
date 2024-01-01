import { Models } from 'appwrite'
import { calculateDaysDifference } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'
import PostStats from './PostStats'
import CommentBox from './CommentBox'
import { useState } from 'react'
import CommentsBox from './CommetsBox'

type postCardType = {
  post?:Models.Document
}

const PostCard = ({ post }:postCardType) => {

    
      const [toggle, setToggle] = useState(false)
    
    const { user } = useUserContext()
    console.log(post)
  
    const daysPosted= calculateDaysDifference(post?.$createdAt)

    const TagsMap = post?.tags?.map((tag:string) => {
      return (
        <li key={tag} className='capitalize bg-slate-700 py-1 px-2 rounded-[8px] max-w-full  '>#{tag}</li>
      )
    })

    const lastCommentIndex = post?.comments?.length -1 


  return (
    <>
    {post?.creator? (

<div className='bg-dark rounded-[8px] border-2 border-slate-700 px-5 pt-5 pb-0  lg:py-7  lg:pt-7 w-full  '>
<div className='flex gap-4  items-center '>
    <Link to={`/profile/${post?.creator?.$id}`}>
        <img 
        src={post?.creator?.imageUrl}
        alt="Poster Profile" 
        className='rounded-[8px] w-[60px] md:w-[80px] '
        />
    </Link>

    <div className='flex flex-col justify-center  w-full'>
        <h1 className='capitalize md:text-[18px] text-[16px] font-semibold'>{post?.creator?.username}</h1>
            <div className='text-slate-500 capitalize text-[12px] md:text-[14px]  flex gap-4 '>
              <p >{daysPosted}</p>

              <div className='flex gap-1'>
                <img src="/assets/Icons/location.svg" alt="location Icon" className='w-[18px]' />
                <p>{post?.location}</p>
              </div>
              

            </div>
        
    </div>
    {user?.id === post?.creator?.$id? (
         <Link to={`/update-post/${post?.$id}`}>
            <img src="/assets/Icons/Edit.svg" alt="location Icon" className='w-[30px] h-[30px] my-auto cursor-pointer hover:brightness-0 transition hover:invert' />
        </Link>
    ) : ""}
   
</div>
<Link to={`/posts/${post?.$id}`}>
      <div className='tiny lg:text-[16px] py-5'>
        <p>{post?.caption}</p>
        <ul className='flex gap-2 mt-3 max-w-full flex-wrap f'>
          {TagsMap}
        </ul>
      </div>

      <img 
        src={post?.ImageUrl}
        alt="" 
        className=' rounded-[8px] h-[300px] md:h-[400px] lg:h-[500px] w-full  object-cover mb-5'
      />

</Link>

<PostStats post= {post} userId= {user.id}/>
{post?.comments[lastCommentIndex] ? (
  <div>
          <hr className="border-2 border-slate-600 opacity-20  w-full mb-4 mt-2" />
          <CommentBox info={post?.comments[lastCommentIndex]}/>
          {post?.comments?.length - 1 > 0? (

            <CommentsBox msg={`View all (${post?.comments?.length}) comments`} info={post?.comments}/>
            
          ) : ""}
  
  
  
  </div>
  
) : ""}
</div>

    ) : "helo"}
   

   
    </>
  )
}

export default PostCard