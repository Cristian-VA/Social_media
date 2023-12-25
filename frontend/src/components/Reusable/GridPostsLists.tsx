import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
type GridPostListType = {
    posts?:Models.Document[],
    showStats?: boolean,
    showUser?: boolean

}

const GridPostsLists = ({posts, showStats=true, showUser=true}:GridPostListType) => {
   
    const {user} = useUserContext()
    

  return (
    <ul className="grid-container">
        {posts?.map((post) => {
            return (
                <li key={post.$id} className="relative min-w-[200px] h-[300px]">
                    <Link to={`/posts/${post?.$id}`} className="flex rounded-[8px] border border-slate-800 overflow-hidden cursor-pointer w-full h-full">
                        <img src={post?.ImageUrl} alt="" 
                        className="rounded-[8px] object-cover w-full h-full"/>
                    </Link>
                {showUser && (
                    <div className="absolute bottom-0  rounded-b-[8px] bg-gradient-to-t from-gray-700 to-transparent h-20 w-full">
                    <div className="flex gap-2 ml-4 mb-4">
                        <img src={post?.creator?.imageUrl} alt="" 
                        className="w-16 h-16 object-cover rounded-[8px]"/>
                        <p className="my-auto base line-clamp-1">{post?.creator?.username}</p>
                    </div>
                </div>
                )}

            

                {showStats && (
                <div className="w-[90px] absolute bottom-0 right-0 mr-4 mb-4">
                       <PostStats post={post} userId={user.id} noText/>
                </div>
                )
                }
                    
                </li>
            )
        })}
    </ul>
  )
}

export default GridPostsLists