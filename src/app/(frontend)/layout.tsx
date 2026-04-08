import React from 'react'
import { Footer } from '@/components/footer'
import { SiteHeader } from '@/components/site-header'
import './styles.css'

export const metadata = {
  title: 'SNOOPADS — Creative Intelligence for AI Growth',
  description: 'AI Growth Creative Intelligence Database — discover, analyze, and learn from the best AI product ads worldwide.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
