import Link from 'next/link'
import ThemeToggleBtn from './ThemeToggleBtn'

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
]

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b-[1px] border-neutral-300 bg-neutral-50 px-2 shadow-sm dark:border-b-[1px] dark:border-neutral-700 dark:bg-neutral-950 sm:px-4">
      <h1 className="font-Satisfy pl-2 text-base font-medium text-neutral-900 dark:text-neutral-100 sm:pl-4 sm:text-2xl">
        BlogSphere
      </h1>
      <ul className="flex items-center gap-4">
        {navLinks.map(n => (
          <Link key={n.title} href={n.href}>
            {n.title}
          </Link>
        ))}
        <ThemeToggleBtn />
      </ul>
    </nav>
  )
}

export default Navbar
