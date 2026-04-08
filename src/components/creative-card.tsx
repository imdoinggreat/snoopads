import Link from 'next/link'
import Image from 'next/image'

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
      <div className="intel-card rounded-lg overflow-hidden">
        {/* Thumbnail area */}
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
            <div className="flex h-full items-center justify-center">
              <span className="taxonomy-label">No preview</span>
            </div>
          )}
          {/* Ecosystem badge */}
          <span className="absolute top-2 right-2 taxonomy-label px-1.5 py-0.5 bg-background/80 rounded text-[10px]">
            {ecosystem === 'china' ? 'CN' : 'GL'}
          </span>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Platform + Brand row */}
          <div className="flex items-center justify-between">
            <span className="taxonomy-label text-primary">
              {platformLabels[platform] ?? platform}
            </span>
            <span className="text-xs text-muted-foreground truncate ml-2">
              {brandName}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm text-muted-foreground leading-snug line-clamp-2 group-hover:text-foreground transition-colors">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {hookType && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                {hookLabels[hookType] ?? hookType}
              </span>
            )}
            {disguiseLevel && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-muted-foreground bg-secondary border border-border">
                Disguise: {disguiseLevel}
              </span>
            )}
            {useCases.slice(0, 2).map((uc) => (
              <span key={uc} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-muted-foreground bg-secondary border border-border">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
