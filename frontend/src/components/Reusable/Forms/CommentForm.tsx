import {useState} from 'react'
import * as z from "zod"
import { CommentValidation } from '@/lib/Validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateCommentMutation, useDeleteComment, useUpdateComment } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'



const CommentForm = ({postId, info, isEditing, toggleEditing}:{postId:string, info?:any, isEditing: boolean, toggleEditing?:any}) => {
  const {mutateAsync: createComment, isPending:IsCreatingComment} = useCreateCommentMutation()
  const {mutateAsync: deleteComment, isPending:IsDeleting, isSuccess: commentDeleted} = useDeleteComment()
  const {mutateAsync: updateComment, isPending:IsUpdating, } = useUpdateComment()

  const { user } = useUserContext()
  const [isClicked, setIsClicked] = useState(false)

    
 

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      message: info? info?.message : "",
    },
  })

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!isEditing) {
      const newComment = await createComment({
        ...values,
       userId: user.id,
       postId: postId
     })

     if (newComment) throw Error

    } else {
     
     
      const updatedComment = await updateComment({
        ...values,
        commentId: info?.$id
      })
      toggleEditing()
    
      
      

      if (!updatedComment) throw Error

    }
    

   
  }


  async function deleteCommentHandler(){
      await deleteComment(info.$id)
      setIsClicked(true)
  }

  return (
    <>
    {commentDeleted ? (
      <div className='w-full flex justify-between'>
      <h1 className="text-slate-500 text-[16px] my-auto"> Comment Deleted, waiting on server...</h1>
      <img src="/assets/Icons/checkGreen.svg" alt="delete comment" className='w-8 h-8 my-auto' />
      </div>
    ) :(
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-2 ">
      <FormField
        control={form.control}  
        name="message"
        render={({ field }) => (
          <FormItem className='w-full my-auto'>
            <FormControl>
              <Input placeholder='Write your comment..'  className="text-slate-800 my-auto w-full  relative  bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 " {...field} />
            </FormControl>
         
            <FormMessage className='text-rose-500 text-[12px] block w-full ' />
          </FormItem>
        )}
      />
      {IsCreatingComment || IsDeleting || IsUpdating? (
        <div className='rounded-[8px] bg-slate-500  my-auto h-10 w-[70px] flex items-center justify-center'>
         <img src="/assets/LoadingWhite.svg" alt="delete comment" className='w-8 h-8' />

        </div>
      ) :(
        <>
         
      
      <Button type="submit"  className=' bg-blue-500 transition  hover:bg-blue-400  my-auto rounded-[8px]  w-17 '>
        <img src="/assets/Icons/Send.svg" alt="post comment" className='w-8 h-8' />
      </Button>
      </>
      )}
    </form>

    {isEditing && !IsUpdating  && (
      <Button disabled={isClicked} onClick={deleteCommentHandler} className=' bg-rose-500 transition  hover:bg-rose-400  my-auto rounded-[8px]  w-17 ' >
                <img src="/assets/Icons/trashWhite.svg" alt="delete comment" className='w-8 h-8' />

      </Button>)}
   
  </Form>
  )}
  </>
  )
}

export default CommentForm