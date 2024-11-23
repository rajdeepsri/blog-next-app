import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BlogSphere',
  description:
    'Create, share, and explore insightful blog posts with ease. A platform for writers to express their thoughts, connect with readers, and showcase their creativity.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
