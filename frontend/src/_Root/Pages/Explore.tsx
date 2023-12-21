import { Input } from "@/components/ui/input"
import { useState } from "react"

const Explore = () => {

  const [searchValue, setSearchValue] = useState("")
  const shouldShowSearchResults = searchValue !== ""
  const shouldShowPosts = !shouldShowSearchResults
 

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

      <div className="flex flex-between w-full max-w-5xl    ">
      <h3 className='text-[16px] md:text-[20px]  w-full my-auto'>Trending</h3>

      <div className="flex-center flex hover:bg-slate-500 transition gap-3 rounded-[8px] bg-blue-500 px-4 py-2 cursor-pointer">
        <p className="text-[16px] md:text-[18px] font-light my-auto">All</p>
        <img 
          src="/assets/Icons/Filter.svg"
          alt="" 
          className='w-6 h-6 md:w-7 md:h-7 my-auto'
        />

      </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">

      </div>
     

    </div>
  )
}

export default Explore