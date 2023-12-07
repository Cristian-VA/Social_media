import { IContextType, IUser } from '@/types'
import {createContext, useContext, useEffect, useState } from 'react'

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: ""

}

export const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean

}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({children}: { children: React.ReactNode}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isLoading, setisLoading] = useState(false)
  const [isAuthenticated, setisAuthenticated] = useState(false)
  
  const checkAuthUser = () => {}

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setisAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext


//when the user signs In the app should recognize the info of the user throught all the pages, thats why context is needed. 1:45:32