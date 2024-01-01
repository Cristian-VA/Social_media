import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import FileUploader from '../FileUploader'
import { ProfileValidation } from '@/lib/Validation'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/AuthContext';

import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { useUpdateProfileMutation} from '@/lib/react-query/queriesAndMutations'
import Loader from '../Loader'


 type IProfileFrom = {
  profile?:Models.Document
 }


const FormProfile = ({profile}:IProfileFrom) => {
  const { user } = useUserContext()
  const { toast } = useToast()
  const navigate = useNavigate()
  
  const {mutateAsync: updateProfile, isPending:IsUpdatingProfile} = useUpdateProfileMutation()


 
  

    const form = useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
          name: profile?.name,
          username: profile?.username,
          file: [],
          bio: profile?.bio,
         
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof ProfileValidation>) {
        if (profile){
          const updatedProfile = await updateProfile({ 
            ...values,
            profileId: profile.$id,
            imageId: profile?.imageId,
            imageUrl: profile?.imageUrl
          } )

          if (!updatedProfile){
            toast({title: "Please try again"})
          }
          

          

          return navigate(`/profile/${profile.$id}`)
        }
      }


  return (
    <>
    {IsUpdatingProfile ? (
        <div className="fixed top-0 flex flex-col justify-center items-center h-screen">
        <Loader
        color= "white"
        shape= "spiner"
        width= "w-[90px] my-auto"
        />
         <p>Updating profile...</p>
        </div>
    ) :(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-5xl gap-8">

    <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your name</FormLabel>
              <FormControl>
                 <Input  {...field} className="text-slate-800  bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 " />                    
              </FormControl>   
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
              <FormControl>
                 <Input  {...field} className="text-slate-800  bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 " />                    
              </FormControl>   
              

            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
                <FormControl>
                   <Textarea placeholder="Tell us about yourself..." {...field} className="text-slate-800 resize-none bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100 custom-scrollbar" />
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
            <FormLabel>Change profile picture</FormLabel>
              <FormControl>

                 <FileUploader 
                 mediaUrl= {profile?.imageUrl}
                 fieldChange = {field.onChange}/>

              </FormControl>
            
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

export default FormProfile