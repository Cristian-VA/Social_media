
import PostCard from './PostCard'
import { Models } from 'appwrite'

const PostCardList = ({posts}:{posts?:Models.Document[]}) => {
    

  return (
    <>
      {posts?.map((post ,index ) =>  <PostCard post={post} key={index}/> )}
    </>
  )
}

export default PostCardList