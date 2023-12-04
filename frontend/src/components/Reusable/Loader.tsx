import React from 'react'

const Loader = ({color}:any) => {
  return (
    <div>
    {color === "white"? (
         <img 
         src="/assets/LoadingWhite.svg" 
         alt=" Logo"
         className='w-14'
         />
    ): (
        <img 
         src="/assets/LoadingBlue.svg" 
         alt=" Logo"
         className='w-14'
         />
    )
    }
     
    </div>
  )
}

export default Loader