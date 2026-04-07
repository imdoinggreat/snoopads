import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MediaDisplayProps {
  url: string
  type: 'image' | 'video' | 'screenshot'
  alt: string
  aspectRatio?: string
  className?: string
}

const aspectClasses: Record<string, string> = {
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
  '16:9': 'aspect-video',
  '4:5': 'aspect-[4/5]',
  '1.91:1': 'aspect-[1.91/1]',
}

export function MediaDisplay({
  url,
  type,
  alt,
  aspectRatio,
  className,
}: MediaDisplayProps) {
  const aspect = aspectRatio ? (aspectClasses[aspectRatio] ?? 'aspect-video') : 'aspect-video'

  if (type === 'video') {
    return (
      <video
        src={url}
        controls
        playsInline
        className={cn('w-full rounded-lg bg-black', aspect, className)}
      />
    )
  }

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg bg-muted', aspect, className)}>
      <Image
        src={url}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}
