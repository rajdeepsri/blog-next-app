import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignInBtn from './SignInBtn'
import SignOutBtn from './SignOutBtn'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Image from 'next/image'

const SignInOutButton = async () => {
  const session = await getServerSession(authOptions)

  return session ? (
    <>
      <SignOutBtn />
      {session.user.image && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="relative mx-1 flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  fill
                  className="aspect-square h-full w-full"
                  src={session.user.image}
                  alt={session.user.name || 'user-avatar'}
                  priority
                />
              </div>
              {/* <Avatar >
                <AvatarImage src={session.user.image} alt={session.user.name || 'user-avatar'} />
                <AvatarFallback className="text-xs">
                  {session.user?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar> */}
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">
              <p>Username : {session.user.name}</p>
              <p>Email : {session.user.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  ) : (
    <SignInBtn />
  )
}

export default SignInOutButton
