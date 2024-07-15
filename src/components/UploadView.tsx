import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import React from 'react'
import { MyImage } from './MyImage'

interface Props {
  file: UploadResponse
}

export function UploadView({ file }: Props) {
  if (file.fileType === 'image') {
    return (
      <MyImage
        src={file.filePath}
        alt={file.name}
        width={1000}
        height={1000}
        priority
        className='w-auto h-auto max-w-full max-h-full rounded'
      />
    )
  }

  return (
    <>{file.name}</>
  )
}
