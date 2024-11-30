'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const CustomLink = ({
  children,
  className,
  path,
}: {
  children: React.ReactNode
  className?: string
  path: string
}) => {
  const router = useRouter()
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={e => {
        if ((e.target as HTMLElement).closest('button')) return
        router.push(path)
      }}
    >
      {children}
    </div>
  )
}

export default CustomLink
