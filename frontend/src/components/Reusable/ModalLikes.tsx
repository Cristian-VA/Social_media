import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ModalLikes({ btnText, PeopleWhoLiked }: any) {
  const LikesMap = PeopleWhoLiked?.map((like: any) => {
    return (
      <div
        className="w-full bg-slate-700 px-4 py-4 rounded-[8px] flex justify-between"
        key={like?.username}
      >
        <div className="flex gap-2">
          <img
            src={like?.imageUrl}
            alt=""
            className="w-[50px] rounded-[8px]"
          />
          <h1 className="my-auto">{like?.username}</h1>
        </div>

        <Link
          to={`/profile/${like?.$id}`}
          className="my-auto py-1 px-2 bg-blue-500 rounded-[8px] text-[14px] transition hover:bg-blue-400"
        >
          View Profile
        </Link>
      </div>
    );
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-slate-500 text-[10px] sm:text-[12px] md:text-[14px] leading-4 my-auto px-0 hover:underline transition"
        >
          {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-full bg-dark sm:h-[300px] md:h-[500px] border-slate-600 sm:rounded-[8px]">
        <DialogHeader>
          <DialogTitle>Total Likes {PeopleWhoLiked?.length}</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-4 py-4 overflow-scroll custom-scrollbar">
          <div className="flex flex-col items-start justify-start gap-4 w-full px-2">
            {PeopleWhoLiked?.length ? (
              LikesMap
            ) : (
              <p className="block my-auto mx-auto">Nothing here..</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
