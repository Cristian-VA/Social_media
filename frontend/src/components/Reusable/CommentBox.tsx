import React from "react";
import { Models } from "appwrite";
import { calculateDaysDifference } from "@/lib/utils";
import { Link } from "react-router-dom";
const CommentBox = ({ info }: any) => {
  console.log(info?.message);
  const formatDate = calculateDaysDifference(info?.$createdAt);
  return (
    <div className=" w-full  flex gap-2 rounded-[8px] ">
      <img
        src={info?.creator?.imageUrl}
        className="w-[50px] h-[50px] object-cover rounded-[8px]"
        alt=""
      />

      <div className="flex flex-col my-auto">
        <div className="flex gap-2 text-[12px] md:text-[16px]">
          <h1 className="flex-wrap">
            <Link to={`/profile/${info?.creator?.$id}`} className="text-blue-400 text-opacity-80 mr-2 hover:underline transition">
              {info?.creator?.username}
            </Link>
            {info?.message}
          </h1>
        </div>
        <p className="text-[10px] md:text-[12px] text-slate-500 capitalize">
          {formatDate}
        </p>
      </div>
    </div>
  );
};

export default CommentBox;
