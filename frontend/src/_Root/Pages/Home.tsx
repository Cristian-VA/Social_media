import Loader from "@/components/Reusable/Loader"
import { useGetRecentPostsMutation } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite"
import PostCard from "@/components/Reusable/PostCard"
const Home = () => {

  const {data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPostsMutation()

  return (
    <div className=' flex flex-1'>
      <div className='container'>
        <div className="home-posts ">
        
              <h1 className='base md:text-[24px] w-full text-left'> Home Feed</h1>

              {isPostLoading && !posts? (
                <Loader
                color= "not white"
                />
              ): (
                <ul className="flex flex-col flex-1 gap-9 w-full">
                  {posts?.documents.map((post:Models.Document) => (
                   <PostCard post={post} key={post.$id} />
                  ))}

                </ul>
              )
              }

          

        </div>
      </div>
    </div>
  )
}

export default Home