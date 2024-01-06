import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetPostByIdMutation } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/Reusable/Loader";
import { calculateDaysDifference } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "@/components/Reusable/PostStats";
import { useDeletePostMutation } from "@/lib/react-query/queriesAndMutations";
import CommentBox from "@/components/Reusable/CommentBox";
import CommentUser from "@/components/Reusable/CommentUser";


const PostsDetails = () => {
  const { id } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostByIdMutation(
    id || ""
  );
  const navigate = useNavigate()
 
  const { mutate: deletePost, isPending: isDeletingPost, isSuccess } = useDeletePostMutation();


  const { user } = useUserContext();
  const daysPosted = calculateDaysDifference(post?.$createdAt);
  console.log(isSuccess)
  const TagsMap = post?.tags.map((tag: string) => {
    return (
      <li
        key={tag}
        className="capitalize bg-slate-600 bg-opacity-20 py-1 px-2 rounded-[8px] max-w-full  "
      >
        #{tag}
      </li>
    );
  });
  const mapComments = post?.comments?.map((comment: any, index: number) => {
    return <CommentBox info={comment} key={index} postId={post.$id} />;
  });


  const handleDeletePost = () => {
    
    
    deletePost({ postId: id, imageId: post?.imageID })
   
    
    
  }

  
  isSuccess && navigate('/')

  return (
    <>
    {isDeletingPost?(
      <div className="container">
     <div className=" fixed top-0 flex justify-center flex-col gap-2 items-center h-screen">
     <Loader color="white" shape="spiner" width="w-[90px] my-auto" />
     <p>Deleting post...</p>
   </div>
   </div>
    ) :
    (
    <div className="container">
      {isPostLoading ? (
        <div className="fixed top-0 flex justify-center flex-col gap-2 items-center h-screen">
          <Loader color="white" shape="spiner" width="w-[90px] my-auto" />
          <p>Loading post details...</p>
        </div>
      ) : (
        <div className="post-details-card ">
          <img src={post?.ImageUrl} alt="" className="post_details-img " />
          <div className=" flex flex-col w-full max-h-[480px] overflow-scroll custom-scrollbar">
            <div className="flex gap-5 lg:gap-7 items-start py-3 px-5 w-full ">
              <Link to={`/profile/${post?.creator.$id}`}>
                <img
                  src={post?.creator?.imageUrl}
                  alt="Poster Profile"
                  className="rounded-[8px] w-[70px] lg:w-[90px] "
                />
              </Link>

              <div className="flex flex-col justify-center  w-full">
                <h1 className="capitalize md:text-[18px] text-[16px] font-semibold">
                  {post?.creator.username}
                </h1>
                <div className="text-slate-500 capitalize text-[12px] md:text-[14px]  flex gap-4 ">
                  <p>{daysPosted}</p>

                  <div className="flex gap-1">
                    <img
                      src="/assets/Icons/location.svg"
                      alt="location Icon"
                      className="w-[18px]"
                    />
                    <p>{post?.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-[90px] md:w-[130px] my-auto xl:my-2 ">
                {user.id === post?.creator.$id ? (
                  <>
                    <Link to={`/update-post/${post?.$id}`}>
                      <img
                        src="/assets/Icons/Edit.svg"
                        alt="Edit post"
                        className="w-[20px] h-[20px] md:w-[30px] md:h:-[30px] my-auto cursor-pointer hover:brightness-0 transition hover:invert"
                      />
                    </Link>
                
                    <img
                      onClick={handleDeletePost}
                      src="/assets/Icons/trash.svg"
                      alt="Delete post"
                      className="w-[20px] h-[20px] md:w-[30px] md:h:-[30px]  my-auto cursor-pointer hover:brightness-0 transition hover:invert"
                    />
                 
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex flex-col px-5">
              <hr className=" border-slate-600 opacity-20" />
              <div className="tiny lg:text-[16px] py-3">
                <p>{post?.caption}</p>
                <ul className="flex gap-2 mt-3 max-w-full flex-wrap f">
                  {TagsMap}
                </ul>
              </div>
              <PostStats post={post} userId={user.id} />
              <div className=" flex-col justify-between h-full hidden md:flex mt-2    ">
                <div className="flex flex-col overflow-scroll h-full  gap-2 custom-scrollbar">
                  {mapComments}
                </div>
                <CommentUser postId={post?.$id || ""} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    )}
    </>
  );
};

export default PostsDetails;
