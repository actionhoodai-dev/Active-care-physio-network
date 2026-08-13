import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactButton from '@/components/ui/ContactButton';
import GoogleMap from '@/components/ui/GoogleMap';
import { getFacilities, getFacilityBySlug } from '@/lib/data';
import { generateLocalBusinessSchema } from '@/lib/schema';
import {
  Building2, MapPin, Phone, Mail, Globe, ExternalLink, ChevronRight, CheckCircle2,
  Stethoscope, ArrowLeft, Clock, User, CalendarClock, IndianRupee,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const facilities = await getFacilities();
  return facilities.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);
  if (!facility) return { title: 'Facility Not Found | Activecare Healthcare Network' };
  return {
    title: `${facility.name} | ${facility.type}`,
    description: facility.description.slice(0, 160),
    openGraph: {
      title: `${facility.name} - Activecare Healthcare Network`,
      description: facility.description.slice(0, 160),
      images: facility.cover_image_url ? [facility.cover_image_url] : [],
    },
  };
}

export default async function FacilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);
  if (!facility) notFound();

  const localBusinessSchema = generateLocalBusinessSchema(facility);
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  return (
    <div className="py-10 bg-[#F8FAFC] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-[var(--font-body)]">
            <Link href="/" className="hover:text-[#0284C7] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/our-network" className="hover:text-[#0284C7] transition-colors">Our Network</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0F2C59] font-bold truncate max-w-[200px] sm:max-w-none">{facility.name}</span>
          </nav>
          <Link href="/our-network" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:underline font-[var(--font-body)]">
            <ArrowLeft className="w-4 h-4" /> Back to Facilities
          </Link>
        </div>

        {/* Header Banner */}
        <div className="bg-[#0F2C59] text-white rounded-3xl border border-[#1E3A8A] overflow-hidden shadow-xl mb-10 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="badge bg-white text-[#0F2C59] text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
                {facility.type}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
                {facility.name}
              </h1>
              {facility.tagline && (
                <p className="text-lg font-bold text-[#FCD34D] italic font-[var(--font-heading)]">&ldquo;{facility.tagline}&rdquo;</p>
              )}
              {facility.doctor_name && (
                <p className="flex items-center gap-2 text-sm text-blue-100 font-medium font-[var(--font-body)]">
                  <User className="w-4 h-4 text-[#FCD34D]" />
                  Lead Doctor: <strong>{facility.doctor_name}</strong>
                </p>
              )}
              {facility.address && (
                <p className="flex items-center gap-2 text-sm text-blue-100 font-medium font-[var(--font-body)]">
                  <MapPin className="w-4 h-4 text-[#FCD34D] shrink-0" />
                  {facility.address}
                </p>
              )}
            </div>
            <div className="shrink-0">
              <ContactButton websiteUrl={facility.website_url} googleBusinessUrl={facility.google_business_url} size="lg" className="shadow-lg" />
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        {facility.stats && facility.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {facility.stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-[#0F2C59]">{stat.value}</p>
                <p className="text-xs font-bold text-slate-600 font-[var(--font-body)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0284C7]" /> Clinic Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-base font-[var(--font-body)]">{facility.description}</p>
            </div>

            {/* Consultation Fees */}
            {facility.consultations && facility.consultations.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59] flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-[#0284C7]" /> Online Appointments & Fees
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {facility.consultations.map((option, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-base text-[#0F2C59] font-[var(--font-heading)]">{option.title}</h3>
                          <span className="badge bg-[#0F2C59] text-white text-xs font-bold">{option.fee}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 font-[var(--font-body)]">{option.duration}</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-[var(--font-body)]">{option.description}</p>
                      </div>
                      <a href={facility.website_url || '#contact'} target="_blank" rel="noopener noreferrer" className="btn-accent text-xs font-bold justify-center !py-2.5">
                        BOOK CONSULTATION ({option.fee})
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {facility.services && facility.services.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59] flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#0284C7]" /> Services & Specialties
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {facility.services.map((service) => (
                    <div key={service.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-bold text-sm text-[#0F2C59] font-[var(--font-body)]">{service.name}</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed font-[var(--font-body)]">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opening Hours */}
            {facility.opening_hours && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0284C7]" /> Opening Hours
                </h2>
                {facility.flexible_hours && (
                  <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3">
                    <CalendarClock className="w-5 h-5 text-[#D97706] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#92400E] font-medium font-[var(--font-body)]">{facility.flexible_hours}</p>
                  </div>
                )}
                <div className="divide-y divide-slate-200">
                  {dayOrder.map((day) => {
                    const hours = facility.opening_hours![day];
                    const isWeekend = day === 'sunday';
                    return (
                      <div key={day} className={`flex items-center justify-between py-3 ${isWeekend ? 'font-bold' : ''}`}>
                        <span className={`text-sm font-bold capitalize font-[var(--font-body)] ${isWeekend ? 'text-[#D97706]' : 'text-[#0F2C59]'}`}>{day}</span>
                        <span className={`text-sm font-[var(--font-body)] ${isWeekend ? 'text-[#D97706] font-bold' : 'text-slate-600'}`}>{hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map */}
            {facility.address && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0284C7]" /> Location & Directions
                </h2>
                <p className="text-sm text-slate-600 font-[var(--font-body)]">
                  Address: <strong className="text-[#0F2C59]">{facility.address}</strong>
                </p>
                <GoogleMap address={facility.address} embedUrl={facility.map_embed_url} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-lg font-bold font-[var(--font-heading)] text-[#0F2C59] border-b border-slate-200 pb-3">
                Contact Details
              </h3>
              <div className="space-y-4">
                {facility.doctor_name && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-[#0284C7] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Lead Specialist</p>
                      <p className="text-sm font-bold text-[#0F2C59]">{facility.doctor_name}</p>
                    </div>
                  </div>
                )}
                {facility.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#0284C7] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                      <a href={`tel:${facility.phone}`} className="text-sm font-bold text-[#0F2C59] hover:text-[#0284C7] block">{facility.phone}</a>
                      {facility.phone_secondary && (
                        <a href={`tel:${facility.phone_secondary}`} className="text-sm font-bold text-[#0F2C59] hover:text-[#0284C7] block">{facility.phone_secondary}</a>
                      )}
                    </div>
                  </div>
                )}
                {facility.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#0284C7] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                      <a href={`mailto:${facility.email}`} className="text-sm font-bold text-[#0F2C59] hover:text-[#0284C7] break-all">{facility.email}</a>
                    </div>
                  </div>
                )}
                {facility.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#0284C7] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Address</p>
                      <p className="text-sm font-medium text-slate-700 leading-snug">{facility.address}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-500 font-[var(--font-body)]">Official Redirect:</p>
                <ContactButton websiteUrl={facility.website_url} googleBusinessUrl={facility.google_business_url} size="md" className="w-full justify-center" />
              </div>
            </div>

            <div className="bg-[#0A192F] rounded-2xl p-6 text-white space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#BAE6FD]" />
              </div>
              <h4 className="font-bold text-base font-[var(--font-heading)]">Activecare Network Partner</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-[var(--font-body)]">
                This clinic operates under the Activecare Healthcare Network umbrella.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
