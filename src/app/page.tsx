import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import LocationsStrip from '@/components/ui/LocationsStrip';
import SectionHeading from '@/components/ui/SectionHeading';
import FacilityCard from '@/components/ui/FacilityCard';
import ServiceCard from '@/components/ui/ServiceCard';
import ContactForm from '@/components/ui/ContactForm';
import { getFacilities, getServices } from '@/lib/data';
import {
  Building2,
  CheckCircle2,
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Award,
  Users2,
  Stethoscope,
  Clock,
} from 'lucide-react';

export default async function HomePage() {
  const facilities = await getFacilities();
  const services = await getServices();

  const whyChooseUsPoints = [
    {
      title: 'Dr. Senthil Nathan — 15+ Years',
      description: 'Led by Dr. Senthil Nathan with over 15 years of clinical expertise in musculoskeletal physiotherapy and sports injury rehabilitation.',
      icon: <Stethoscope className="w-6 h-6 text-[#38BDF8]" />,
    },
    {
      title: '5-Star Rated Physiotherapy',
      description: 'Consistently rated 5-star by over 5,000 satisfied patients. Evidence-based treatment protocols with measurable recovery outcomes.',
      icon: <Award className="w-6 h-6 text-[#F59E0B]" />,
    },
    {
      title: 'Clinic, Home & Online Care',
      description: 'Flexible treatment options — visit the clinic, book a home physiotherapy session, or get professional guidance through online consultation.',
      icon: <HeartPulse className="w-6 h-6 text-[#2DD4BF]" />,
    },
    {
      title: 'Multi-Clinic Integrated Network',
      description: 'Seamless cross-referral between the main Activecare hub, DR. PAUL\'S ORTHO CLINIC for orthopedics, and Arunai Clinic for neurology & diabetes.',
      icon: <Users2 className="w-6 h-6 text-[#818CF8]" />,
    },
  ];

  return (
    <div className="space-y-0 bg-[#0A192F] text-slate-100">
      {/* 1. HERO BANNER */}
      <HeroSection />

      {/* HORIZONTAL LOCATIONS STRIP BANNER */}
      <LocationsStrip />

      {/* 2. ABOUT THE HUB */}
      <section className="py-20 bg-[#0A192F] border-b border-[rgba(100,200,255,0.08)]" id="overview">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6" data-animate="fade">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112240] border border-[#0284C7]/30 text-[#38BDF8] text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
                <Building2 className="w-4 h-4" />
                About the Hospital Hub
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white leading-tight">
                Activecare Physiotherapy &amp; Sports Injury Clinic
              </h2>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-[var(--font-body)]">
                Our experienced and clinically versatile physiotherapists are immensely knowledgeable in clinical reasoning and hypothesizing clinical impressions. We provide world-class physiotherapy at clinic, home, or online — choose what works for you!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Arthritis & Joint Therapy', desc: 'Advanced treatment for managing arthritis symptoms' },
                  { title: 'Back Pain & Spine Care', desc: 'Evidence-based protocols for chronic & acute back pain' },
                  { title: 'Balance & Fall Prevention', desc: 'Balance exercise therapy for stability & coordination' },
                  { title: 'Sports Injury Rehab', desc: 'Complete return-to-sport programs for all athletes' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-[#112240] rounded-xl border border-[rgba(100,200,255,0.08)]">
                    <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-white font-[var(--font-body)]">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-[var(--font-body)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Opening Hours */}
            <div className="lg:col-span-6" data-animate="scale">
              <div className="p-6 sm:p-8 bg-[#112240] rounded-3xl border border-[rgba(100,200,255,0.12)] shadow-xl space-y-5">
                <h3 className="text-xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#38BDF8]" />
                  Opening Hours — Active Care Main Hub
                </h3>

                <div className="p-3.5 rounded-xl bg-[#92400E]/20 border border-[#F59E0B]/30 text-sm text-[#FCD34D] font-medium font-[var(--font-body)]">
                  📅 Flexible appointments outside working hours with prior booking: <strong>7 AM – 10 AM</strong> and <strong>8 PM – 10 PM</strong> on all working days.
                </div>

                <div className="divide-y divide-[rgba(100,200,255,0.08)]">
                  {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const).map((day) => (
                    <div key={day} className="flex items-center justify-between py-3">
                      <span className="text-sm font-bold text-slate-200 font-[var(--font-body)]">{day}</span>
                      <span className="text-sm text-slate-400 font-[var(--font-body)]">10 AM – 1 PM, 4 PM – 8 PM</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-bold text-[#F59E0B] font-[var(--font-body)]">Sunday</span>
                    <span className="text-sm font-bold text-[#F59E0B] font-[var(--font-body)]">By Prior Appointment</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3 text-sm font-[var(--font-body)]">
                  <Phone className="w-4 h-4 text-[#38BDF8]" />
                  <a href="tel:+919884308186" className="font-bold text-slate-200 hover:text-[#38BDF8] transition-colors">+91 9884308186</a>
                  <span className="text-slate-600">|</span>
                  <a href="tel:+918838939754" className="font-bold text-slate-200 hover:text-[#38BDF8] transition-colors">+91 88389 39754</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FACILITIES GRID */}
      <section className="py-20 bg-[#0F2440] border-b border-[rgba(100,200,255,0.08)]" id="facilities">
        <div className="container-custom">
          <SectionHeading
            title="Our Healthcare Ecosystem"
            subtitle="Explore individual clinic profiles with phone numbers, addresses, opening hours, and official website redirect buttons."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="py-20 bg-[#0A192F] border-b border-[rgba(100,200,255,0.08)]" id="services">
        <div className="container-custom">
          <SectionHeading
            title="Treatment & Services Offered"
            subtitle="Specialized physiotherapy, orthopedic care, neurological treatment, and diabetes management across our clinic network."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                description={service.description}
                slug={service.slug}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 bg-[#0F2440] border-b border-[rgba(100,200,255,0.08)]" id="why-choose-us">
        <div className="container-custom">
          <SectionHeading
            title="Why Choose Active Care Hospital Hub"
            subtitle="Led by Dr. Senthil Nathan with 15+ years of clinical expertise and 5,000+ successfully treated patients."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsPoints.map((item, idx) => (
              <div key={idx} className="p-6 bg-[#112240] rounded-2xl border border-[rgba(100,200,255,0.08)] card-hover space-y-4" data-animate="scale">
                <div className="w-12 h-12 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.1)] flex items-center justify-center">{item.icon}</div>
                <h3 className="text-lg font-bold font-[var(--font-heading)] text-white">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-[var(--font-body)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section className="py-20 bg-[#0A192F]" id="contact">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6" data-animate="fade">
              <span className="badge bg-[#112240] text-[#38BDF8] border border-[#0284C7]/30 text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
                Direct Contact &amp; Appointments
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] leading-tight text-white">
                Contact Active Care Hospital Hub
              </h2>
              <p className="text-slate-300 text-base leading-relaxed font-[var(--font-body)]">
                Book a physiotherapy session, get an orthopedic consultation, or request a home visit. Reach us by phone or email.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Phone Lines</p>
                    <p className="text-sm font-bold text-white">+91 9884308186</p>
                    <p className="text-sm font-bold text-white">+91 88389 39754</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-sm font-bold text-white">ActiveCarePhysio22@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Main Hub Address</p>
                    <p className="text-sm font-bold text-white">938, MIG 938, 1st Main Rd, near Lakshmi super market, TamilNadu Housing Board Colony, Periyar Nagar, Velachery, Chennai, Greater Chennai, Tamil Nadu 600042</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Working Hours</p>
                    <p className="text-sm font-bold text-white">Mon – Sat: 10 AM – 1 PM, 4 PM – 8 PM</p>
                    <p className="text-sm font-medium text-[#F59E0B]">Sun: By Prior Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7" data-animate="scale">
              <div className="bg-[#112240] rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl border border-[rgba(100,200,255,0.12)]">
                <h3 className="text-xl font-bold font-[var(--font-heading)] mb-6 text-white">
                  Send a Direct Message / Book an Appointment
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
