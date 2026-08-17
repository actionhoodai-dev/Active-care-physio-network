import type { Facility } from '@/lib/types/database';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://activecarephysio.in';

export function generateLocalBusinessSchema(facility: Facility) {
  const schema: Record<string, unknown> = {
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
      postalCode: facility.address?.match(/\d{6}/)?.[0] || '',
      addressCountry: 'IN',
    },
    geo: facility.slug === 'active-care-physiotherapy-center'
      ? { '@type': 'GeoCoordinates', latitude: 12.9905, longitude: 80.2100 }
      : facility.slug === 'dr-pauls-ortho-clinic'
      ? { '@type': 'GeoCoordinates', latitude: 12.9123, longitude: 80.1877 }
      : { '@type': 'GeoCoordinates', latitude: 12.9900, longitude: 80.2069 },
    image: facility.cover_image_url || facility.logo_url,
    aggregateRating: facility.slug === 'active-care-physiotherapy-center'
      ? { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '5000', bestRating: '5' }
      : undefined,
    areaServed: [
      { '@type': 'City', name: facility.city || 'Chennai' },
      { '@type': 'State', name: facility.state || 'Tamil Nadu' },
    ],
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: 'Active Care Physiotherapy Centre',
      url: SITE_URL,
    },
    sameAs: [
      facility.website_url,
      facility.google_business_url,
      facility.google_maps_url,
    ].filter(Boolean),
  };

  // Add opening hours
  if (facility.opening_hours) {
    const dayMap: Record<string, string> = {
      monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
      thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
    };
    schema.openingHoursSpecification = Object.entries(facility.opening_hours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayMap[day] || day,
      opens: hours,
    }));
  }

  // Remove undefined values
  return JSON.parse(JSON.stringify(schema));
}

export function generateMedicalOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Active Care Physiotherapy Centre',
    alternateName: ['Active Care Physiotherapy', 'Active Care Physio', 'Active Care Hospital Hub'],
    description:
      'Active Care Physiotherapy Centre is a centralized multi-clinic healthcare ecosystem in Chennai, Tamil Nadu connecting Active Care Physiotherapy & Sports Injury Clinic (Velachery), DR. PAUL\'S ORTHO CLINIC (Medavakkam), and Arunai Clinic (Velachery) — offering physiotherapy, orthopedic care, neurology, diabetes management, and sports injury rehabilitation.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    telephone: '+91 9884308186',
    email: 'ActiveCarePhysio22@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 9884308186',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91 8838939754',
        contactType: 'appointments',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '938, MIG 938, 1st Main Rd, near Lakshmi super market, TNHB Colony',
      addressLocality: 'Velachery',
      addressRegion: 'Tamil Nadu',
      postalCode: '600042',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9905,
      longitude: 80.2100,
    },
    areaServed: [
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'Place', name: 'Velachery' },
      { '@type': 'Place', name: 'Medavakkam' },
      { '@type': 'State', name: 'Tamil Nadu' },
    ],
    subOrganization: [
      {
        '@type': 'MedicalBusiness',
        name: 'Active Care Physiotherapy & Sports Injury Clinic',
        url: 'https://activecarephysio.in/',
        telephone: '+91 9884308186',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '938, MIG 938, 1st Main Rd, TNHB Colony, Velachery',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          postalCode: '600042',
          addressCountry: 'IN',
        },
        medicalSpecialty: ['Physiotherapy', 'Sports Medicine', 'Musculoskeletal Rehabilitation'],
      },
      {
        '@type': 'MedicalBusiness',
        name: "DR.PAUL'S ORTHO CLINIC",
        url: 'https://drpaulsorthoclinic.com/',
        telephone: '+91 8838939754',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Plot no 16, Ramaiah Nagar, Medavakkam',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          postalCode: '600100',
          addressCountry: 'IN',
        },
        medicalSpecialty: ['Orthopedics', 'Trauma Care', 'Joint Replacement', 'Spine Care', 'Sports Medicine'],
      },
      {
        '@type': 'MedicalBusiness',
        name: 'Arunai Clinic',
        telephone: '+91 9884122274',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Latha Illam, TNHB Main Rd, TNHB Colony, Velachery',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          postalCode: '600042',
          addressCountry: 'IN',
        },
        medicalSpecialty: ['Neurology', 'Diabetes Management', 'General Medicine'],
      },
    ],
    medicalSpecialty: [
      'Physiotherapy',
      'Orthopedics',
      'Neurology',
      'Sports Medicine',
      'Diabetes Management',
    ],
    sameAs: [
      'https://activecarephysio.in/',
      'https://drpaulsorthoclinic.com/',
      'https://maps.app.goo.gl/adgaBELxiT8XLhxRA',
    ],
    knowsAbout: [
      'Physiotherapy in Velachery',
      'Physiotherapy in Chennai',
      'Orthopedic Clinic Medavakkam',
      'Ortho Clinic Chennai',
      'Neurologist Velachery',
      'Diabetes Clinic Velachery',
      'Sports Injury Rehabilitation Chennai',
      'Back Pain Treatment Velachery',
      'Joint Replacement Medavakkam',
      'Spine Care Chennai',
    ],
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

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
