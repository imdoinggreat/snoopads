export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SearchBar } from '@/components/search-bar'
import { CreativeCard } from '@/components/creative-card'
import { extractArrayValues } from '@/lib/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

const quickFilters = [
  { label: 'TikTok Ads', params: 'platform=tiktok' },
  { label: 'Douyin Ads', params: 'platform=douyin' },
  { label: 'Pain Point Hooks', params: 'hookType=pain_point' },
  { label: 'China Ecosystem', params: 'ecosystem=china' },
  { label: 'Product Demos', params: 'hookType=product_demo' },
  { label: 'Social Proof', params: 'hookType=social_proof' },
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
    <div>
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            AI Growth Creative Intelligence
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover, analyze, and learn from the best AI product ads across China and global
            markets. Build better creatives with real-world intelligence.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Suspense fallback={<Skeleton className="h-8 w-full" />}>
              <SearchBar />
            </Suspense>
          </div>
          <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-2">
            {quickFilters.map((f) => (
              <Link key={f.params} href={`/explore?${f.params}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  {f.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-xl font-semibold">Featured Collections</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((col: any) => {
                const coverUrl =
                  typeof col.coverImage === 'object' && col.coverImage?.url
                    ? col.coverImage.url
                    : null
                return (
                  <Link
                    key={col.id}
                    href={`/explore?collection=${col.slug}`}
                    className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-medium group-hover:underline">{col.name}</h3>
                    {col.description && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {col.description}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Latest Creatives */}
      <section className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest Creatives</h2>
            <Link
              href="/explore"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {creatives.map((doc: any) => {
              const brand =
                typeof doc.brand === 'object' ? doc.brand : null
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
          {creatives.length === 0 && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              No approved creatives yet. Be the first to submit one!
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
