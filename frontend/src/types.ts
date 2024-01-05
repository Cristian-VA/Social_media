import { Models } from "appwrite"


export type INewUser = {
    name: string,
    email: string,
    username: string,
    password: string
}

export type BgTypes = {
    id: any,
    innit: any,

}

export type IContextType = {
    user: IUser,
    isLoading: boolean,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser: () => Promise<boolean>
}

export type IUser = {
    id: string,
    name: string,
    username: string,
    email: string,
    imageUrl: string,
    bio: string,
}

export type INavLink  = {
    imgURL: string,
    route: string,
    label: string,
}

export type IFileUploader = {
    fieldChange: (FILES: File[]) => void,
    mediaUrl: string
}

export type INewPost = {
    userId: string, 
    caption: string,
    file: File[],
    location?: string,
    tags?: string,

}

export type IUpdatePost = {
    postId: string,
    caption: string,
    imageId: string,
    imageUrl: string
    file: File[],
    location?: string,
    tags?: string,

}

export type IUpdateProfile = {
    profileId: string,
    name: string,
    username: string,
    imageId: string,
    imageUrl: string,
    file: File[],
    bio: string
}

export type PostTypeProps = {
    post?: Models.Document,
    userId: string,
    noText?: boolean,
   

}

export type INewComment = {
    userId: string,
    postId: string,
    message: string
}

export type IUpdateComment = {
    commentId: string,
    message: string
}