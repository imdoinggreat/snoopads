import type { CollectionConfig } from 'payload'

export const CollectionItems: CollectionConfig = {
  slug: 'collection-items',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'collection', type: 'relationship', relationTo: 'collections', required: true },
    { name: 'creativeUnit', type: 'relationship', relationTo: 'creative-units', required: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
