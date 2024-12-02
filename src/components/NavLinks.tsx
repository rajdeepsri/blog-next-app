'use client'

import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const NavlinkBtn: FC<{ nav: { title: string; href: string } }> = ({ nav }) => {
  const pathname = usePathname()

  return (
    <Button variant="ghost" key={nav.title} className={pathname === nav.href ? 'bg-accent' : ''}>
      <Link className="text-sm font-semibold" href={nav.href}>
        {nav.title}
      </Link>
    </Button>
  )
}

export default NavlinkBtn
