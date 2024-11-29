import Link from 'next/link'
import ThemeToggleBtn from './ThemeToggleBtn'
import SignInOutButton from './SignInOutButton'
import { Button } from './ui/button'

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'About Me', href: '/about' },
  { title: 'Create', href: '/create' },
]

const Navbar = () => {
  return (
    <nav className="fixed left-1/2 top-3 z-50 flex w-2/3 max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-neutral-300 bg-white/10 px-5 py-3 shadow-md backdrop-blur-md dark:border-neutral-700 sm:w-1/2">
      <h1 className="cursor-default text-2xl font-medium text-neutral-700 drop-shadow-md transition-colors duration-200 dark:text-neutral-300 hover:dark:text-white">
        BlogSphere
      </h1>
      <ul className="flex items-center gap-1">
        {navLinks.map(n => (
          <Button variant="ghost" key={n.title}>
            <Link href={n.href}>{n.title}</Link>
          </Button>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <SignInOutButton />
        <ThemeToggleBtn />
      </div>
    </nav>
  )
}

export default Navbar
