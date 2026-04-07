import { describe, it, expect } from 'vitest'

function validateSubmission(body: Record<string, string>) {
  const required = ['sourceUrl', 'ecosystem', 'platform', 'submittedBy']
  return required.every((k) => Boolean(body[k]))
}

describe('submission validation', () => {
  it('passes with all required fields', () => {
    expect(
      validateSubmission({
        sourceUrl: 'https://example.com',
        ecosystem: 'china',
        platform: 'douyin',
        submittedBy: 'user@example.com',
      }),
    ).toBe(true)
  })

  it('fails when sourceUrl is missing', () => {
    expect(
      validateSubmission({
        ecosystem: 'china',
        platform: 'douyin',
        submittedBy: 'user@example.com',
        sourceUrl: '',
      }),
    ).toBe(false)
  })

  it('fails when ecosystem is missing', () => {
    expect(
      validateSubmission({
        sourceUrl: 'https://example.com',
        platform: 'douyin',
        submittedBy: 'user@example.com',
        ecosystem: '',
      }),
    ).toBe(false)
  })

  it('fails when platform is missing', () => {
    expect(
      validateSubmission({
        sourceUrl: 'https://example.com',
        ecosystem: 'china',
        submittedBy: 'user@example.com',
      }),
    ).toBe(false)
  })

  it('fails when submittedBy is missing', () => {
    expect(
      validateSubmission({
        sourceUrl: 'https://example.com',
        ecosystem: 'china',
        platform: 'douyin',
      }),
    ).toBe(false)
  })
})
