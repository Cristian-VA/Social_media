import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import CommentBox from "./CommentBox";
import CommentUser from "./CommentUser";

const CommentsBox = ({msg, info, postId}:{msg:string, info?:any, postId:string}) => {
    
    

    const mapComments = info?.map((comment:any, index:number) => {
      return (
        <CommentBox info={comment} key={index} postId={postId}/>
      )
    })

  return (
    <Accordion type="multiple"  >
      <AccordionItem value="item-1 border-red-400">
        <AccordionTrigger className="mb-0 text-[14px] text-slate-100 cursor-pointer hover:text-blue-400 hover:text-opacity-80 transition text-center">{msg}</AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-col gap-4 custom-scrollbar overflow-scroll max-h-[250px] ">
         {mapComments}
        </div>
        <CommentUser postId={postId} info={info.comments}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CommentsBox;
