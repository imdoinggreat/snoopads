import React from 'react'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import './styles.css'

export const metadata = {
  title: 'AI Creative DB',
  description: 'AI Growth Creative Intelligence Database — discover, analyze, and learn from the best AI product ads worldwide.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              AI Creative DB
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </Link>
              <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                Submit
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
