import { Input } from "@/components/ui/input"
import { useState } from "react"
import SearchResults from "@/components/Reusable/SearchResults"
import GridPostsLists from "@/components/Reusable/GridPostsLists"
import { useSearchPost, useGetInfinitePostsMutation } from "@/lib/react-query/queriesAndMutations"
import useDebounce from "@/Hooks/useDebounce"
import Loader from "@/components/Reusable/Loader"
import { useInView } from 'react-intersection-observer'

import { useEffect } from "react"
const Explore = () => {

  const [searchValue, setSearchValue] = useState("")
  const {ref, inView} = useInView() 
  const debouncedTerm = useDebounce(searchValue, 500)
  const {data:searchedPosts, isFetching: isSearchFetching} = useSearchPost(debouncedTerm)
  const {data:posts, fetchNextPage, hasNextPage} = useGetInfinitePostsMutation()
  console.log(posts)
  const shouldShowSearchResults = searchValue !== "" //if search Value is empty shouldShowSearchResults = false
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages?.every((item) => item?.documents?.length === 0)

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);
  
  
  if (!posts){
    return (
      <div className=" flex justify-center flex-col w-full gap-2 items-center h-full">
      <Loader
      color= "white"
      shape= "spiner"
      width= "w-[90px] my-auto"
      />
       <p>Loading Posts...</p>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9'>
        <h2 className='base md:text-[24px] w-full'>Search Post</h2>
        <div className='flex gap-1 px-4 w-full rounded-[8px] bg-blue-50'>
          <img 
          src="/assets/Icons/Search.svg"
          alt="" 
          className='w-6 h-6 md:w-7 md:h-7 my-auto'/>

          <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}

           type="text"
           placeholder="Search Posts"
           className=" text-slate-600 h-12  border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 "
          />
        </div>
        <hr  className='border-2 border-slate-600 opacity-20  w-full' />
      </div>

      <div className="flex justify-between w-full max-w-5xl    ">
      <h3 className="text-[16px] md:text-[20px]   my-auto bg-slate-700 bg-opacity-60 px-4 py-2 rounded-[8px]">Trending</h3>

      <div className="flex-center flex gap-3 rounded-[8px] bg-slate-700 bg-opacity-60 px-4 py-2 cursor-pointer">
      
        <p className="text-[16px] md:text-[18px] font-light my-auto">All</p>
        <img 
          src="/assets/Icons/Filter.svg"
          alt="" 
          className='w-6 h-6 md:w-7 md:h-7 my-auto'
        />

      </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl h-full">

        {shouldShowSearchResults? 
        <SearchResults
           isSearchFetching = {isSearchFetching}
           searchedPosts = {searchedPosts}
           
           /> : 
         shouldShowPosts?  ( <p> End of Posts</p>) : 
         posts?.pages?.map((item, index) => (
          <GridPostsLists key={`page-${index}`} posts= {item?.documents}
          />
         ))}

      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
                <Loader
                color= "white"
                shape= "spiner"
                width= "w-[70px] my-auto"
                />
        </div>
      )}
     

    </div>
  )
}

export default Explore