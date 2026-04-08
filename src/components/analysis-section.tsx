interface AnalysisSectionProps {
  whyItWorks?: Array<{ point: string }>
  potentialWeaknesses?: Array<{ point: string }>
  reusableInsights?: Array<{ insight: string }>
  aiGenerated?: boolean
}

export function AnalysisSection({
  whyItWorks,
  potentialWeaknesses,
  reusableInsights,
  aiGenerated,
}: AnalysisSectionProps) {
  const hasContent =
    (whyItWorks && whyItWorks.length > 0) ||
    (potentialWeaknesses && potentialWeaknesses.length > 0) ||
    (reusableInsights && reusableInsights.length > 0)

  if (!hasContent) return null

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Analysis</h2>

      {aiGenerated && (
        <p className="rounded-md border border-amber-800/30 bg-amber-950/20 px-4 py-3 text-xs text-amber-300">
          This analysis was AI-generated and may require human review.
        </p>
      )}

      {whyItWorks && whyItWorks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-emerald-400">Why It Works</h3>
          <ul className="space-y-1">
            {whyItWorks.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-0.5 text-emerald-500">&#x2713;</span>
                <span>{item.point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {potentialWeaknesses && potentialWeaknesses.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-amber-400">Potential Weaknesses</h3>
          <ul className="space-y-1">
            {potentialWeaknesses.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-0.5 text-amber-500">&#x26A0;</span>
                <span>{item.point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reusableInsights && reusableInsights.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Reusable Insights</h3>
          {reusableInsights.map((item, i) => (
            <blockquote
              key={i}
              className="border-l-2 border-primary pl-4 text-sm italic text-muted-foreground"
            >
              {item.insight}
            </blockquote>
          ))}
        </div>
      )}
    </section>
  )
}
