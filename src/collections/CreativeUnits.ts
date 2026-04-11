import type { CollectionConfig } from 'payload'

export const CreativeUnits: CollectionConfig = {
  slug: 'creative-units',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'brand', 'platform', 'hookType', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'brand', type: 'relationship', relationTo: 'brands', required: true },
    { name: 'productName', type: 'text', label: 'Product Name' },
    {
      name: 'ecosystem',
      type: 'select',
      required: true,
      options: ['china', 'global'],
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        'douyin', 'xiaohongshu', 'bilibili', 'weibo', 'wechat', 'baidu',
        'facebook', 'instagram', 'tiktok', 'youtube', 'google_search',
        'reddit', 'x', 'app_store', 'landing_page', 'other',
      ],
    },
    {
      name: 'unitType',
      type: 'select',
      required: true,
      label: 'Unit Type',
      options: [
        'paid_ad', 'organic_post', 'brand_account_video', 'creator_collab',
        'ugc_style_content', 'search_ad', 'landing_page', 'app_store_asset',
        'email', 'website_hero',
      ],
    },
    {
      name: 'contentFormat',
      type: 'select',
      required: true,
      label: 'Content Format',
      options: [
        'image', 'carousel', 'short_video', 'long_video',
        'text_post', 'search_text', 'landing_page', 'screenshot_set',
      ],
    },
    { name: 'region', type: 'text' },
    { name: 'language', type: 'text' },
    { name: 'headline', type: 'text' },
    { name: 'bodyCopy', type: 'textarea', label: 'Body Copy' },
    { name: 'cta', type: 'text', label: 'CTA' },
    {
      name: 'hookType',
      type: 'select',
      label: 'Hook Type',
      options: [
        'pain_point', 'efficiency', 'curiosity', 'before_after',
        'product_demo', 'social_proof', 'aspiration', 'comparison',
        'tutorial', 'fomo',
      ],
    },
    { name: 'campaignAngle', type: 'text', label: 'Campaign Angle' },
    {
      name: 'funnelStage',
      type: 'select',
      label: 'Funnel Stage',
      options: ['awareness', 'consideration', 'acquisition', 'activation', 'retention', 're_engagement'],
    },
    { name: 'targetAudience', type: 'array', label: 'Target Audience', fields: [{ name: 'value', type: 'text' }] },
    { name: 'useCase', type: 'array', label: 'Use Case', fields: [{ name: 'value', type: 'text' }] },
    { name: 'userPromise', type: 'text', label: 'User Promise' },
    { name: 'nativeStyle', type: 'array', label: 'Native Style', fields: [{ name: 'value', type: 'text' }] },
    {
      name: 'disguiseLevel',
      type: 'select',
      label: 'Disguise Level',
      options: ['low', 'medium', 'high'],
    },
    {
      name: 'claimIntensity',
      type: 'select',
      label: 'Claim Intensity',
      options: ['low', 'medium', 'high'],
    },
    { name: 'visualStyle', type: 'array', label: 'Visual Style', fields: [{ name: 'value', type: 'text' }] },
    { name: 'tags', type: 'array', fields: [{ name: 'value', type: 'text' }] },
    { name: 'sourceUrl', type: 'text', label: 'Source URL (original)' },
    { name: 'landingUrl', type: 'text', label: 'Landing URL' },
    {
      name: 'source',
      type: 'select',
      options: [
        'meta_ad_library', 'tiktok_creative_center', 'manual_capture',
        'app_store', 'official_website', 'creator_post', 'archive', 'community',
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'approved', 'archived'],
    },
    { name: 'submittedBy', type: 'email', label: 'Submitted By (email)' },
    { name: 'reviewerNote', type: 'textarea', label: 'Reviewer Note' },
    { name: 'dateSeen', type: 'date', label: 'Date First Seen' },
    {
      name: 'assets',
      type: 'join',
      collection: 'creative-assets',
      on: 'creativeUnit',
      admin: {
        description: 'Images, videos, and screenshots associated with this creative unit.',
      },
    },
  ],
}
