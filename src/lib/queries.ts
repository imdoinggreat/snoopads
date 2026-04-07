export interface CreativeUnitFilters {
  ecosystem?: string
  platform?: string
  hookType?: string
  search?: string
}

export function buildCreativeUnitWhere(filters: CreativeUnitFilters) {
  const where: Record<string, any> = {
    status: { equals: 'approved' },
  }

  if (filters.ecosystem) {
    where.ecosystem = { equals: filters.ecosystem }
  }
  if (filters.platform) {
    where.platform = { equals: filters.platform }
  }
  if (filters.hookType) {
    where.hookType = { equals: filters.hookType }
  }
  if (filters.search) {
    where.or = [
      { title: { like: filters.search } },
      { headline: { like: filters.search } },
    ]
  }

  return where
}

export function extractArrayValues(
  arr: Array<{ value: string }> | null | undefined
): string[] {
  if (!arr) return []
  return arr.map((item) => item.value).filter(Boolean)
}
