'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'

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
      <Combobox
        label="ECOSYSTEM"
        options={ecosystems}
        value={searchParams.get('ecosystem') ?? ''}
        onChange={(v) => handleChange('ecosystem', v)}
        placeholder="All Ecosystems"
      />

      <Combobox
        label="PLATFORM"
        options={platforms}
        value={searchParams.get('platform') ?? ''}
        onChange={(v) => handleChange('platform', v)}
        placeholder="All Platforms"
      />

      <Combobox
        label="HOOK TYPE"
        options={hookTypes}
        value={searchParams.get('hookType') ?? ''}
        onChange={(v) => handleChange('hookType', v)}
        placeholder="All Hook Types"
      />

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="w-full text-muted-foreground hover:text-foreground">
          Clear all
        </Button>
      )}
    </div>
  )
}
