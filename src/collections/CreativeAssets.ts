import type { CollectionConfig } from 'payload'

export const CreativeAssets: CollectionConfig = {
  slug: 'creative-assets',
  admin: {
    defaultColumns: ['creativeUnit', 'assetType', 'aspectRatio'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'creativeUnit', type: 'relationship', relationTo: 'creative-units', required: true },
    {
      name: 'assetType',
      type: 'select',
      required: true,
      label: 'Asset Type',
      options: ['image', 'video', 'screenshot'],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'thumbnailFile', type: 'upload', relationTo: 'media', label: 'Thumbnail' },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      options: ['1:1', '9:16', '16:9', '4:5', '1.91:1'],
    },
    { name: 'durationSeconds', type: 'number', label: 'Duration (seconds)' },
    { name: 'coverFrameText', type: 'text', label: 'Cover Frame Text' },
    { name: 'onScreenText', type: 'array', label: 'On-Screen Text', fields: [{ name: 'line', type: 'text' }] },
    { name: 'voiceoverSummary', type: 'textarea', label: 'Voiceover Summary' },
    { name: 'sortOrder', type: 'number', label: 'Sort Order', defaultValue: 0 },
  ],
}
