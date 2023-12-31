import * as z from "zod"

 export const SignUpSchema = z.object({
    name: z.string().min(2, { message: "Name is too short"}),
    username: z.string().min(2, { message: "Username is too short"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long"})
  })

  export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long"})
  })

  export const PostValidation = z.object({
    caption: z.string().min(2, {message: "Caption must be at least 2 characters.",}).max(2200),
    file: z.custom<File[]>(),
    location: z.string().max(100),
    tags: z.string()
  })

  export const CommentValidation = z.object({
    message: z.string().max(2200).min(1, {message:"Comment must me atleast 1 character long."}),

  })

  export const  ProfileValidation = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters.",}).max(40),
    username: z.string().min(2,{message: "Username must be at least 2 characters.",}).max(100),
    file: z.custom<File[]>(),
    bio: z.string()
  })