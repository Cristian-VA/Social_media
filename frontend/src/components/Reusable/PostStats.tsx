import React, { useState, useEffect } from "react";
import { PostTypeProps } from "@/types";
import {
  useLikePostMutation,
  usesSavedPostMutation,
  useDeleteSavedPostMutation,
  useGetCurrentUserMutation,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";
import { ModalLikes } from "./ModalLikes";
import CommentsMobile from "./CommentsMobile";

const PostStats = ({ post, userId, noText }: PostTypeProps) => {
  const likesList = post?.likes?.map(
    (currentUser: Models.Document) => currentUser?.$id
  );
  const likesInfo = post?.likes?.map(
    (currentUser: Models.Document) => currentUser
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const lastLike = likes?.length - 1;
  const { mutate: likePost } = useLikePostMutation();
  const { mutate: savePost, isPending: isLoadingSave } =
    usesSavedPostMutation();
  const { mutate: deletePost, isPending: isLoadingDelete } =
    useDeleteSavedPostMutation();

  const { data: currentUser } = useGetCurrentUserMutation();

  const userWhoLike =
    likesInfo?.[lastLike]?.username === currentUser?.username
      ? "You"
      : likesInfo?.[lastLike]?.username;
  const likeDisplayMessage =
    lastLike === 1
      ? `${userWhoLike} and ${likesInfo?.[0]?.username} liked this`
      : lastLike > 1
      ? `${userWhoLike} and ${lastLike} others liked this`
      : `${userWhoLike} liked this`;

  const savedPost = currentUser?.save?.find(
    (record: Models.Document) => record.post?.$id === post?.$id
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsSaved(!!savedPost);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(currentUser?.$id);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== currentUser?.$id);
    } else {
      newLikes.push(currentUser?.$id);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id ?? "", likesArray: newLikes });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPost) {
      setIsSaved(false);
      return deletePost({ savedPostId: savedPost?.$id });
    }

    savePost({ userId: userId, postId: post?.$id ?? "" });
    setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="flex gap-3 md:gap-2">
        {isMobile && (
          <div className="flex ">
            <CommentsMobile info={post?.comments}
                postId={post?.$id} />
            <p className="text-slate-500  text-[14px] leading-4 my-auto px-0 ">
              {post?.comments?.length}
            </p>
          </div>
        )}
        <div className="flex  gap-1">
          <img
            src={
              checkIsLiked(likes, userId)
                ? "/assets/Icons/HeartFilled.svg"
                : "/assets/Icons/Heart.svg"
            }
            alt="like"
            className="w-6 h-6  md:h-7 md:w-7 cursor-pointer my-auto"
            onClick={handleLikePost}
          />
         { isMobile && <ModalLikes btnText={likesInfo?.length} PeopleWhoLiked={likesInfo} />}
        
          
        </div>
        {!isMobile && (
            <p className=" lg:text-[18px] text-[14px] my-auto">
              {likes?.length}
            </p>
          )}

        {!noText && !isMobile && (
          <ModalLikes
            btnText={
              likesInfo?.[lastLike]?.username
                ? likeDisplayMessage
                : likes?.length === 0
                ? "Be the first to like"
                : "Liking post..."
            }
            PeopleWhoLiked={likesInfo}
          />
        ) }
      </div>

      {isLoadingSave || isLoadingDelete ? (
        <Loader color="white" shape="spiner" width="w-5 h-5 md:h-7 md:w-7" />
      ) : (
        <img
          src={
            isSaved
              ? "/assets/Icons/BookmarkSfilled.svg"
              : "/assets/Icons/BookmarkS.svg"
          }
          alt="like"
          className="w-6 h-6 mb-auto md:h-7 md:w-7 cursor-pointer my-auto"
          onClick={handleSavePost}
        />
      )}
    </div>
  );
};

export default PostStats;
