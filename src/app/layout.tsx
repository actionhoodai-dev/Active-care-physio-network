import type { Metadata } from 'next';
import { Open_Sans, Lora } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollAnimations from '@/components/ui/ScrollAnimations';
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
    default: 'Activecare Physiotherapy & Healthcare Network | Velachery, Chennai',
    template: '%s | Activecare Healthcare Network',
  },
  description:
    'Activecare Healthcare Network — Chennai\'s trusted multi-clinic healthcare hub connecting Activecare Physiotherapy & Sports Injury Clinic (Velachery), DR. PAUL\'S ORTHO CLINIC (Medavakkam), and Arunai Clinic (Velachery). Expert physiotherapy, orthopedic surgery, neurology & diabetes care. Led by Dr. Senthil Nathan (15+ years). Book appointments: +91 9884308186.',
  keywords: [
    // Brand Names
    'Activecare Physiotherapy',
    'Activecare Physiotherapy & Sports Injury Clinic',
    'Active Care Physiotherapy Center',
    'Active Care Physio Velachery',
    'DR PAUL ORTHO CLINIC',
    'Dr Pauls Ortho Clinic Medavakkam',
    'Dr Paul Orthopedic Clinic Chennai',
    'Arunai Clinic',
    'Arunai Clinic Velachery',
    // Doctor Names
    'Dr Senthil Nathan Physiotherapy',
    'Dr Senthil Nathan Velachery',
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
    { name: 'Activecare Healthcare Network' },
    { name: 'Dr. Senthil Nathan' },
  ],
  creator: 'Activecare Healthcare Network',
  publisher: 'Activecare Healthcare Network',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Activecare Healthcare Network | Physiotherapy, Orthopedics & Neurology | Velachery & Medavakkam, Chennai',
    description:
      'Chennai\'s trusted multi-clinic healthcare hub — Activecare Physiotherapy (Velachery), DR. PAUL\'S ORTHO CLINIC (Medavakkam), Arunai Clinic (Velachery). Expert physiotherapy, orthopedic, neurology & diabetes care. 15+ years experience. 5000+ patients treated.',
    url: '/',
    siteName: 'Activecare Healthcare Network',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Activecare Healthcare Network Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activecare Healthcare Network | Physiotherapy, Orthopedics & Neurology',
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
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
  category: 'Healthcare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateMedicalOrganizationSchema();

  return (
    <html lang="en" className={`${openSans.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0A192F] text-slate-100 antialiased font-sans">
        <ScrollAnimations />
        <Header />
        <main className="flex-grow pt-24 md:pt-28">{children}</main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
