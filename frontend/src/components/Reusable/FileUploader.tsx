import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'

const FileUploader = () => {
    const [fileUrl,setFileUrl] = useState( "" )

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps } = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()} className='flex flex-center dlex-col' >
          <input {...getInputProps()} />
          {
            fileUrl ? (
                <div className='file-uploader-container'>

                </div>
            ): (
                <div className='file-uploader-container gap-2 bg-blue-100 w-full rounded-[8px]'>
                    <img 
                        src="/assets/Icons/AddPost2.svg" 
                        alt=" addpost "
                        className='w-[70px] h-[70px] md:w-[100px] md:h-[100px] '
                        />
                    
                    <h1 className='h3 text-slate-700'> Drag media and drop</h1>
                    <p className='base text-slate-500'> Or</p>

                    <Button type="button" className="h-12 bg-blue-500 px-5 text-white flex gap-2 rounded-[8px] mt-2 hover:bg-blue-400 transition">
                        Select from Computer

                    </Button>

                </div>    
            ) 
        
          }
        </div>
      )
}

export default FileUploader

//3:03:14