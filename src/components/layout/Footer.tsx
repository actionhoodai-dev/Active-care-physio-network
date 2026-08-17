import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { seedFacilities } from '@/lib/seed-data';

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] text-white border-t border-[rgba(100,200,255,0.08)]" id="footer">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200">
                <img src="/logo.png" alt="Active Care Emblem" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-[var(--font-heading)] leading-tight text-white">
                  Active Care
                </span>
                <span className="text-[0.6rem] font-bold text-sky-400 tracking-wider uppercase leading-none font-[var(--font-body)]">
                  Physiotherapy Centre
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed mt-4 font-[var(--font-body)]">
              A fully equipped center for effective physiotherapy treatments led by Dr. Senthil Nathan. World-class physiotherapy at clinic, home, or online.
            </p>
            <p className="text-sm font-bold text-amber-400 italic mt-3 font-[var(--font-heading)]">&ldquo;Your Pain Stops Here&rdquo;</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-[var(--font-heading)] uppercase tracking-wider text-slate-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-[var(--font-body)]">
              {[
                { name: 'Home', href: '/' },
                { name: 'Our Network', href: '/our-network' },
                { name: 'Services', href: '/services' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-300 hover:text-amber-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Clinics with Location & Maps Links */}
          <div>
            <h4 className="text-sm font-bold font-[var(--font-heading)] uppercase tracking-wider text-slate-300 mb-4">
              Our Branch Locations
            </h4>
            <ul className="space-y-4 font-[var(--font-body)]">
              {seedFacilities.map((facility) => {
                const mapsUrl =
                  facility.google_maps_url ||
                  facility.google_business_url ||
                  `https://maps.google.com/?q=${encodeURIComponent(facility.address || facility.name)}`;

                return (
                  <li key={facility.slug} className="space-y-1">
                    <Link
                      href={`/facility/${facility.slug}`}
                      className="text-sm text-slate-200 hover:text-amber-400 transition-colors block font-bold"
                    >
                      {facility.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 hover:underline inline-flex items-center gap-1 font-semibold"
                        title={`Open ${facility.name} on Google Maps`}
                      >
                        <MapPin className="w-3.5 h-3.5" /> Google Maps Location
                      </a>
                      {facility.website_url && (
                        <a
                          href={facility.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:underline inline-flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" /> Website
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Central Hub Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-[var(--font-heading)] uppercase tracking-wider text-slate-300 mb-4">
              Central Hub Contact
            </h4>
            <ul className="space-y-3 font-[var(--font-body)]">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+919884308186" className="text-sm text-slate-200 hover:text-white block font-bold">+91 9884308186</a>
                  <a href="tel:+918838939754" className="text-sm text-slate-200 hover:text-white block font-bold">+91 88389 39754</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <a href="mailto:ActiveCarePhysio22@gmail.com" className="text-sm text-slate-300 hover:text-white break-all">
                  ActiveCarePhysio22@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <a
                  href="https://maps.google.com/?q=Active+Care+Physiotherapy+Center,+Velachery,+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-300 hover:text-amber-400 transition-colors group"
                  title="Open on Google Maps"
                >
                  <MapPin className="w-4 h-4 text-amber-400 group-hover:scale-110 mt-0.5 shrink-0 transition-transform" />
                  <span className="text-sm leading-snug underline decoration-dotted">
                    938, MIG 938, 1st Main Rd, near Lakshmi super market, TNHB Colony, Velachery, Chennai, Tamil Nadu 600042
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div className="text-sm text-slate-300">
                  <p>Mon–Sat: 10 AM – 1 PM, 4 PM – 8 PM</p>
                  <p className="text-amber-400 font-bold">Sun: By Prior Appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 font-[var(--font-body)]">
            © {new Date().getFullYear()} Active Care Physiotherapy Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-[var(--font-body)]">
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
