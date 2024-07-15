"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Files, LogOutIcon, Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export function Header({ session }: { session: Session | null }) {
  return (
    <header className='flex items-center justify-between border-b p-4 shadow-sm h-16'>
      <Link
        href="/"
        className='text-blue-600 font-bold text-2xl'
      >
        Marketplace
      </Link>
      <nav className='space-x-4 flex items-center'>
        <Button
          variant={'outline'}
          size={'sm'}
          className='text-blue-600 gap-1 mr-4'
          asChild
        >
          <Link href={'/new'}>
            <Plus size={16} />
            <span>Adicionar post</span>
          </Link>
        </Button>
        <Separator orientation='vertical' className='h-8' />
        {!session?.user && (
          <>
            <Button
              variant={'ghost'}
              size={'sm'}
              className='text-gray-600'
            >
              Registrar
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              className='bg-blue-600 text-white hover:bg-blue-400 hover:text-white px-4'
              onClick={() => signIn('google')}
            >
              Login
            </Button>
          </>
        )}
        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={session?.user?.image as string}
                width={34}
                height={34}
                alt={session.user.name!}
                className='rounded-md'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => location.href = '/my-ads'}
                className='gap-1 cursor-pointer text-blue-600 focus:text-blue-600'
              >
                <Files size={16} />
                <span>Meus anúncios</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='gap-1 cursor-pointer text-red-500 focus:text-red-500'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOutIcon size={16} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  )
}
