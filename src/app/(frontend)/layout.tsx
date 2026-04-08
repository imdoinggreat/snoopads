import React from 'react'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import './styles.css'

export const metadata = {
  title: 'SNOOPADS — Creative Intelligence for AI Growth',
  description: 'AI Growth Creative Intelligence Database — discover, analyze, and learn from the best AI product ads worldwide.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <header className="border-b border-border">
          <div className="container max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                SNOOPADS
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/explore" className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                Explore
              </Link>
              <Link href="/submit" className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                Submit
              </Link>
              <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
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
