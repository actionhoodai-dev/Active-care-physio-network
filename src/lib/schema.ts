import type { Facility } from '@/lib/types/database';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://activecarephysio.in';

export function generateLocalBusinessSchema(facility: Facility) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: facility.name,
    description: facility.description,
    url: facility.website_url || `${SITE_URL}/facility/${facility.slug}`,
    telephone: facility.phone,
    email: facility.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: facility.address,
      addressLocality: facility.city,
      addressRegion: facility.state,
      addressCountry: 'IN',
    },
    image: facility.cover_image_url || facility.logo_url,
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: 'Active Care Healthcare Network',
      url: SITE_URL,
    },
  };
}

export function generateMedicalOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Active Care Healthcare Network',
    description:
      'Active Care Healthcare Network is a centralized healthcare ecosystem that connects multiple clinics, specialty centers, and medical facilities under one trusted umbrella.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 9876543210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tiruvannamalai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
