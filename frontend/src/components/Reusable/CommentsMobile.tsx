import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommentBox from "./CommentBox";
import CommentUser from "./CommentUser";

const CommentsMobile = ({ info, postId }: { info?: any; postId: any }) => {


  const mapComments = info?.map((comment: any, index: number) => {
    return <CommentBox info={comment} key={index} postId={postId} />;
  });

  return (
    <Dialog>
      <DialogTrigger className="m-0 p-0">
        <img
          src={"/assets/Icons/comment.svg"}
          alt="view comments"
          className="w-9 h-9   cursor-pointer "
        />
      </DialogTrigger>
      <DialogContent className=" bg-dark h-screen w-screen border-slate-600 sm:rounded-[8px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="">Total Comments: {info?.length}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 custom-scrollbar overflow-scroll max-h-[500px] h-full   mb-auto pr-1 ">
          {mapComments}
        </div>
        <CommentUser postId={postId} />
      </DialogContent>
    </Dialog>
  );
};

export default CommentsMobile;
