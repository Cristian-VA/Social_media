import { Query } from 'appwrite';
import { INewPost, IUpdatePost } from './../../types';
import { INewUser } from "@/types"
import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from "@tanstack/react-query"
import { createUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentUser, getPostDetailsId, updatePostByID, deletePost, getInfinitePosts, searchPost, getUserId, getPostByUserID } from "../appwrite/api"
import { QUERY_KEYS } from './queryKeys';
import { getAllUsers } from '../appwrite/api';
import { REFUSED } from 'dns';


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
        
export const useGetInfinitePostsMutation = () => {
    

    return useInfiniteQuery({
        queryKey:[QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfinitePosts,
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.documents.length === 0) {
                return null;
              }
              const lastId = lastPage?.documents[lastPage.documents.length - 1].$id
              return lastId

        }
    })   
}
export const useGetInfiniteUsersMutation = () => {
    

    return useInfiniteQuery({
        queryKey:[QUERY_KEYS.GET_INFINITE_USERS],
        queryFn: getAllUsers,
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.documents.length === 0) {
                return null;
              }
              const lastId = lastPage?.documents[lastPage.documents.length - 1].$id
              return lastId

        }
    })   
}



export const useSearchPost = (searchString: string) => {
    

    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchString],
        queryFn: () => searchPost(searchString),
        enabled: !!searchString //refetch when searchstring changes
    })
}


export const useGetUserByIdMutation = (userId:string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_USER_BY_ID, userId ],
        queryFn:() => getUserId(userId),
        enabled: !!userId   
    })
}

export const useGetPostsByUserID = (userId:string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POST_BY_USER_ID, userId ],
        queryFn: () => getPostByUserID(userId),
        enabled: !!userId 
    }
        
    )
}
