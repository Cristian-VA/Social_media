import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {useState} from "react";
import CommentBox from "./CommentBox";
import CommentUser from "./CommentUser";

const CommentsBox = ({msg, info, postId}:{msg:string, info?:any, postId:string}) => {
    
    const [isOpen, setIsOpen] = useState(true)

    const mapComments = info?.map((comment:any, index:number) => {
      return (
        <CommentBox info={comment} key={index} postId={postId}/>
      )
    })

  return (
    <Accordion type="multiple"   >
      <AccordionItem value="item-1" className=" border-opacity-20 border-b-4 border-slate-600">
        <AccordionTrigger onClick={() => setIsOpen(!isOpen)} className="mb-0 text-[14px] text-slate-100 cursor-pointer hover:text-blue-400 hover:text-opacity-80 transition text-center">{isOpen? msg : info?.length > 0? "Hide comments" : "Hide comment form"}</AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-col gap-4 custom-scrollbar overflow-scroll max-h-[250px] pr-1 ">
         {mapComments}
        </div>
        <CommentUser postId={postId} info={info.comments}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CommentsBox;
