import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/theme-provider'
import Navbar from '@/components/Navbar'
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  title: 'BlogSphere',
  description:
    'Create, share, and explore insightful blog posts with ease. A platform for writers to express their thoughts, connect with readers, and showcase their creativity.',
}

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.className}>
      <body className="bg-neutral-100 antialiased dark:bg-neutral-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
