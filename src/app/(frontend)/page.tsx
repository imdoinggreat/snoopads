export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SearchBar } from '@/components/search-bar'
import { CreativeCard } from '@/components/creative-card'
import { extractArrayValues } from '@/lib/queries'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { HoverButton } from '@/components/ui/hover-button'

const TAXONOMY = [
  {
    label: 'REGION',
    items: [
      { name: 'China', filter: 'ecosystem=china' },
      { name: 'Global', filter: 'ecosystem=global' },
    ],
  },
  {
    label: 'PLATFORM',
    items: [
      { name: 'Douyin', filter: 'platform=douyin' },
      { name: 'Xiaohongshu', filter: 'platform=xiaohongshu' },
      { name: 'Meta', filter: 'platform=facebook' },
      { name: 'TikTok', filter: 'platform=tiktok' },
      { name: 'YouTube', filter: 'platform=youtube' },
      { name: 'Google', filter: 'platform=google_search' },
    ],
  },
  {
    label: 'FUNNEL STAGE',
    items: [
      { name: 'Awareness', filter: 'funnelStage=awareness' },
      { name: 'Consideration', filter: 'funnelStage=consideration' },
      { name: 'Acquisition', filter: 'funnelStage=acquisition' },
      { name: 'Retention', filter: 'funnelStage=retention' },
    ],
  },
  {
    label: 'CREATIVE ANGLE',
    items: [
      { name: 'Pain Point', filter: 'hookType=pain_point' },
      { name: 'Efficiency', filter: 'hookType=efficiency' },
      { name: 'FOMO', filter: 'hookType=fomo' },
      { name: 'Social Proof', filter: 'hookType=social_proof' },
      { name: 'Comparison', filter: 'hookType=comparison' },
      { name: 'Tutorial', filter: 'hookType=tutorial' },
    ],
  },
  {
    label: 'PRODUCT CATEGORY',
    items: [
      { name: 'AI Assistant', filter: 'category=ai_assistant' },
      { name: 'AI Design', filter: 'category=image_generation' },
      { name: 'AI Coding', filter: 'category=coding' },
      { name: 'AI Video', filter: 'category=video_generation' },
      { name: 'AI Search', filter: 'category=search' },
      { name: 'AI Writing', filter: 'category=writing' },
    ],
  },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [creativesRes, brandsRes] = await Promise.all([
    payload.find({
      collection: 'creative-units',
      where: { status: { equals: 'approved' } },
      sort: '-createdAt',
      limit: 12,
      depth: 2,
    }),
    payload.find({
      collection: 'brands',
      limit: 0,
    }),
  ])

  const creatives = creativesRes.docs
  const totalCreatives = creativesRes.totalDocs
  const totalBrands = brandsRes.totalDocs

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative grid-bg border-b border-border">
        <FallingPattern
            className="absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,var(--background))]"
            color="var(--primary)"
            backgroundColor="var(--background)"
            duration={200}
            blurIntensity="0.8em"
        />
        <div className="relative container max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="taxonomy-label mb-4 text-primary">Creative Intelligence Database</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              How AI Products<br />Win Attention
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Tracking growth creatives across China and global markets. Analyze hooks, funnels, and strategies from every major AI brand.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-12 md:gap-16">
            <div>
              <div className="stat-number text-foreground">{totalCreatives}</div>
              <div className="taxonomy-label mt-1">Creatives</div>
            </div>
            <div>
              <div className="stat-number text-foreground">{totalBrands}</div>
              <div className="taxonomy-label mt-1">Brands</div>
            </div>
            <div>
              <div className="stat-number text-foreground">16</div>
              <div className="taxonomy-label mt-1">Platforms</div>
            </div>
            <div>
              <div className="stat-number text-foreground">10</div>
              <div className="taxonomy-label mt-1">Hook Types</div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-md">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ─── TAXONOMY ─── */}
      <section className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <p className="taxonomy-label mb-8 text-primary">Intelligence Taxonomy</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {TAXONOMY.map((dim) => (
              <div key={dim.label}>
                <div className="taxonomy-label mb-3 text-foreground border-b border-border pb-2">{dim.label}</div>
                <div className="flex flex-col gap-1.5">
                  {dim.items.map((item) => (
                    <Link
                      key={item.name}
                      href={`/explore?${item.filter}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST CREATIVES ─── */}
      <section className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <p className="taxonomy-label text-primary">Latest Entries</p>
            <Link href="/explore" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
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
                    hookType={doc.hookType ?? undefined}
                    useCases={useCases}
                    disguiseLevel={doc.disguiseLevel}
                    thumbnailUrl={undefined}
                    ecosystem={doc.ecosystem}
                  />
                )
              })}
            </div>
          ) : (
            <div className="intel-card rounded-lg p-12 text-center">
              <p className="text-muted-foreground text-sm">No creatives indexed yet.</p>
              <p className="text-xs text-muted-foreground mt-2">
                Start adding entries at{' '}
                <Link href="/admin" className="text-primary hover:underline">/admin</Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section>
        <div className="container max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Built for marketers and product teams researching AI growth strategies.
          </p>
          <Link href="/explore">
            <HoverButton>Start Exploring →</HoverButton>
          </Link>
        </div>
      </section>
    </div>
  )
}
