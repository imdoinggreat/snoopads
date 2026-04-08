export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@example.com'

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-muted-foreground">
        <p className="max-w-2xl mx-auto">
          All creative materials displayed on this site are used for educational and analytical
          purposes under fair use. If you believe any content infringes your copyright, please
          contact us at{' '}
          <a href={`mailto:${contactEmail}`} className="underline hover:text-primary transition-colors">
            {contactEmail}
          </a>{' '}
          for prompt removal.
        </p>
        <p className="mt-4 text-muted-foreground/60">
          <span style={{ fontFamily: 'Fredoka, sans-serif' }}>
            <span className="text-primary">Snoop</span>Ads
          </span>
        </p>
      </div>
    </footer>
  )
}
