import Link from 'next/link';
import { ArrowRight, ShieldCheck, Building2, Globe, MapPin, Phone, Clock, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[#0F2440] text-slate-100 pt-12 pb-20 md:pt-16 md:pb-24 border-b border-[rgba(100,200,255,0.08)] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0284C7]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — Main Hub Introduction */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left" data-animate="fade">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#112240] border border-[#0284C7]/30 text-xs font-bold text-[#38BDF8] uppercase tracking-wide font-[var(--font-body)]">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Central Hospital Hub &amp; Mother Organization</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
              Active Care <br className="hidden sm:inline" />
              <span className="text-[#38BDF8]">Physiotherapy Centre</span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-[#F59E0B] italic font-[var(--font-heading)]">
              &ldquo;Your Pain Stops Here&rdquo;
            </p>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-[var(--font-body)]">
              A fully equipped center for effective physiotherapy treatments led by <strong className="text-white">Dr. Senthil Nathan</strong>. World-class physiotherapy at clinic, home, or online — choose what works for you! We also operate 2 branch clinics: <strong className="text-white">DR. PAUL&apos;S ORTHO CLINIC</strong> and <strong className="text-white">Arunai Clinic</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://activecarephysio.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base font-bold !py-3.5 !px-7"
                id="hero-main-website"
              >
                <Globe className="w-5 h-5" />
                Visit Official Website
              </a>
              <Link
                href="/our-network"
                className="btn-secondary text-base font-bold !py-3.5 !px-7"
                id="hero-explore-network"
              >
                Browse All 3 Clinics
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Contact Strip */}
            <div className="pt-6 border-t border-[rgba(100,200,255,0.08)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-3.5 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.08)] shadow-sm flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                <div className="text-xs font-[var(--font-body)]">
                  <p className="font-bold text-white">Phone Lines</p>
                  <p className="text-slate-300 mt-0.5">+91 9884308186</p>
                  <p className="text-slate-300">+91 88389 39754</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.08)] shadow-sm flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div className="text-xs font-[var(--font-body)]">
                  <p className="font-bold text-white">Mon – Sat Hours</p>
                  <p className="text-slate-300 mt-0.5">10 AM – 1 PM</p>
                  <p className="text-slate-300">4 PM – 8 PM</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.08)] shadow-sm flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <div className="text-xs font-[var(--font-body)]">
                  <p className="font-bold text-white">Location</p>
                  <p className="text-slate-300 mt-0.5">Velachery, Chennai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Ecosystem Card */}
          <div className="lg:col-span-5" data-animate="scale">
            <div className="bg-[#112240] rounded-3xl p-7 shadow-xl border border-[rgba(100,200,255,0.12)] space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3.5 border-b border-[rgba(100,200,255,0.08)] pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-[var(--font-heading)] leading-tight">
                    Healthcare Ecosystem
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5 font-[var(--font-body)]">1 Parent Hub + 2 Branch Clinics</p>
                </div>
              </div>

              {/* Clinic Cards */}
              <div className="space-y-3.5">
                {/* Hub Clinic */}
                <div className="p-4 rounded-2xl bg-[#0A192F] border border-[#0284C7]/40 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="badge bg-[#0284C7] text-white text-[0.65rem] font-bold">PARENT HUB</span>
                    <div className="flex items-center gap-2">
                      <a href="https://maps.google.com/?q=Active+Care+Physiotherapy+Center,+Velachery,+Chennai" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#F59E0B] hover:underline flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Map Location
                      </a>
                      <a href="https://activecarephysio.in/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#38BDF8] hover:underline flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" /> Site
                      </a>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-white">Active Care Physiotherapy Centre</h3>
                  <p className="text-xs text-slate-300">Led by Dr. Senthil Nathan · 15+ Years Experience · 5000+ Patients</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3 text-[#38BDF8]" /> +91 9884308186 / +91 88389 39754</p>
                </div>

                {/* Branch 1 */}
                <div className="p-4 rounded-2xl bg-[#0A192F]/60 border border-[rgba(100,200,255,0.08)] space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="badge bg-[#D97706] text-white text-[0.65rem] font-bold">SPECIALTY BRANCH</span>
                    <div className="flex items-center gap-2">
                      <a href="https://maps.google.com/?q=DR.PAUL%27S+ORTHO+CLINIC,+Medavakkam,+Chennai" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#F59E0B] hover:underline flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Map Location
                      </a>
                      <a href="https://drpaulsorthoclinic.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#38BDF8] hover:underline flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" /> Site
                      </a>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-white">DR. PAUL&apos;S ORTHO CLINIC</h3>
                  <p className="text-xs text-slate-300">Orthopedic surgery, fracture care, joint replacement &amp; spine therapy.</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3 text-[#F59E0B]" /> +91 8838939754 / +91 9344674737</p>
                </div>

                {/* Branch 2 */}
                <div className="p-4 rounded-2xl bg-[#0A192F]/60 border border-[rgba(100,200,255,0.08)] space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="badge bg-[#0D9488] text-white text-[0.65rem] font-bold">NEUROLOGY BRANCH</span>
                    <div className="flex items-center gap-2">
                      <a href="https://maps.app.goo.gl/adgaBELxiT8XLhxRA" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#F59E0B] hover:underline flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Map Location
                      </a>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-white">Arunai Clinic</h3>
                  <p className="text-xs text-slate-300">Neurological diseases, diabetes management &amp; outpatient care.</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3 text-[#2DD4BF]" /> +91 9884122274</p>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-[rgba(100,200,255,0.08)]">
                <Link href="/our-network" className="text-xs text-[#38BDF8] font-bold hover:underline inline-flex items-center gap-1 font-[var(--font-body)]">
                  View Full Pages, Maps &amp; Contact Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 pt-8 border-t border-[rgba(100,200,255,0.08)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center" data-animate="fade">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold font-[var(--font-heading)] text-white">15+</p>
            <p className="text-xs text-slate-400 font-bold font-[var(--font-body)]">Years of Experience</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <p className="text-3xl sm:text-4xl font-extrabold font-[var(--font-heading)] text-[#F59E0B]">5</p>
              <Star className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
            </div>
            <p className="text-xs text-slate-400 font-bold font-[var(--font-body)]">Star Rated Physiotherapist</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold font-[var(--font-heading)] text-[#2DD4BF]">5,000+</p>
            <p className="text-xs text-slate-400 font-bold font-[var(--font-body)]">Happy Patients Treated</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold font-[var(--font-heading)] text-[#38BDF8]">800+</p>
            <p className="text-xs text-slate-400 font-bold font-[var(--font-body)]">New Visits Every Year</p>
          </div>
        </div>
      </div>
    </section>
  );
}
