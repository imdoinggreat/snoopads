import { describe, it, expect } from 'vitest'
import { parseTaggingResponse } from '@/lib/parse-tagging-response'

describe('parseTaggingResponse', () => {
  it('parses valid JSON', () => {
    const raw = JSON.stringify({
      headline: 'Test Headline',
      hookType: 'pain_point',
      targetAudience: ['developers'],
    })
    const result = parseTaggingResponse(raw)
    expect(result.headline).toBe('Test Headline')
    expect(result.hookType).toBe('pain_point')
    expect(result.targetAudience).toEqual(['developers'])
  })

  it('parses JSON wrapped in markdown code block', () => {
    const raw = '```json\n{"headline": "Hello", "cta": "Try Free"}\n```'
    const result = parseTaggingResponse(raw)
    expect(result.headline).toBe('Hello')
    expect(result.cta).toBe('Try Free')
  })

  it('returns empty object for invalid JSON', () => {
    const result = parseTaggingResponse('this is not json at all')
    expect(result).toEqual({})
  })

  it('returns empty object for empty string', () => {
    const result = parseTaggingResponse('')
    expect(result).toEqual({})
  })

  it('handles partial valid fields', () => {
    const raw = JSON.stringify({
      headline: 'Only Headline',
    })
    const result = parseTaggingResponse(raw)
    expect(result.headline).toBe('Only Headline')
    expect(result.hookType).toBeUndefined()
  })
})
