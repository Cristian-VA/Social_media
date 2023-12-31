import Loader from "@/components/Reusable/Loader";
import { useGetRecentPostsMutation } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import PostCard from "@/components/Reusable/PostCard";
const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPostsMutation();

  return (
    <div className=" flex flex-1">
      <div className="container ">
        <div className="home-posts ">
        <div className='max-w-5xl flex-start gap-2 justify-start w-full flex'>
            <h1 className='base md:text-[24px] my-auto tracking-tight'> Home Feed</h1>
        </div>
          {isPostLoading && !posts ? (
            <div className="fixed top-0 flex justify-center flex-col gap-2 items-center h-screen">
              <Loader color="white" shape="spiner" width="w-[90px] my-auto" />
              <p>Loading Feed...</p>
            </div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
