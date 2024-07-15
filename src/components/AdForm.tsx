'use client'
import { LocateFixed } from "lucide-react"
import { UploadArea } from "./UploadArea"
import { Button } from "./ui/button"
import { AdTextInputs, AdTexts } from "./AdTextInputs"
import { SubmitButton } from "./SubmitButton"
import { useState } from "react"
import { UploadResponse } from "imagekit/dist/libs/interfaces"
import { createAd, updateAd } from "@/app/actions/adActions"
import { redirect } from "next/navigation"

interface Props {
  defaultFiles?: UploadResponse[]
  defaultTexts?: AdTexts
  id?: string | null
}

export function AdForm({
  defaultFiles = [],
  defaultTexts = {},
  id = null
}: Props) {
  const [files, setFiles] = useState<UploadResponse[]>(defaultFiles)

  async function handleSubmit(formData: FormData) {
    formData.set('files', JSON.stringify(files))
    if (id) { formData.set('_id', id) }

    const result = id
      ? await updateAd(formData)
      : await createAd(formData)

    redirect('/ad/' + result._id)
  }

  return (
    <form
      action={handleSubmit}
      className='formNewPost max-w-2xl mx-auto grid grid-cols-2 gap-16'
    >

      <div className='flex-1 mt-6'>
        <UploadArea files={files} setFiles={setFiles} />

        <div>
          <label htmlFor="">Qual a sua localização?</label>
          <Button size={'sm'} variant={'outline'} className='w-full' type='button'>
            <LocateFixed size={16} className='mr-2' />
            <span>Marque sua localização</span>
          </Button>
          <div className='bg-gray-100 p-4 mt-2 min-h-12 rounded text-gray-400 text-center'>
            Google maps aqui
          </div>
        </div>
      </div>

      <div className='flex-1 pt-2'>
        <AdTextInputs defaultValues={defaultTexts} />
        <SubmitButton>
          {id ? 'Atualizar anúncio' : 'Publicar anúncio'}
        </SubmitButton>
      </div >
    </form >
  )
}
