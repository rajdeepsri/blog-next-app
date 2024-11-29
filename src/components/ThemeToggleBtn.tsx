'use client'

import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

const ThemeToggleBtn: FC = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render nothing on the server, and only render once mounted
  if (!mounted) return null
  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="ghost"
      className="h-9 w-9 sm:h-10 sm:w-10"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeToggleBtn
