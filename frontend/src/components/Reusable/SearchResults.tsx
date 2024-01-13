import { Models } from 'appwrite'
import GridPostsLists from './GridPostsLists'
import Loader from './Loader'

type SearchResultsProps = {
  isSearchFetching: boolean,
  searchedPosts?: Models.DocumentList<Models.Document>
}



const SearchResults = ({isSearchFetching, searchedPosts } : SearchResultsProps) => {

  if (isSearchFetching) return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
       <Loader
        color= "white"
        shape= "spiner"
        width= "w-[90px] my-auto"
        />
           <p>Searching for posts...</p>
    </div>
  )

  if (searchedPosts && searchedPosts?.documents.length > 0) {
    return (
      <GridPostsLists posts={searchedPosts?.documents} />
    )
  }


  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      No results found
    </div>
  )
}

export default SearchResults