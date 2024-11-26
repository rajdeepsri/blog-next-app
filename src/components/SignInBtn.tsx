'use client'
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

const SignInBtn = () => {
  return (
    <Button onClick={() => signIn('google')} variant="ghost">
      Login
    </Button>
  )
}

export default SignInBtn
