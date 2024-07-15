"use client"
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { useState } from 'react'
import { UploadView } from './UploadView'
import { UploadThumbnail } from './UploadThumbnail'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MyImage } from './MyImage'

interface GalleryProps {
  files: UploadResponse[]
}

export function Gallery({ files }: GalleryProps) {
  const [activeFile, setActiveFile] = useState<UploadResponse | null>(files[0] || null)

  function nextImage() {
    const activeFileIndex = files.findIndex(file => file.fileId === activeFile?.fileId)
    const nextIndex = activeFileIndex === files.length - 1 ? 0 : activeFileIndex + 1
    const nextFile = files[nextIndex]
    setActiveFile(nextFile)
  }

  function previousImage() {
    const activeFileIndex = files.findIndex(file => file.fileId === activeFile?.fileId)
    const previousIndex = activeFileIndex === 0 ? files.length - 1 : activeFileIndex - 1
    const previousFile = files[previousIndex]
    setActiveFile(previousFile)
  }

  return (
    <>
      {activeFile && (
        <div className='absolute inset-0 overflow-hidden'>
          <MyImage
            src={activeFile.filePath}
            alt='bg'
            width={1000}
            height={1000}
            className='object-cover opacity-20 blur w-full h-full'
          />
        </div>
      )}
      <div className='flex-1 flex items-center relative'>
        {activeFile && (
          <>
            <div className='absolute inset-4 flex justify-center items-center'>
              <UploadView file={activeFile} />
            </div>
            <div className="absolute inset-4 flex items-center justify-between">
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={previousImage}
                className='hover:bg-white/30 hover:rounded-full rounded-full hover:text-white'
              >
                <ChevronLeft />
              </Button>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={nextImage}
                className='hover:bg-white/30 hover:rounded-full rounded-full hover:text-white'
              >
                <ChevronRight />
              </Button>
            </div>
          </>
        )}
      </div>
      <div className='p-4 flex justify-center gap-4 relative z-10'>
        {files.map((file) => (
          <div key={file.fileId} className='size-16 overflow-hidden rounded'>
            <UploadThumbnail
              onClick={() => setActiveFile(file)}
              file={file}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </>
  )
}
