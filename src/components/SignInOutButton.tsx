import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignInBtn from './SignInBtn'
import SignOutBtn from './SignOutBtn'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const SignInOutButton = async () => {
  const session = await getServerSession(authOptions)

  return session ? (
    <>
      <SignOutBtn />
      {session.user.image && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="mx-1 h-9 w-9">
                <AvatarImage src={session.user.image} alt={session.user.name || 'user-avatar'} />
                <AvatarFallback className="text-xs">RS</AvatarFallback>
              </Avatar>
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
