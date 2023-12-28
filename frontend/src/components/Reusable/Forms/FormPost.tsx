import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import FileUploader from '../FileUploader'
import { PostValidation } from '@/lib/Validation'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/AuthContext';

import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation} from '@/lib/react-query/queriesAndMutations'
import Loader from '../Loader'
 type IPostFrom = {
  post?:Models.Document
  action: "Update" | "Create"
 }


const FormPost = ({post, action}:IPostFrom) => {
  const { user } = useUserContext()
  const { toast } = useToast()
  const navigate = useNavigate()
  const {mutateAsync: createPost, isPending:IsLoadingPost} = useCreatePostMutation()
  const {mutateAsync: updatePost, isPending:IsUpdatingPost} = useUpdatePostMutation()
  const {mutateAsync: deletePost, isPending:IsDeletingPost} = useDeletePostMutation()

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post? post?.caption : "", //if your are editing a post of course there should be one.
          file: [],
          location: post? post?.location: "",
          tags: post? post?.tags.join(","): ""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === "Update"){
          const updatedPost = await updatePost({ 
            ...values,
            postId: post.$id,
            imageId: post?.imageID,
            imageUrl: post?.ImageUrl
          } )

          if (!updatedPost){
            toast({title: "Please try again"})
          }

          return navigate(`/posts/${post.$id}`)
        }
       const newPost = await createPost({
        ...values,
        userId: user.id
       })

       if (!newPost){
        toast({
          title: 'Please try again'
        })
       }
        navigate('/')
      }

      


  return (
    <>
    {IsUpdatingPost || IsDeletingPost || IsLoadingPost ? (
        <div className="fixed top-0 flex flex-col justify-center items-center h-screen">
        <Loader
        color= "white"
        shape= "spiner"
        width= "w-[90px] my-auto"
        />
         <p>Updating Post...</p>
        </div>
    ) :(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-5xl gap-8">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Caption</FormLabel>
                <FormControl>
                   <Textarea placeholder="Share your thoughts..." {...field} className="text-slate-800 resize-none bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 custom-scrollbar" />
                </FormControl>
            
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add media</FormLabel>
              <FormControl>

                 <FileUploader 
                 mediaUrl= { post?.ImageUrl}
                 fieldChange = {field.onChange}/>

              </FormControl>
            
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Location</FormLabel>
              <FormControl>
                 <Input placeholder="The moon..." {...field} className="text-slate-800  bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 " />                    
              </FormControl>   
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Tags</FormLabel>
              <FormControl>
                 <Input placeholder="Space, Exploration, Travel" {...field} className="text-slate-800  bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 " />                    
              </FormControl>   
              <FormDescription className='text-slate-500'>
                Seperate each tag with a comma " , "
              </FormDescription>

            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />
      <div className='flex justify-end gap-3'>
         <Button type="submit" className="h-12 bg-rose-500 px-5 text-white rounded-[8px] mt-2 hover:bg-rose-400 transition">Cancel</Button>
         <Button type="submit" className="h-12 bg-blue-500 px-5 text-white rounded-[8px] mt-2 hover:bg-blue-400 transition">Submit</Button>
      </div>
    </form>
  </Form>
  ) }
  </>
  )
}

export default FormPost

//33237