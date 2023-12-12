
import { Routes, Route } from "react-router-dom"
import SignInForm from "./_Auth/Forms/SignInForm"
import SignUpForm from "./_Auth/Forms/SignUpForm"
import { Home, AllUsers, Explore, Profile, CreatePost, Saved, PostsDetails, EditPost, UpdateProfile  } from "./_Root/Pages"
import AuthLayOut from "./_Auth/AuthLayOut"
import RootLayout from "./_Root/Pages/RootLayout"
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* Public routes*/}
        <Route element={<AuthLayOut/>}>
        <Route path="/sign-in" element={<SignInForm/>}/>
        <Route path="/sign-up" element={<SignUpForm/>}/>
      º </Route>
      
         {/* Private routes*/}
         <Route element= {<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/all-users" element={<AllUsers/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/saved" element={<Saved/>}/>
            <Route path="/profile/:id/*" element={<Profile/>}/>
            <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
            <Route path="/posts/:id" element={<PostsDetails/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/update-post/:id" element={< EditPost/>}/>
          </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App