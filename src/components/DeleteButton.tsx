'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  byIdAd: string
}

export function DeleteButton({ byIdAd }: Props) {
  const router = useRouter()
  const [showDeleteQuestions, setShowDeleteQuestions] = useState(false)

  async function onDelete() {
    await fetch(`/api/ads?id=${byIdAd}`, {
      method: 'DELETE',
    }).then(() => {
      setShowDeleteQuestions(!showDeleteQuestions)
      router.push('/')
    })
  }

  if (showDeleteQuestions) {
    return (
      <div className='bg-black/90 fixed inset-0 z-20 flex items-center justify-center'>
        <div className='rounded-md bg-white py-6 px-16'>
          <h2 className='text-lg'>Deseja deletar esse anúncio?</h2>
          <div className='flex gap-2 w-full mt-2'>
            <Button
              variant={'outline'}
              className='flex-1 hover:border-blue-300'
              onClick={() => setShowDeleteQuestions(!showDeleteQuestions)}
            >
              Cancelar
            </Button>
            <Button
              variant={'destructive'}
              className='flex-1 hover:bg-destructive/80'
              onClick={onDelete}
            >
              Deletar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={() => setShowDeleteQuestions(!showDeleteQuestions)}
      variant={'outline'} size={'sm'}
      className='hover:text-red-500 hover:border-red-500 gap-1'
    >
      <Trash2 size={16} />
      <span>Deletar</span>
    </Button>
  )
}
