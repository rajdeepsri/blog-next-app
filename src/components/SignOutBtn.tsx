'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const SignOutBtn = () => {
  return (
    <Button onClick={() => signOut()} variant="ghost">
      Sign Out
    </Button>
  )
}

export default SignOutBtn
