'use client'

import { useState } from 'react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const platformOptions = [
  { value: 'douyin', label: 'Douyin' },
  { value: 'xiaohongshu', label: 'Xiaohongshu' },
  { value: 'bilibili', label: 'Bilibili' },
  { value: 'weibo', label: 'Weibo' },
  { value: 'wechat', label: 'WeChat' },
  { value: 'baidu', label: 'Baidu' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'google_search', label: 'Google Search' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'app_store', label: 'App Store' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'other', label: 'Other' },
]

const ecosystemOptions = [
  { value: 'china', label: 'China' },
  { value: 'global', label: 'Global' },
]

export default function SubmitPage() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const body = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setStatus('success')
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Thank You!</h1>
        <p className="mt-4 text-muted-foreground">
          Your submission has been received and is pending review. We appreciate your contribution to the community.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold">Submit a Creative</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Found an interesting AI product ad? Share it with the community. All submissions are reviewed before publishing.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Source URL */}
        <div>
          <label htmlFor="sourceUrl" className="block text-sm font-medium">
            Source URL <span className="text-destructive">*</span>
          </label>
          <input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            required
            placeholder="https://..."
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Brand Name */}
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium">
            Brand Name
          </label>
          <input
            id="brandName"
            name="brandName"
            type="text"
            placeholder="e.g. ChatGPT, Midjourney"
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Brief description of the creative"
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Platform */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium">
            Platform <span className="text-destructive">*</span>
          </label>
          <select
            id="platform"
            name="platform"
            required
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select platform...</option>
            {platformOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Ecosystem */}
        <div>
          <label htmlFor="ecosystem" className="block text-sm font-medium">
            Ecosystem <span className="text-destructive">*</span>
          </label>
          <select
            id="ecosystem"
            name="ecosystem"
            required
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select ecosystem...</option>
            {ecosystemOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Landing URL */}
        <div>
          <label htmlFor="landingUrl" className="block text-sm font-medium">
            Landing URL
          </label>
          <input
            id="landingUrl"
            name="landingUrl"
            type="url"
            placeholder="https://..."
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Submitted By */}
        <div>
          <label htmlFor="submittedBy" className="block text-sm font-medium">
            Your Email <span className="text-destructive">*</span>
          </label>
          <input
            id="submittedBy"
            name="submittedBy"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Creative'}
        </button>
      </form>
    </div>
  )
}
