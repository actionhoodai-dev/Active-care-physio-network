import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceCard from '@/components/ui/ServiceCard';
import { getServices } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Services & Specialties | Physiotherapy, Orthopedics, Neurology | Velachery & Medavakkam, Chennai',
  description:
    'Complete directory of medical services at Active Care Physiotherapy Centre — Physiotherapy, Sports Injury Rehabilitation, Orthopedic Surgery, Joint Replacement, Spine Care, Trauma Care, Neurology, Diabetes Management. Serving Velachery, Medavakkam & Chennai.',
  keywords: [
    'physiotherapy services Velachery Chennai',
    'orthopedic services Medavakkam Chennai',
    'sports injury rehabilitation Chennai',
    'back pain treatment Velachery',
    'joint replacement surgery Medavakkam',
    'arthritis treatment Velachery',
    'neurology clinic Velachery',
    'diabetes clinic Velachery Chennai',
    'spine care Chennai',
    'trauma care Medavakkam',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Medical Services | Active Care Physiotherapy Centre',
    description: 'Physiotherapy, orthopedics, neurology & diabetes services across Velachery & Medavakkam, Chennai.',
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-12 md:py-20 bg-[#0A192F] text-slate-100 min-h-screen">
      <div className="container-custom">
        {/* Dark Banner */}
        <div className="bg-[#0F2440] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-[rgba(100,200,255,0.12)]" data-animate="fade">
          <div className="max-w-2xl space-y-4">
            <span className="badge bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
              Medical Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
              Services &amp; Specialties
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-[var(--font-body)]">
              From advanced joint rehabilitation and orthopedic surgery to neurological disease care and diabetes management at Active Care Physiotherapy Centre.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              description={service.description}
              slug={service.slug}
              index={idx}
            />
          ))}
        </div>

        {/* Callout Card */}
        <div className="bg-[#112240] rounded-3xl p-8 border border-[rgba(100,200,255,0.12)] shadow-xl text-center max-w-3xl mx-auto space-y-4" data-animate="scale">
          <h2 className="text-2xl font-bold font-[var(--font-heading)] text-white">
            Looking for a specific clinic offering these services?
          </h2>
          <p className="text-slate-300 text-sm font-[var(--font-body)]">
            View our network directory to find contact numbers, addresses, and website links for each location.
          </p>
          <div className="pt-2">
            <Link href="/our-network" className="btn-primary">
              View Healthcare Facilities Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
