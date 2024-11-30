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
    <nav className="fixed left-1/2 top-0 z-50 flex w-full max-w-5xl -translate-x-1/2 items-center justify-between rounded-none border border-neutral-300/10 bg-white/10 px-2 py-3 shadow-md backdrop-blur-md dark:border-neutral-700/10 sm:top-3 sm:w-1/2 sm:rounded-full sm:px-5 sm:py-2">
      <h1 className="hidden cursor-default text-2xl font-medium text-neutral-950 transition-colors duration-200 dark:text-neutral-300 hover:dark:text-white sm:block">
        BlogSphere
      </h1>
      <ul className="flex items-center gap-1">
        {navLinks.map(n => (
          <Button variant="ghost" key={n.title}>
            <Link className="text-sm font-semibold" href={n.href}>
              {n.title}
            </Link>
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
