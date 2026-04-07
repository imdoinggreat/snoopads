import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { extractArrayValues } from '@/lib/queries'
import { MediaDisplay } from '@/components/media-display'
import { AnalysisSection } from '@/components/analysis-section'
import { CreativeCard } from '@/components/creative-card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

interface DetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DetailPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'creative-units',
    where: { slug: { equals: slug }, status: { equals: 'approved' } },
    limit: 1,
    depth: 1,
  })

  const doc = result.docs[0]
  if (!doc) return { title: 'Not Found' }

  const brand = typeof doc.brand === 'object' ? doc.brand : null
  return {
    title: `${doc.title ?? 'Creative'} — ${brand?.brandName ?? ''} | AI Creative DB`,
    description: doc.headline ?? `Creative analysis for ${doc.title}`,
  }
}

const platformLabels: Record<string, string> = {
  douyin: 'Douyin',
  xiaohongshu: 'Xiaohongshu',
  bilibili: 'Bilibili',
  weibo: 'Weibo',
  wechat: 'WeChat',
  baidu: 'Baidu',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  google_search: 'Google Search',
  reddit: 'Reddit',
  x: 'X',
  app_store: 'App Store',
  landing_page: 'Landing Page',
  other: 'Other',
}

const hookLabels: Record<string, string> = {
  pain_point: 'Pain Point',
  efficiency: 'Efficiency',
  curiosity: 'Curiosity',
  before_after: 'Before/After',
  product_demo: 'Product Demo',
  social_proof: 'Social Proof',
  aspiration: 'Aspiration',
  comparison: 'Comparison',
  tutorial: 'Tutorial',
  fomo: 'FOMO',
}

export default async function CreativeDetailPage({ params }: DetailPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // Fetch the creative unit
  const result = await payload.find({
    collection: 'creative-units',
    where: { slug: { equals: slug }, status: { equals: 'approved' } },
    limit: 1,
    depth: 2,
  })

  const doc = result.docs[0]
  if (!doc) notFound()

  const brand = typeof doc.brand === 'object' ? doc.brand : null
  const useCases = extractArrayValues(doc.useCase as any)
  const targetAudience = extractArrayValues(doc.targetAudience as any)
  const tags = extractArrayValues(doc.tags as any)

  // Fetch assets, analysis, and related in parallel
  const [assetsRes, analysisRes, relatedRes] = await Promise.all([
    payload.find({
      collection: 'creative-assets',
      where: { creativeUnit: { equals: doc.id } },
      sort: 'sortOrder',
      depth: 2,
    }),
    payload.find({
      collection: 'creative-analysis',
      where: { creativeUnit: { equals: doc.id } },
      limit: 1,
      depth: 0,
    }),
    payload.find({
      collection: 'creative-units',
      where: {
        platform: { equals: doc.platform },
        status: { equals: 'approved' },
        id: { not_equals: doc.id },
      },
      limit: 4,
      depth: 2,
    }),
  ])

  const assets = assetsRes.docs
  const analysis = analysisRes.docs[0] as any | undefined
  const related = relatedRes.docs

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero: Media + Meta */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Media */}
        <div className="space-y-4">
          {assets.length > 0 ? (
            assets.map((asset: any) => {
              const file = typeof asset.file === 'object' ? asset.file : null
              if (!file?.url) return null
              return (
                <MediaDisplay
                  key={asset.id}
                  url={file.url}
                  type={asset.assetType}
                  alt={doc.title ?? 'Creative asset'}
                  aspectRatio={asset.aspectRatio ?? undefined}
                />
              )
            })
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-muted-foreground">
              No media available
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {brand && <span className="font-medium text-foreground">{brand.brandName}</span>}
            <span>on {platformLabels[doc.platform] ?? doc.platform}</span>
            <Badge variant="secondary" className="text-[10px] uppercase">
              {doc.ecosystem === 'china' ? 'CN' : 'Global'}
            </Badge>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">{doc.title}</h1>

          {doc.headline && (
            <p className="text-lg text-muted-foreground">{doc.headline}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {doc.hookType && (
              <Badge variant="outline">{hookLabels[doc.hookType] ?? doc.hookType}</Badge>
            )}
            {doc.disguiseLevel && (
              <Badge variant="secondary">Disguise: {doc.disguiseLevel}</Badge>
            )}
            {doc.funnelStage && (
              <Badge variant="secondary">{doc.funnelStage.replace('_', ' ')}</Badge>
            )}
            {useCases.map((uc) => (
              <Badge key={uc} variant="secondary">{uc}</Badge>
            ))}
          </div>

          {doc.bodyCopy && (
            <p className="text-sm whitespace-pre-line">{doc.bodyCopy}</p>
          )}

          {doc.cta && (
            <p className="text-sm">
              <span className="font-medium">CTA:</span> {doc.cta}
            </p>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Creative Snapshot */}
      <section>
        <h2 className="text-xl font-semibold">Creative Snapshot</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SnapshotItem label="Unit Type" value={doc.unitType?.replace(/_/g, ' ')} />
          <SnapshotItem label="Content Format" value={doc.contentFormat?.replace(/_/g, ' ')} />
          <SnapshotItem label="Platform" value={platformLabels[doc.platform] ?? doc.platform} />
          <SnapshotItem label="Ecosystem" value={doc.ecosystem === 'china' ? 'China' : 'Global'} />
          <SnapshotItem label="Region" value={doc.region} />
          <SnapshotItem label="Language" value={doc.language} />
          <SnapshotItem label="Hook Type" value={doc.hookType ? (hookLabels[doc.hookType] ?? doc.hookType) : undefined} />
          <SnapshotItem label="Disguise Level" value={doc.disguiseLevel} />
          <SnapshotItem label="Claim Intensity" value={doc.claimIntensity} />
          <SnapshotItem label="Campaign Angle" value={doc.campaignAngle} />
          <SnapshotItem label="User Promise" value={doc.userPromise} />
          {targetAudience.length > 0 && (
            <SnapshotItem label="Target Audience" value={targetAudience.join(', ')} />
          )}
          {tags.length > 0 && (
            <SnapshotItem label="Tags" value={tags.join(', ')} />
          )}
        </dl>
      </section>

      <Separator className="my-8" />

      {/* Analysis */}
      {analysis && (
        <>
          <AnalysisSection
            whyItWorks={analysis.whyItWorks}
            potentialWeaknesses={analysis.potentialWeaknesses}
            reusableInsights={analysis.reusableInsights}
            aiGenerated={analysis.aiGenerated}
          />
          <Separator className="my-8" />
        </>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Related Creatives</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((rel: any) => {
              const relBrand = typeof rel.brand === 'object' ? rel.brand : null
              const relUseCases = extractArrayValues(rel.useCase)
              return (
                <CreativeCard
                  key={rel.id}
                  slug={rel.slug}
                  title={rel.title ?? 'Untitled'}
                  brandName={relBrand?.brandName ?? 'Unknown'}
                  platform={rel.platform}
                  hookType={rel.hookType}
                  useCases={relUseCases}
                  disguiseLevel={rel.disguiseLevel}
                  thumbnailUrl={undefined}
                  ecosystem={rel.ecosystem}
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

function SnapshotItem({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm capitalize">{value}</dd>
    </div>
  )
}
