'use client'
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { MyImage } from './MyImage'

interface Props {
  file: UploadResponse
  onClick?: () => void
  width: number
  height: number
}

export function UploadThumbnail({ file, onClick, width, height }: Props) {
  function handleClick() {
    if (onClick) {
      return onClick()
    }
    location.href = file.url
  }

  if (file.fileType === 'image') {
    return (
      <a onClick={handleClick} target='_blank' className='cursor-pointer'>
        <MyImage
          src={file.filePath}
          alt={file.name}
          width={width}
          height={height}
          priority
          className='max-w-full max-h-full object-cover'
          aiCrop
        />
      </a>
    )
  }

  return (
    <div>
      {file.url} &raquo;
    </div>
  )
}
