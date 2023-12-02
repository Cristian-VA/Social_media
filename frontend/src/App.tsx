
import { Routes, Route } from "react-router-dom"
import SignInForm from "./_Auth/Forms/SignInForm"
import SignUpForm from "./_Auth/Forms/SignUpForm"
import { Home } from "./_Root/Pages"
import AuthLayOut from "./_Auth/AuthLayOut"
import RootLayout from "./_Root/Pages/RootLayout"

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
          </Route>
      </Routes>
    </main>
  )
}

export default App