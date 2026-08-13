import Link from 'next/link';
import ServiceCard from '@/components/ui/ServiceCard';
import { getServices } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Services Directory | Activecare Healthcare Network',
  description: 'Explore all specialized medical and rehabilitation categories offered across Activecare Healthcare Network facilities.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-12 md:py-20 bg-[#F8FAFC] min-h-screen">
      <div className="container-custom">
        {/* Solid Banner */}
        <div className="bg-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-[#1E3A8A]">
          <div className="max-w-2xl space-y-4">
            <span className="badge bg-white text-[#0F2C59] text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
              Medical Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
              Services &amp; Specialties
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-[var(--font-body)]">
              From advanced joint rehabilitation and orthopedic surgery to neurological disease care and diabetes management.
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
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold font-[var(--font-heading)] text-[#0F2C59]">
            Looking for a specific clinic offering these services?
          </h2>
          <p className="text-slate-600 text-sm font-[var(--font-body)]">
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
