import { describe, it, expect } from 'vitest'
import {
  buildCreativeUnitWhere,
  extractArrayValues,
} from '../../src/lib/queries'

describe('buildCreativeUnitWhere', () => {
  it('returns approved-only filter when no filters', () => {
    const where = buildCreativeUnitWhere({})
    expect(where).toEqual({ status: { equals: 'approved' } })
  })

  it('adds ecosystem filter when provided', () => {
    const where = buildCreativeUnitWhere({ ecosystem: 'china' })
    expect(where).toEqual({
      status: { equals: 'approved' },
      ecosystem: { equals: 'china' },
    })
  })

  it('adds platform filter when provided', () => {
    const where = buildCreativeUnitWhere({ platform: 'douyin' })
    expect(where).toEqual({
      status: { equals: 'approved' },
      platform: { equals: 'douyin' },
    })
  })

  it('adds hookType filter when provided', () => {
    const where = buildCreativeUnitWhere({ hookType: 'pain_point' })
    expect(where).toEqual({
      status: { equals: 'approved' },
      hookType: { equals: 'pain_point' },
    })
  })

  it('adds search filter on title and headline', () => {
    const where = buildCreativeUnitWhere({ search: 'chatgpt' })
    expect(where).toMatchObject({
      or: [
        { title: { like: 'chatgpt' } },
        { headline: { like: 'chatgpt' } },
      ],
    })
  })
})

describe('extractArrayValues', () => {
  it('extracts value strings from Payload array field', () => {
    const input = [{ value: 'foo' }, { value: 'bar' }]
    expect(extractArrayValues(input)).toEqual(['foo', 'bar'])
  })

  it('returns empty array for null input', () => {
    expect(extractArrayValues(null)).toEqual([])
  })
})
