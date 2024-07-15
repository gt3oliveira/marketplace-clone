import { ReactNode } from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <>
      <Button disabled={pending} type='submit' className='bg-blue-600 hover:bg-blue-500 mt-2 w-full'>
        {pending && (
          <>
            <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
            <span>Publicando...</span>
          </>
        )}
        {!pending && (
          <span>{children}</span>
        )}
      </Button>
    </>
  )
}
