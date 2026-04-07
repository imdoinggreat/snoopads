export interface TaggingResult {
  headline?: string
  bodyCopy?: string
  cta?: string
  hookType?: string
  funnelStage?: string
  claimIntensity?: string
  disguiseLevel?: string
  targetAudience?: string[]
  useCase?: string[]
  userPromise?: string
  whyItWorks?: string[]
  potentialWeaknesses?: string[]
  reusableInsights?: string[]
}

export function parseTaggingResponse(raw: string): TaggingResult {
  try {
    // Try to extract JSON from markdown code blocks if present
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : raw.trim()
    const parsed = JSON.parse(jsonStr)
    return parsed as TaggingResult
  } catch {
    return {}
  }
}
