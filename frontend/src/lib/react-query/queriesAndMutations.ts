import { Query } from 'appwrite';
import { INewPost, IUpdatePost } from './../../types';
import { INewUser } from "@/types"
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { createUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentUser, getPostDetailsId, updatePostByID, deletePost } from "../appwrite/api"
import { QUERY_KEYS } from './queryKeys';


export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user:INewUser) => createUserAccount(user)
    })
}

export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user:{ 
            email:string, 
            password:string
        }) => signInAccount(user)
    })
}

export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post:INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPostsMutation = () => {
    return  useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
   
}

export const useLikePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:({postId, likesArray}:{ postId:string; likesArray:string[]}) => likePost(postId,likesArray),
        onSuccess: (data) => { //refetching
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const usesSavedPostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:({postId, userId}:{ postId:string; userId:string}) => savePost(postId,userId),
        onSuccess: () => { //refetching

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeleteSavedPostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:({savedPostId}:{ savedPostId:string}) => deleteSavedPost(savedPostId),
        onSuccess: () => { //refetching

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}



export const useGetCurrentUserMutation = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser,
    })
  }

export const useGetPostByIdMutation = (postId:string) =>{
    return useQuery({
    queryKey:[QUERY_KEYS.GET_POST_BY_ID, postId], //when postIdchanges it triggers a refetch
    queryFn: () => getPostDetailsId(postId),  
    enabled: !!postId      
    })
}

export const useUpdatePostMutation = ()=>{

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post:IUpdatePost) => updatePostByID(post),
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}


export const useDeletePostMutation = ()=>{

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, imageId}: {postId:string, imageId:string}) => deletePost(postId , imageId),
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}
        
        
            