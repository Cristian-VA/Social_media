import {useEffect} from 'react'
import { useGetInfiniteUsersMutation } from '@/lib/react-query/queriesAndMutations'
import UserCardGrid from '@/components/Reusable/UserCardGrid'
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Reusable/Loader';
const AllUsers = () => {

  const {data:users, fetchNextPage, hasNextPage} = useGetInfiniteUsersMutation()
  const {ref, inView} = useInView() 
  
  useEffect(() => {
    if (inView ) {
      fetchNextPage();
    }
  }, [inView]);
  
  

  const mapUsers= users?.pages?.map( (user, index) => {
   
    return (
      <UserCardGrid users={user?.documents} key={index}/>
    )
  })

  if (!users) return(
    <div className=" w-full flex justify-center flex-col  items-center ">
                <Loader
                color= "white"
                shape= "spiner"
                width= "w-[90px]"
                />
                 <p >Loading users...</p>
                </div>

  )

  return (
    <div className='container custom-scrollbar'>
      {mapUsers}

      {hasNextPage && (
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

export default AllUsers