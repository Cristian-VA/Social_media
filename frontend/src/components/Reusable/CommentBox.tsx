import React from "react";
import { Models } from "appwrite";
import { calculateDaysDifference } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import CommentForm from "./Forms/CommentForm";

const CommentBox = ({ info, postId }: any) => {
  const {user} = useUserContext()

  const [isEditing, setIsEditing] = useState(false)
  
  
   
  const formatDate = calculateDaysDifference(info?.$createdAt);
  return (
    <>
    <div className=" w-full  flex gap-2 rounded-[8px] pr-2 ">
      <img
        src={info?.creator?.imageUrl}
        className="w-[50px] h-[50px] object-cover rounded-[8px]"
        alt=""
      />

      {isEditing? (
        <CommentForm postId={postId} info={info}/>
      ) :(

      <div className="flex flex-col my-auto w-full">
        <div className="flex justify-between gap-2 text-[12px] md:text-[16px]">
          <div className="flex">
          <h1 className="flex-wrap">
            <Link to={`/profile/${info?.creator?.$id}`} className="text-blue-400 text-opacity-80 mr-2 hover:underline transition">
              {info?.creator?.username}
            </Link>
            {info?.message}
          </h1>
          </div>
          {info?.creator?.$id === user.id && (
             <p onClick={() => setIsEditing(!isEditing)} className="py-1 px-2 text-[12px] cursor-pointer bg-slate-700 transition hover:bg-blue-500 bg-opacity-50 rounded-[8px]">Edit</p>
          )}
         
        </div>
        <p className="text-[10px] md:text-[12px] text-slate-500 capitalize">
          {formatDate}
        </p>
      </div>
      )}
    </div>
    </>
  );
};

export default CommentBox;
