'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'

const ecosystems = [
  { value: '', label: 'All Ecosystems' },
  { value: 'china', label: 'China' },
  { value: 'global', label: 'Global' },
]

const platforms = [
  { value: '', label: 'All Platforms' },
  { value: 'douyin', label: 'Douyin' },
  { value: 'xiaohongshu', label: 'Xiaohongshu' },
  { value: 'bilibili', label: 'Bilibili' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'google_search', label: 'Google Search' },
]

const hookTypes = [
  { value: '', label: 'All Hook Types' },
  { value: 'pain_point', label: 'Pain Point' },
  { value: 'efficiency', label: 'Efficiency' },
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'before_after', label: 'Before/After' },
  { value: 'product_demo', label: 'Product Demo' },
  { value: 'social_proof', label: 'Social Proof' },
  { value: 'fomo', label: 'FOMO' },
  { value: 'tutorial', label: 'Tutorial' },
]

export function FilterPanel() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createUpdatedParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      return params
    },
    [searchParams],
  )

  const handleChange = useCallback(
    (key: string, value: string) => {
      const params = createUpdatedParams(key, value)
      router.push(`${pathname}?${params.toString()}`)
    },
    [createUpdatedParams, router, pathname],
  )

  const clearAll = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const hasFilters =
    searchParams.has('ecosystem') ||
    searchParams.has('platform') ||
    searchParams.has('hookType')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="taxonomy-label text-foreground">Ecosystem</label>
        <select
          value={searchParams.get('ecosystem') ?? ''}
          onChange={(e) => handleChange('ecosystem', e.target.value)}
          className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
        >
          {ecosystems.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="taxonomy-label text-foreground">Platform</label>
        <select
          value={searchParams.get('platform') ?? ''}
          onChange={(e) => handleChange('platform', e.target.value)}
          className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
        >
          {platforms.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="taxonomy-label text-foreground">Hook Type</label>
        <select
          value={searchParams.get('hookType') ?? ''}
          onChange={(e) => handleChange('hookType', e.target.value)}
          className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
        >
          {hookTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="w-full text-muted-foreground hover:text-foreground">
          Clear all
        </Button>
      )}
    </div>
  )
}
