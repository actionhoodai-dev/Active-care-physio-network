import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactButton from '@/components/ui/ContactButton';
import GoogleMap from '@/components/ui/GoogleMap';
import ReviewsSection from '@/components/ui/ReviewsSection';
import { getFacilities, getFacilityBySlug } from '@/lib/data';
import { generateLocalBusinessSchema } from '@/lib/schema';
import {
  Building2, MapPin, Phone, Mail, ChevronRight, CheckCircle2,
  Stethoscope, ArrowLeft, Clock, User, CalendarClock, ExternalLink, Star,
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
  if (!facility) return { title: 'Facility Not Found | Active Care Physiotherapy Centre' };
  return {
    title: `${facility.name} | ${facility.type}`,
    description: facility.description.slice(0, 160),
    openGraph: {
      title: `${facility.name} - Active Care Physiotherapy Centre`,
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
  const mapsUrl =
    facility.google_maps_url ||
    facility.google_business_url ||
    `https://maps.google.com/?q=${encodeURIComponent(facility.address || facility.name)}`;

  return (
    <div className="py-10 bg-[#0A192F] text-slate-100 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-slate-400 font-[var(--font-body)]">
            <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/our-network" className="hover:text-[#38BDF8] transition-colors">Our Network</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">{facility.name}</span>
          </nav>
          <Link href="/our-network" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] hover:underline font-[var(--font-body)]">
            <ArrowLeft className="w-4 h-4" /> Back to Facilities
          </Link>
        </div>

        {/* Header Banner */}
        <div className="bg-[#0F2440] text-white rounded-3xl border border-[rgba(100,200,255,0.12)] overflow-hidden shadow-xl mb-10 p-8 sm:p-10" data-animate="fade">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="badge bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
                {facility.type}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
                {facility.name}
              </h1>
              {facility.tagline && (
                <p className="text-lg font-bold text-[#F59E0B] italic font-[var(--font-heading)]">&ldquo;{facility.tagline}&rdquo;</p>
              )}
              {facility.doctor_name && (
                <p className="flex items-center gap-2 text-sm text-slate-300 font-medium font-[var(--font-body)]">
                  <User className="w-4 h-4 text-[#38BDF8]" />
                  Specialist: <strong className="text-white">{facility.doctor_name}</strong>
                </p>
              )}
              {facility.address && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8] transition-colors font-medium font-[var(--font-body)] group"
                  title="Open location on Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="underline decoration-dotted underline-offset-4">{facility.address}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8] opacity-70 shrink-0" />
                </a>
              )}
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent text-sm font-bold justify-center !py-3 !px-5 shadow-lg"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
              {facility.google_review_url && (
                <a
                  href={facility.google_review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#FCD34D] border border-[#F59E0B]/50 hover:border-[#F59E0B] font-bold text-sm shadow-lg transition-all"
                  id="facility-google-review"
                >
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>Review on Google</span>
                </a>
              )}
              <ContactButton websiteUrl={facility.website_url} googleBusinessUrl={facility.google_business_url} size="lg" className="shadow-lg" />
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        {facility.stats && facility.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" data-animate="fade">
            {facility.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#112240] rounded-2xl p-5 border border-[rgba(100,200,255,0.08)] shadow-sm text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-[#38BDF8]">{stat.value}</p>
                <p className="text-xs font-bold text-slate-300 font-[var(--font-body)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-[#112240] rounded-2xl p-6 sm:p-8 border border-[rgba(100,200,255,0.08)] shadow-sm space-y-4" data-animate="fade">
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#38BDF8]" /> Clinic Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-base font-[var(--font-body)]">{facility.description}</p>
            </div>

            {/* Services */}
            {facility.services && facility.services.length > 0 && (
              <div className="bg-[#112240] rounded-2xl p-6 sm:p-8 border border-[rgba(100,200,255,0.08)] shadow-sm space-y-4" data-animate="fade">
                <h2 className="text-xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#38BDF8]" /> Services &amp; Specialties
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {facility.services.map((service) => (
                    <div key={service.id} className="p-4 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.08)] flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-bold text-sm text-white font-[var(--font-body)]">{service.name}</h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-[var(--font-body)]">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opening Hours */}
            {facility.opening_hours && (
              <div className="bg-[#112240] rounded-2xl p-6 sm:p-8 border border-[rgba(100,200,255,0.08)] shadow-sm space-y-4" data-animate="fade">
                <h2 className="text-xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#38BDF8]" /> Opening Hours
                </h2>
                {facility.flexible_hours && (
                  <div className="p-4 rounded-xl bg-[#92400E]/20 border border-[#F59E0B]/30 flex items-start gap-3">
                    <CalendarClock className="w-5 h-5 text-[#F59E0B] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#FCD34D] font-medium font-[var(--font-body)]">{facility.flexible_hours}</p>
                  </div>
                )}
                <div className="divide-y divide-[rgba(100,200,255,0.08)]">
                  {dayOrder.map((day) => {
                    const hours = facility.opening_hours![day];
                    const isWeekend = day === 'sunday';
                    return (
                      <div key={day} className={`flex items-center justify-between py-3 ${isWeekend ? 'font-bold' : ''}`}>
                        <span className={`text-sm font-bold capitalize font-[var(--font-body)] ${isWeekend ? 'text-[#F59E0B]' : 'text-slate-200'}`}>{day}</span>
                        <span className={`text-sm font-[var(--font-body)] ${isWeekend ? 'text-[#F59E0B] font-bold' : 'text-slate-400'}`}>{hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map & Address Block */}
            {facility.address && (
              <div className="bg-[#112240] rounded-2xl p-6 sm:p-8 border border-[rgba(100,200,255,0.08)] shadow-sm space-y-4" data-animate="fade">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#38BDF8]" /> Location &amp; Directions
                  </h2>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F59E0B] hover:text-[#38BDF8] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Open in Google Maps Application</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-slate-300 font-[var(--font-body)]">
                  Address:{' '}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#38BDF8] underline decoration-dotted transition-colors"
                  >
                    {facility.address}
                  </a>
                </p>
                <GoogleMap address={facility.address} embedUrl={facility.map_embed_url} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6" data-animate="scale">
            <div className="bg-[#112240] rounded-2xl p-6 border border-[rgba(100,200,255,0.08)] shadow-sm space-y-5">
              <h3 className="text-lg font-bold font-[var(--font-heading)] text-white border-b border-[rgba(100,200,255,0.08)] pb-3">
                Contact &amp; Location Details
              </h3>
              <div className="space-y-4">
                {facility.doctor_name && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Specialist</p>
                      <p className="text-sm font-bold text-white">{facility.doctor_name}</p>
                    </div>
                  </div>
                )}
                {facility.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                      <a href={`tel:${facility.phone}`} className="text-sm font-bold text-slate-200 hover:text-[#38BDF8] transition-colors block">{facility.phone}</a>
                      {facility.phone_secondary && (
                        <a href={`tel:${facility.phone_secondary}`} className="text-sm font-bold text-slate-200 hover:text-[#38BDF8] transition-colors block">{facility.phone_secondary}</a>
                      )}
                    </div>
                  </div>
                )}
                {facility.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                      <a href={`mailto:${facility.email}`} className="text-sm font-bold text-slate-200 hover:text-[#38BDF8] transition-colors break-all">{facility.email}</a>
                    </div>
                  </div>
                )}
                {facility.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" />
                    <div className="font-[var(--font-body)]">
                      <p className="text-xs text-slate-400 font-bold uppercase">Location Map Address</p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-300 hover:text-white leading-snug underline decoration-dotted block transition-colors"
                        title="Click to open in Google Maps"
                      >
                        {facility.address}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-[rgba(100,200,255,0.08)] space-y-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#0284C7]/20 text-xs font-bold text-[#F59E0B] hover:text-white border border-[#F59E0B]/30 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4 text-[#F59E0B]" />
                  <span>Open Google Maps Location</span>
                </a>
                <ContactButton websiteUrl={facility.website_url} googleBusinessUrl={facility.google_business_url} size="md" className="w-full justify-center" />
              </div>
            </div>

            <div className="bg-[#0F2440] rounded-2xl p-6 text-white space-y-3 shadow-md border border-[rgba(100,200,255,0.12)]">
              <div className="w-10 h-10 rounded-xl bg-[#0284C7] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-base font-[var(--font-heading)]">Active Care Network Partner</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-[var(--font-body)]">
                This clinic operates under the Active Care Physiotherapy Centre network umbrella.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Google Patient Reviews for Active Care */}
        {facility.slug === 'active-care-physiotherapy-center' && (
          <div className="mt-16">
            <ReviewsSection />
          </div>
        )}
      </div>
    </div>
  );
}
