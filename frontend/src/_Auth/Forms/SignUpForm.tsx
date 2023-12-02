
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpSchema } from "@/lib/Validation"

const SignUpForm = () => {
 const isloading = true
  

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    
      <Form {...form}>
        <div className=" flex justify-center items-center flex-col w-[300px]">
          <div className="flex gap-4">
                <img 
              src="/assets/Logo.png" 
              alt=" Logo"
              className='w-[51.4px] h-[44.9px] block xl:hidden my-auto'
              />
              <h1 className="h1 font-bold text-center  "> GrooveGram</h1>
          </div>
  
           <h1 className="text-slate-500 h3 pt-5"> Vibe with Us... Sign Up Now</h1>

          
        

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-4 ">
             <FormField
              control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type = "text" placeholder="Enter your first name" className=" h-12 bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100" {...field} />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username" // using the parameters of the sign up schema in the validation index
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type = "text" placeholder="Enter your Username" className=" h-12 bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100" {...field} />
                    </FormControl>
                    <FormMessage className="text-rose-500"/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type = "text" placeholder="Vibey@gmail.com" className=" h-12 bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100" {...field} />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type = "text" placeholder="Vibey@gmail.com" className=" h-12 bg-blue-50 border-none rounded-[8px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-slate-100" {...field} />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-12 bg-blue-500 px-5 text-white flex gap-2 rounded-[8px] mt-2">
                {isloading? (
                  <div>
                    loading...
                  </div>
                ): "Sign Up"}
              </Button>
         </form>
      </div>
    </Form>

  )
}

export default SignUpForm
