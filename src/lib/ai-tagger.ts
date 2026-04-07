// NOTE: Requires `pnpm add @anthropic-ai/sdk` — the package is not yet in package.json
import Anthropic from '@anthropic-ai/sdk'
import { parseTaggingResponse, type TaggingResult } from './parse-tagging-response'

export { parseTaggingResponse, type TaggingResult }

const SYSTEM_PROMPT = `You are a creative intelligence analyst specializing in digital advertising for AI products.

Analyze the provided creative material (ad image/screenshot) and return a JSON object with the following fields:

- headline: The main headline text visible in the creative
- bodyCopy: The body/supporting text
- cta: The call-to-action text (e.g. "Try Free", "Download Now")
- hookType: One of: pain_point, efficiency, curiosity, before_after, product_demo, social_proof, aspiration, comparison, tutorial, fomo
- funnelStage: One of: awareness, consideration, acquisition, activation, retention, re_engagement
- claimIntensity: One of: low, medium, high — how bold are the claims?
- disguiseLevel: One of: low, medium, high — how much does this look like organic/native content vs. obvious ad?
- targetAudience: Array of audience segments this ad targets (e.g. ["content creators", "small business owners"])
- useCase: Array of use cases being promoted (e.g. ["writing assistance", "email drafting"])
- userPromise: The core promise or value proposition in one sentence
- whyItWorks: Array of 2-4 reasons this creative is effective
- potentialWeaknesses: Array of 1-3 potential weaknesses or risks
- reusableInsights: Array of 2-4 actionable insights other marketers could reuse

Return ONLY valid JSON. No markdown, no explanation, just the JSON object.`

export async function tagCreativeWithAI(
  imageUrl: string,
  context: { platform?: string; ecosystem?: string; brandName?: string },
): Promise<TaggingResult> {
  const client = new Anthropic()

  const userContent = `Analyze this creative ad from ${context.brandName || 'an unknown brand'} on ${context.platform || 'unknown platform'} (${context.ecosystem || 'global'} market).`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'url', url: imageUrl },
          },
          {
            type: 'text',
            text: userContent,
          },
        ],
      },
    ],
    system: SYSTEM_PROMPT,
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') return {}

  return parseTaggingResponse(textBlock.text)
}
