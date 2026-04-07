import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, brandName, platform, ecosystem, sourceUrl, landingUrl, submittedBy } = body

    // Validate required fields
    const required = ['sourceUrl', 'ecosystem', 'platform', 'submittedBy'] as const
    const missing = required.filter((k) => !body[k])
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    // Find or create brand
    let brandId: number | undefined
    if (brandName) {
      const existing = await payload.find({
        collection: 'brands',
        where: { brandName: { like: brandName } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        brandId = existing.docs[0].id as number
      } else {
        const newBrand = await payload.create({
          collection: 'brands',
          data: { brandName },
        })
        brandId = newBrand.id as number
      }
    } else {
      // Create a placeholder brand if none provided
      const placeholder = await payload.find({
        collection: 'brands',
        where: { brandName: { equals: 'Unknown' } },
        limit: 1,
      })
      if (placeholder.docs.length > 0) {
        brandId = placeholder.docs[0].id as number
      } else {
        const newBrand = await payload.create({
          collection: 'brands',
          data: { brandName: 'Unknown' },
        })
        brandId = newBrand.id as number
      }
    }

    const slug = `community-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

    await payload.create({
      collection: 'creative-units',
      data: {
        slug,
        title: title || undefined,
        brand: brandId,
        platform,
        ecosystem,
        unitType: 'paid_ad',
        contentFormat: 'image',
        sourceUrl: sourceUrl || undefined,
        landingUrl: landingUrl || undefined,
        source: 'community',
        status: 'pending',
        submittedBy,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
