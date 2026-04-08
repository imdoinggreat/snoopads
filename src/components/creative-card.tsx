import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface CreativeCardProps {
  slug: string
  title: string
  brandName: string
  platform: string
  hookType?: string
  useCases?: string[]
  disguiseLevel?: string
  thumbnailUrl?: string
  ecosystem: string
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

export function CreativeCard({
  slug,
  title,
  brandName,
  platform,
  hookType,
  useCases = [],
  disguiseLevel,
  thumbnailUrl,
  ecosystem,
}: CreativeCardProps) {
  return (
    <Link href={`/creative/${slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-card card-hover">
        <div className="relative aspect-video bg-secondary">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              No preview
            </div>
          )}
          <span className="absolute top-2 right-2 text-[10px] uppercase bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full border border-border">
            {ecosystem === 'china' ? 'CN' : 'Global'}
          </span>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{brandName}</span>
            <span>{platformLabels[platform] ?? platform}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {hookType && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                {hookLabels[hookType] ?? hookType}
              </span>
            )}
            {disguiseLevel && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                Disguise: {disguiseLevel}
              </span>
            )}
            {useCases.slice(0, 2).map((uc) => (
              <span key={uc} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
