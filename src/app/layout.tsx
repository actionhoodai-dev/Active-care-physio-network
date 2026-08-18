import type { Metadata } from 'next';
import { Open_Sans, Lora } from 'next/font/google';
import PublicLayoutChrome from '@/components/layout/PublicLayoutChrome';
import { generateMedicalOrganizationSchema } from '@/lib/schema';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://activecarephysio.in'),
  title: {
    default: 'Active Care Physiotherapy Centre | Get Back Your Active Lifestyle | Velachery, Chennai',
    template: '%s | Active Care Physiotherapy Centre',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png' },
    ],
  },
  description:
    'Active Care Physiotherapy Centre — Get back your active lifestyle with Chennai\'s trusted multi-clinic healthcare network connecting Active Care Physiotherapy Centre (Velachery), DR. PAUL\'S ORTHO CLINIC (Medavakkam), and Arunai Clinic (Velachery). Expert physiotherapy, orthopedic surgery, neurology & diabetes care. Led by Dr. A. Ashok kumar (PT) MPT.(Neuro.), M.I.A.P. Senior Physiotherapist (Reg No.: LA-39552). Book appointments: +91 9884308186.',
  keywords: [
    // Brand Names
    'Active Care Physiotherapy Centre',
    'Active Care Physiotherapy',
    'Active Care Physio Velachery',
    'Active Care Physio',
    'DR PAUL ORTHO CLINIC',
    'Dr Pauls Ortho Clinic Medavakkam',
    'Dr Paul Orthopedic Clinic Chennai',
    'Arunai Clinic',
    'Arunai Clinic Velachery',
    // Doctor Names
    'Dr A Ashok kumar Physiotherapist',
    'Dr Ashok kumar Physiotherapy',
    'Dr Ashok kumar Velachery',
    'Dr Paul Orthopedic',
    'Dr Paul Ortho Medavakkam',
    // Services + Location
    'physiotherapy Velachery',
    'physiotherapy center Velachery Chennai',
    'physiotherapy near me Velachery',
    'sports injury clinic Velachery',
    'sports injury rehabilitation Chennai',
    'ortho clinic Medavakkam',
    'orthopedic doctor Medavakkam Chennai',
    'orthopedic clinic near Velachery',
    'joint replacement Medavakkam',
    'spine care Chennai',
    'trauma care Medavakkam',
    'neurologist Velachery',
    'neurology clinic Velachery Chennai',
    'diabetes clinic Velachery',
    'diabetes management Chennai',
    'back pain treatment Velachery',
    'knee pain treatment Chennai',
    'arthritis treatment Velachery',
    'balance exercise therapy Chennai',
    'foot ankle pain Velachery',
    // General
    'best physiotherapy Chennai',
    'best ortho clinic Chennai',
    'healthcare network Chennai',
    'multi-clinic hospital hub Chennai',
    'physiotherapy home visit Chennai',
    'online physiotherapy consultation',
  ],
  authors: [
    { name: 'Active Care Physiotherapy Centre' },
    { name: 'Dr. A. Ashok kumar' },
  ],
  creator: 'Active Care Physiotherapy Centre',
  publisher: 'Active Care Physiotherapy Centre',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Active Care Physiotherapy Centre | Physiotherapy, Orthopedics & Neurology | Velachery & Medavakkam, Chennai',
    description:
      'Chennai\'s trusted multi-clinic healthcare hub — Active Care Physiotherapy (Velachery), DR. PAUL\'S ORTHO CLINIC (Medavakkam), Arunai Clinic (Velachery). Expert physiotherapy, orthopedic, neurology & diabetes care. 15+ years experience. 10,00,000+ patients treated.',
    url: '/',
    siteName: 'Active Care Physiotherapy Centre',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Active Care Physiotherapy Centre Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Active Care Physiotherapy Centre | Physiotherapy, Orthopedics & Neurology',
    description:
      'Chennai\'s trusted multi-clinic healthcare hub. Expert physiotherapy, orthopedic surgery, neurology & diabetes care across Velachery & Medavakkam.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {},
  category: 'Healthcare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateMedicalOrganizationSchema();

  return (
    <html lang="en" className={`${openSans.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0A192F] text-slate-100 antialiased font-sans" suppressHydrationWarning>
        <PublicLayoutChrome>{children}</PublicLayoutChrome>
      </body>
    </html>
  );
}
