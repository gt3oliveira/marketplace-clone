'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { DeleteButton } from '@/components/DeleteButton'
import { Gallery } from '@/components/Gallery'
import { Button } from '@/components/ui/button'
import { connect, formatDate, formatNumber } from '@/libs/helpers'
import { AdModel } from '@/models/Ad'
import { Edit2Icon, Trash2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string }
}

export default async function AdPage(args: Props) {
  const session = await getServerSession(authOptions)
  await connect()
  const adDoc = await AdModel.findById(args.params.id)

  if (!adDoc) {
    redirect('/')
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return (
    <div className='flex absolute inset-0 top-16'>
      <div className='flex-1 bg-black text-white flex flex-col relative'>
        <Gallery files={adDoc.files} />
      </div>
      <div className='w-2/5 p-8'>
        <h1 className='text-lg font-bold'>
          {adDoc.title}
        </h1>
        {session && session.user?.email === adDoc.userEmail && (
          <div className='flex gap-2'>
            <Button
              variant={'outline'} size={'sm'}
              className='hover:text-blue-400 hover:border-blue-400 gap-1'
              asChild
            >
              <Link href={`/edit/${adDoc._id}`}>
                <Edit2Icon size={16} />
                <span>Editar</span>
              </Link>
            </Button>
            <DeleteButton byIdAd={adDoc._id} />
          </div>
        )}
        <label>Preço</label>
        <p className='text-sm'>{formatNumber(adDoc.price)}</p>
        <label>Categoria</label>
        <p className='text-sm'>{adDoc.category}</p>
        <label>Descrição</label>
        <p className='text-sm'>{adDoc.description}</p>
        <label>Contato</label>
        <p className='text-sm'>{adDoc.contact}</p>
        <div className='mt-8'>
          <p className='text-sm text-gray-400'>Postado: {formatDate(adDoc.createdAt)}</p>
          <p className='text-sm text-gray-400'>Atualizado: {formatDate(adDoc.updatedAt)}</p>
        </div>
      </div>
    </div>
  )
}
