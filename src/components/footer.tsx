export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'ziruziru@foxmail.com'

  return (
    <footer className="border-t border-border">
      <div className="container max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>SNOOPADS</span>
          {' '}&mdash; Creative intelligence for AI growth. Research use only.
        </p>
        <p className="text-xs text-muted-foreground">
          All materials used under fair use for educational purposes.{' '}
          <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
            Contact for removal
          </a>
        </p>
      </div>
    </footer>
  )
}
