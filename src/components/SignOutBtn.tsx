'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const SignOutBtn = () => {
  return (
    <Button className="self-center" onClick={() => signOut()} variant="outline">
      Sign Out
    </Button>
  )
}

export default SignOutBtn
