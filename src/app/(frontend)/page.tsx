export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SearchBar } from '@/components/search-bar'
import { CreativeCard } from '@/components/creative-card'
import { extractArrayValues } from '@/lib/queries'
import { SnoopMascot } from '@/components/snoop-mascot'

const QUICK_FILTERS = [
  { label: 'China', params: '?ecosystem=china' },
  { label: 'Global', params: '?ecosystem=global' },
  { label: '\u6296\u97F3', params: '?platform=douyin' },
  { label: 'Meta', params: '?platform=facebook' },
  { label: 'Pain Point', params: '?hookType=pain_point' },
  { label: 'Efficiency', params: '?hookType=efficiency' },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [collectionsRes, creativesRes] = await Promise.all([
    payload.find({ collection: 'collections', limit: 6, depth: 1 }),
    payload.find({
      collection: 'creative-units',
      where: { status: { equals: 'approved' } },
      sort: '-createdAt',
      limit: 12,
      depth: 2,
    }),
  ])

  const collections = collectionsRes.docs
  const creatives = creativesRes.docs

  return (
    <div className="min-h-screen">
      {/* Hero - centered, symmetric */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
          {/* Mascot */}
          <div className="animate-fade-in-up relative">
            <SnoopMascot className="w-48 h-auto" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up delay-300" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            <span className="text-primary">Snoop</span>
            <span className="text-foreground">Ads</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg animate-fade-in-up delay-500">
            See how AI products win attention — across China and global markets.
          </p>

          {/* Search */}
          <div className="w-full max-w-md animate-fade-in-up delay-700">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 justify-center animate-fade-in-up delay-1000">
            {QUICK_FILTERS.map((f) => (
              <Link
                key={f.label}
                href={`/explore${f.params}`}
                className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                {f.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/explore"
            className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm cta-glow animate-fade-in-up delay-1200"
          >
            Start Exploring →
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="container max-w-6xl mx-auto px-4 py-12 space-y-6">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Collections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {collections.map((col: any) => (
              <Link
                key={col.id}
                href={`/explore?collection=${col.slug}`}
                className="border border-border rounded-xl p-4 card-hover bg-card"
              >
                <p className="font-medium text-sm">{col.name}</p>
                {col.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {col.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Creatives */}
      <section className="container max-w-6xl mx-auto px-4 py-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Latest
          </h2>
          <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            View all →
          </Link>
        </div>
        {creatives.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {creatives.map((doc: any) => {
              const brand = typeof doc.brand === 'object' ? doc.brand : null
              const useCases = extractArrayValues(doc.useCase)
              return (
                <CreativeCard
                  key={doc.id}
                  slug={doc.slug}
                  title={doc.title ?? 'Untitled'}
                  brandName={brand?.brandName ?? 'Unknown'}
                  platform={doc.platform}
                  hookType={doc.hookType}
                  useCases={useCases}
                  disguiseLevel={doc.disguiseLevel}
                  thumbnailUrl={undefined}
                  ecosystem={doc.ecosystem}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-xl">
            <p className="text-lg mb-2">No creatives yet</p>
            <p className="text-sm">Go to <Link href="/admin" className="text-primary hover:underline">/admin</Link> to add your first entry.</p>
          </div>
        )}
      </section>
    </div>
  )
}
