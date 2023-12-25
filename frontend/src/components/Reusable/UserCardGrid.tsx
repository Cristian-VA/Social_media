import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
type userGridType = {
  users?: Models.Document[]
}

const UserCardGrid = ({users}:userGridType ) => {
  
const userCardsMap= users?.map((item, index) => (
  <div key={index} className='w-full gap-2 p-8 bg-dark border-slate-700 border-2 flex flex-col justify-center items-center  rounded-[8px]'>
    <img 
    src={item.imageUrl || "/assets/Icons/loading.svg" }
     alt="" 
     className='w-[90px] rounded-[8px] bg-slate-700'/>
     <h1 className='h2'>{item.name}</h1>
     <h1 className='base text-slate-500'>@{item.username}</h1>
     <Link to={`/profile/${item.$id}`} className=' py-2 bg-blue-500 px-5 text-white rounded-[8px] mt-2 hover:bg-blue-400 transition '> View Profile</Link>



  </div>
  
 ))

  return (
    <div className='w-full grid-container '>
     {userCardsMap}
    </div>
  )
}

export default UserCardGrid