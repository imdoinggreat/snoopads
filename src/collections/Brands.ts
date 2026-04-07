import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'brandName',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'brandName', type: 'text', required: true, label: 'Brand Name' },
    { name: 'companyName', type: 'text', label: 'Company Name' },
    { name: 'countryOrigin', type: 'text', label: 'Country of Origin' },
    {
      name: 'category',
      type: 'select',
      options: [
        'ai_assistant', 'search', 'writing', 'image_generation',
        'video_generation', 'coding', 'presentation', 'education',
        'productivity', 'agent',
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'websiteUrl', type: 'text', label: 'Website URL' },
    { name: 'notes', type: 'textarea' },
  ],
}
