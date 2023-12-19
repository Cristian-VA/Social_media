

const Loader = ({color, shape , width}:any) => {
  return (
    <div>
    {color === "white" && shape === "circle"? (
         <img 
         src="/assets/LoadingWhite.svg" 
         alt=" Logo"
         className='w-14'
         />
    ): color === "blue" && shape === "circle"? (
        <img 
         src="/assets/LoadingBlue.svg" 
         alt=" Logo"
         className='w-14'
         />
    ) : color === "white" && shape === "spiner" ? (
        <img 
        src="/assets/Icons/loading.svg" 
        alt=" Logo"
        className={width}
        />): ""

    }
     
    </div>
  )
}

export default Loader