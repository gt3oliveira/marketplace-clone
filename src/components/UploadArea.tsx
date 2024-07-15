import { Dispatch, SetStateAction, useState } from 'react'
import { UploadResponse } from 'imagekit/dist/libs/interfaces'

import { FileImage, Plus } from 'lucide-react'
import { Uploader } from './Uploader'
import { Button } from './ui/button'
import { UploadThumbnail } from './UploadThumbnail'

interface Props {
  files: UploadResponse[]
  setFiles: Dispatch<SetStateAction<UploadResponse[]>>
}

export function UploadArea({ files, setFiles }: Props) {
  const [isUploading, setIsUploading] = useState(false)

  return (
    <div className='bg-gray-100 p-4 rounded'>
      <h2 className='text-center text-xs text-gray-400 uppercase font-bold'>
        Adicionar imagens do produto:
      </h2>
      <div className='flex flex-col items-center'>
        <FileImage className='size-24 text-gray-300' />

        <label
          className={
            "upload-btn border rounded mt-2 justify-center items-center w-full text-center"
            + (
              isUploading
                ? 'cursor-not-allowed text-gray-400 py-2 text-center'
                : 'text-blue-600 border-blue-600 bg-white hover:text-blue-500 hover:bg-transparent cursor-pointer py-2 text-center'
            )
          }>
          <Uploader
            onUploadStart={() => setIsUploading(true)}
            onSuccess={(files) => {
              setFiles(PreviousMap => [...PreviousMap, files])
              setIsUploading(false)
            }}
          />
          {isUploading ? (
            <span>Carregando...</span>
          ) : (
            <>
              <Plus size={16} className='inline-flex mr-1 text-blue-600' />
              <p className='inline-flex text-blue-600'>Adicionar imagem</p>
            </>
          )}
        </label>
      </div>
      <div className='flex flex-wrap gap-2 mt-2 items-center justify-center'>
        {files.map(file => (
          <div key={file.fileId} className='rounded overflow-hidden'>
            <UploadThumbnail
              file={file}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
