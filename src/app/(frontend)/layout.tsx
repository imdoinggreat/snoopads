import React from 'react'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import './styles.css'

export const metadata = {
  title: 'SnoopAds — AI Creative Intelligence',
  description: 'See how AI products win attention — discover, analyze, and learn from the best AI product ads across China and global markets.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                <span className="text-primary">Snoop</span>
                <span className="text-foreground">Ads</span>
              </span>
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                Explore
              </Link>
              <Link href="/submit" className="text-muted-foreground hover:text-primary transition-colors">
                Submit
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
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
