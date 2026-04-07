import { Suspense } from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildCreativeUnitWhere, extractArrayValues } from '@/lib/queries'
import { FilterPanel } from '@/components/filter-panel'
import { SearchBar } from '@/components/search-bar'
import { CreativeCard } from '@/components/creative-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 24

interface ExplorePageProps {
  searchParams: Promise<{
    ecosystem?: string
    platform?: string
    hookType?: string
    q?: string
    page?: string
  }>
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10))

  const where = buildCreativeUnitWhere({
    ecosystem: params.ecosystem,
    platform: params.platform,
    hookType: params.hookType,
    search: params.q,
  })

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'creative-units',
    where,
    sort: '-createdAt',
    limit: PAGE_SIZE,
    page: currentPage,
    depth: 2,
  })

  const { docs, totalPages, totalDocs } = result

  // Build pagination params
  const buildPageUrl = (page: number) => {
    const p = new URLSearchParams()
    if (params.ecosystem) p.set('ecosystem', params.ecosystem)
    if (params.platform) p.set('platform', params.platform)
    if (params.hookType) p.set('hookType', params.hookType)
    if (params.q) p.set('q', params.q)
    if (page > 1) p.set('page', String(page))
    const qs = p.toString()
    return `/explore${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Filters
          </h2>
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <FilterPanel />
          </Suspense>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-md">
              <Suspense fallback={<Skeleton className="h-8 w-full" />}>
                <SearchBar />
              </Suspense>
            </div>
            <p className="text-sm text-muted-foreground">
              {totalDocs} result{totalDocs !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Mobile filters */}
          <div className="mb-6 lg:hidden">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer text-sm font-medium">Filters</summary>
              <div className="mt-4">
                <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                  <FilterPanel />
                </Suspense>
              </div>
            </details>
          </div>

          {/* Results grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {docs.map((doc: any) => {
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

          {docs.length === 0 && (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              No creatives found matching your filters.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              {currentPage > 1 ? (
                <Link href={buildPageUrl(currentPage - 1)}>
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Link href={buildPageUrl(currentPage + 1)}>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
