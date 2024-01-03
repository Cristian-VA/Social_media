import React from 'react'
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
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateCommentMutation } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'


const CommentForm = ({postId, info}:{postId:string, info?:any}) => {
  const {mutateAsync: createComment, isPending:IsLoadingComments} = useCreateCommentMutation()
  const { user } = useUserContext()
    console.log(info)
 


  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      message: "" || info?.message,
    },
  })

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newComment = await createComment({
      ...values,
     userId: user.id,
     postId: postId
   })

   if (newComment) throw Error
  }

  return (
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
         
            <FormMessage className='text-rose-500 text-[12px] block w-full border-2' />
          </FormItem>
        )}
      />
      {IsLoadingComments? (
        <div className='rounded-[8px] bg-blue-400  my-auto h-10 w-17 flex items-center justify-center'>
          <img src="/assets/LoadingWhite.svg" className='  w-8 h-8 '/>

        </div>
      ) :(
      <Button type="submit" className=' bg-blue-500 transition  hover:bg-blue-400  my-auto rounded-[8px]  w-17 '>
        <img src="/assets/Icons/Send.svg" alt="post comment" className='w-8 h-8' />
      </Button>
      )}
    </form>
  </Form>
  )
}

export default CommentForm