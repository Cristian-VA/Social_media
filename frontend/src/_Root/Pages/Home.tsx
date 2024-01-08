import Loader from "@/components/Reusable/Loader";
import { useGetRecentPostsMutation, useGetInfinitePostsMutation } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import PostCard from "@/components/Reusable/PostCard";
import PostCardList from "@/components/Reusable/PostCardList";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPostsMutation();
  const {data: posts2,fetchNextPage, hasNextPage} = useGetInfinitePostsMutation();

  const {ref, inView} = useInView() 
  console.log(posts)
  useEffect(() => {
    if (inView ) {
      fetchNextPage();
    }
  }, [inView]);

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
              {posts2?.pages?.map((post, index) => (
               <PostCardList posts={post?.documents} key={index}/> 
              ))}

              
            </ul>
          )}
          {hasNextPage && (
        <div ref={ref} className="mt-10">
                <Loader
                color= "white"
                shape= "spiner"
                width= "w-[70px] my-auto"
                />
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Home;
