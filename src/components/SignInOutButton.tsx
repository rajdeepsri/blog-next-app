import React from 'react'
import { getServerSession } from 'next-auth'
import SignInBtn from './SignInBtn'
import SignOutBtn from './SignOutBtn'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { authOptions } from '@/server/auth'

const SignInOutButton = async () => {
  const session = await getServerSession(authOptions)

  return session ? (
    <>
      <Popover>
        <PopoverTrigger>
          {session.user.image ? (
            <div className="relative mx-1 flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image
                fill
                className="aspect-square h-full w-full"
                src={session.user.image}
                alt={session.user.name || 'user-avatar'}
                priority
              />
            </div>
          ) : (
            <Avatar className="h-9 w-9 shadow-md">
              <AvatarImage src={session.user.image!} alt={session.user.name || 'user-avatar'} />
              <AvatarFallback className="text-xs">{session.user.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
          )}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 border-neutral-400 bg-neutral-300 dark:border-neutral-600 dark:bg-neutral-800">
          <p className="text-sm">{session.user.name}</p>
          <p className="text-sm">{session.user.email}</p>
          <SignOutBtn />
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <SignInBtn />
  )
}

export default SignInOutButton
