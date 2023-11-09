
import { Routes, Route } from "react-router-dom"
import SignInForm from "./_Auth/Forms/SignInForm"
import SignUpForm from "./_Auth/Forms/SignUpForm"
import { Home } from "./_Root/Pages"
import AuthLayOut from "./_Auth/AuthLayOut"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes*/}
        <Route element={<AuthLayOut/>}>
        <Route path="/sign-in" element={<SignInForm/>}/>
        <Route path="/sign-in" element={<SignUpForm/>}/>
      º </Route>
         {/* Private routes*/}
        <Route index element={<Home/>}/>
      </Routes>
    </main>
  )
}

export default App