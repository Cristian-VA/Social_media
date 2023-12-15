import React, {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import { Button } from '../ui/button'
import { IFileUploader } from '@/types'


const FileUploader = ({ fieldChange, mediaUrl}:IFileUploader) => {
    const [fileUrl,setFileUrl] = useState( "" )
    const [file, setFile] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        fieldChange(acceptedFiles)
        setFile(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }, [file])
      const {getRootProps, getInputProps } = useDropzone({onDrop,
      accept: {
        "image/*" : ['.png', '.jpeg', '.jpg', '.svg', '.gif']
      }
      })
    
      return (
        <div {...getRootProps()} className='flex flex-center flex-col ' >
          <input {...getInputProps()} />
          {
            fileUrl ? (
                <div className=' rounded-[8px] bg-blue-100 p-4 flex flex-col items-center justify-center gap-3'>
                    <img 
                    src={fileUrl}
                    alt="" 
                    className='w-full h-80 lg:h-[480px] rounded-[8px] object-cover'
                     />

                     <p className='text-center text-slate-500 base '> Drag or click to replace current photo</p>
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
