import type { Metadata } from 'next';
import { Open_Sans, Lora } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
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
  title: {
    default: 'Activecare Physiotherapy & Healthcare Network',
    template: '%s | Activecare Healthcare Network',
  },
  description:
    'Activecare Healthcare Network connects Activecare Physiotherapy & Sports Injury Clinic, DR. PAUL\'S ORTHO CLINIC, and Arunai Clinic under one umbrella.',
  keywords: [
    'Activecare Physiotherapy & Sports Injury Clinic',
    'Dr Paul Ortho Clinic',
    'Arunai Clinic',
    'Dr Senthil Nathan Physiotherapy',
    'Dr Paul Orthopedic',
    'Tiruvannamalai Healthcare',
  ],
  authors: [{ name: 'Activecare Healthcare Network' }],
  openGraph: {
    title: 'Activecare Healthcare Network | Centralized Hospital Hub',
    description:
      'Centralized parent healthcare portal connecting clinics, specialty centers, and medical facilities.',
    url: 'https://activecarephysio.in',
    siteName: 'Activecare Healthcare Network',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased font-sans">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
