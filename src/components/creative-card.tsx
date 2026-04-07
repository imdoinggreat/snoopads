import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
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
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-video bg-muted">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No preview
            </div>
          )}
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-[10px] uppercase"
          >
            {ecosystem === 'china' ? 'CN' : 'Global'}
          </Badge>
        </div>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{brandName}</span>
            <span>{platformLabels[platform] ?? platform}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:underline">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {hookType && (
              <Badge variant="outline" className="text-[10px]">
                {hookLabels[hookType] ?? hookType}
              </Badge>
            )}
            {disguiseLevel && (
              <Badge variant="secondary" className="text-[10px]">
                Disguise: {disguiseLevel}
              </Badge>
            )}
            {useCases.slice(0, 2).map((uc) => (
              <Badge key={uc} variant="secondary" className="text-[10px]">
                {uc}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
