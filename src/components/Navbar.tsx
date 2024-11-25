import Link from 'next/link'
import ThemeToggleBtn from './ThemeToggleBtn'
import SignInOutButton from './SignInOutButton'
import { Button } from './ui/button'

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'About Me', href: '/about' },
  { title: 'Create', href: '/create' },
]

// const Navbar = () => {
//   return (
//     <nav className="fixed left-1/2 top-3 z-50 flex w-2/3 max-w-5xl -translate-x-1/2 items-center justify-between rounded-lg border border-neutral-500 bg-white/10 px-5 py-3 shadow-md backdrop-blur-md dark:border-neutral-600">
//       <div className="font-serif text-2xl font-bold text-gray-800 dark:text-white">BlogSphere</div>
//       <ul className="flex items-center gap-4">
//         {navLinks.map(n => (
//           <Link key={n.title} href={n.href}>
//             {n.title}
//           </Link>
//         ))}
//       </ul>
//       <ThemeToggleBtn />
//     </nav>
//   )
// }

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b-[1px] border-neutral-300 bg-neutral-50 px-2 shadow-sm dark:border-b-[1px] dark:border-neutral-700 dark:bg-neutral-950 sm:px-4">
      <h1 className="font-Satisfy pl-2 text-base font-medium text-neutral-900 dark:text-neutral-100 sm:pl-4 sm:text-2xl">
        BlogSphere
      </h1>
      <ul className="flex items-center gap-2">
        {navLinks.map(n => (
          <Link key={n.title} href={n.href}>
            <Button variant="ghost">{n.title}</Button>
          </Link>
        ))}
        <SignInOutButton />
        <ThemeToggleBtn />
      </ul>
    </nav>
  )
}

export default Navbar
