export const metadata = {
  title: 'About — AI Creative DB',
  description: 'Learn about the AI Creative Intelligence Database project, our methodology, and how we classify creative materials.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">About This Project</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        AI Creative DB is an open intelligence database that collects, classifies, and analyzes
        advertising creatives from AI products across China and global markets. Our goal is to help
        marketers, product managers, and growth teams learn from real-world creative strategies.
      </p>

      {/* What We Collect */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">What We Collect</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          We catalog paid ads, organic posts, creator collaborations, landing pages, and app store
          assets from AI products. Each entry captures the platform, brand, creative format, and
          key messaging elements such as headlines, body copy, and calls-to-action. Sources include
          Meta Ad Library, TikTok Creative Center, manual captures, and community submissions.
        </p>
      </section>

      {/* How We Classify */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">How We Classify</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Every creative unit is analyzed across five key dimensions:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3">
            <span className="font-medium shrink-0">Hook Type</span>
            <span className="text-muted-foreground">
              The psychological trigger used to capture attention — pain point, efficiency,
              curiosity, before/after, product demo, social proof, aspiration, comparison,
              tutorial, or FOMO.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium shrink-0">Funnel Stage</span>
            <span className="text-muted-foreground">
              Where in the user journey this creative operates — awareness, consideration,
              acquisition, activation, retention, or re-engagement.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium shrink-0">Claim Intensity</span>
            <span className="text-muted-foreground">
              How bold the claims are (low, medium, high). Higher intensity often correlates
              with stronger conversion but increased regulatory risk.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium shrink-0">Native Disguise</span>
            <span className="text-muted-foreground">
              How much the ad blends into organic content (low, medium, high). Higher disguise
              levels make the content feel less like traditional advertising.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium shrink-0">Use Case</span>
            <span className="text-muted-foreground">
              The specific product use cases being promoted — writing assistance, image generation,
              code completion, data analysis, and more.
            </span>
          </li>
        </ul>
      </section>

      {/* Why This Exists */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Why This Exists</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          The AI product landscape is evolving rapidly, and so are the advertising strategies used
          to acquire users. By systematically collecting and analyzing these creatives, we aim to
          surface patterns, identify best practices, and help teams make data-informed decisions
          about their own creative strategies. Whether you are launching a new AI product or
          optimizing existing campaigns, this database provides actionable intelligence from
          real-world examples.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mt-10 rounded-lg border bg-muted p-6">
        <h2 className="text-lg font-semibold">Disclaimer</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          All creative materials in this database are collected for research, education, and
          commentary purposes under Fair Use principles. We do not claim ownership of any
          advertisements or creative assets shown. All trademarks and brand names belong to
          their respective owners. If you believe any content should be removed, please contact
          us at{' '}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ziruziru@foxmail.com'}`}
            className="text-foreground underline hover:no-underline"
          >
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ziruziru@foxmail.com'}
          </a>
          .
        </p>
      </section>
    </div>
  )
}
