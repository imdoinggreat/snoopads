import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { tagCreativeWithAI } from '@/lib/ai-tagger'

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const adminSecret = req.headers.get('x-admin-secret')
    if (!adminSecret || adminSecret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { creativeUnitId, imageUrl, platform, ecosystem, brandName } = body

    if (!creativeUnitId || !imageUrl) {
      return NextResponse.json(
        { error: 'creativeUnitId and imageUrl are required' },
        { status: 400 },
      )
    }

    // Call AI tagger
    const result = await tagCreativeWithAI(imageUrl, { platform, ecosystem, brandName })

    const payload = await getPayload({ config: configPromise })

    // Update creative unit with AI-extracted fields
    await payload.update({
      collection: 'creative-units',
      id: creativeUnitId,
      data: {
        headline: result.headline || undefined,
        bodyCopy: result.bodyCopy || undefined,
        cta: result.cta || undefined,
        hookType: result.hookType as any || undefined,
        funnelStage: result.funnelStage as any || undefined,
        claimIntensity: result.claimIntensity as any || undefined,
        disguiseLevel: result.disguiseLevel as any || undefined,
        userPromise: result.userPromise || undefined,
        targetAudience: result.targetAudience?.map((v) => ({ value: v })) ?? [],
        useCase: result.useCase?.map((v) => ({ value: v })) ?? [],
      },
    })

    // Upsert creative analysis
    const existingAnalysis = await payload.find({
      collection: 'creative-analysis',
      where: { creativeUnit: { equals: creativeUnitId } },
      limit: 1,
    })

    const analysisData = {
      creativeUnit: creativeUnitId,
      whyItWorks: result.whyItWorks?.map((point) => ({ point })) ?? [],
      potentialWeaknesses: result.potentialWeaknesses?.map((point) => ({ point })) ?? [],
      reusableInsights: result.reusableInsights?.map((insight) => ({ insight })) ?? [],
      aiGenerated: true,
    }

    if (existingAnalysis.docs.length > 0) {
      await payload.update({
        collection: 'creative-analysis',
        id: existingAnalysis.docs[0].id,
        data: analysisData,
      })
    } else {
      await payload.create({
        collection: 'creative-analysis',
        data: analysisData,
      })
    }

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('AI tagging error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
