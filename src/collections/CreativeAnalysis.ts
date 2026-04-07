import type { CollectionConfig } from 'payload'

export const CreativeAnalysis: CollectionConfig = {
  slug: 'creative-analysis',
  admin: {
    defaultColumns: ['creativeUnit', 'confidenceScore', 'aiGenerated'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'creativeUnit', type: 'relationship', relationTo: 'creative-units', required: true, unique: true },
    { name: 'whyItWorks', type: 'array', label: 'Why It Works', fields: [{ name: 'point', type: 'text' }] },
    { name: 'potentialWeaknesses', type: 'array', label: 'Potential Weaknesses', fields: [{ name: 'point', type: 'text' }] },
    { name: 'reusableInsights', type: 'array', label: 'Reusable Insights', fields: [{ name: 'insight', type: 'text' }] },
    { name: 'competitiveNotes', type: 'textarea', label: 'Competitive Notes' },
    { name: 'complianceNotes', type: 'textarea', label: 'Compliance Notes' },
    { name: 'confidenceScore', type: 'number', label: 'Confidence Score (0-1)', min: 0, max: 1 },
    { name: 'analystNote', type: 'textarea', label: 'Analyst Note' },
    {
      name: 'aiGenerated',
      type: 'checkbox',
      label: 'AI Generated (needs human review)',
      defaultValue: false,
    },
  ],
}
