import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white" id="footer">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200">
                <img src="/logo.png" alt="Activecare Emblem" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-[var(--font-heading)] leading-tight text-white">
                  Activecare
                </span>
                <span className="text-[0.6rem] font-bold text-sky-400 tracking-wider uppercase leading-none font-[var(--font-body)]">
                  Physiotherapy &amp; Sports Injury
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

          {/* Our Clinics with Direct Links */}
          <div>
            <h4 className="text-sm font-bold font-[var(--font-heading)] uppercase tracking-wider text-slate-300 mb-4">
              Our Clinics
            </h4>
            <ul className="space-y-4 font-[var(--font-body)]">
              <li>
                <Link href="/facility/active-care-physiotherapy-center" className="text-sm text-slate-200 hover:text-amber-400 transition-colors block font-bold">
                  Activecare Physiotherapy
                </Link>
                <a href="https://activecarephysio.in/" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:underline flex items-center gap-1 mt-0.5">
                  <Globe className="w-3 h-3" /> activecarephysio.in
                </a>
              </li>
              <li>
                <Link href="/facility/dr-pauls-ortho-clinic" className="text-sm text-slate-200 hover:text-amber-400 transition-colors block font-bold">
                  DR. PAUL&apos;S ORTHO CLINIC
                </Link>
                <a href="https://drpaulsorthoclinic.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:underline flex items-center gap-1 mt-0.5">
                  <Globe className="w-3 h-3" /> drpaulsorthoclinic.com
                </a>
              </li>
              <li>
                <Link href="/facility/arunai-clinic" className="text-sm text-slate-200 hover:text-amber-400 transition-colors block font-bold">
                  Arunai Clinic
                </Link>
                <a href="https://maps.app.goo.gl/adgaBELxiT8XLhxRA" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mt-0.5">
                  <ExternalLink className="w-3 h-3" /> Google Business Profile
                </a>
              </li>
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
                  <a href="tel:+917092550824" className="text-sm text-slate-200 hover:text-white block font-bold">+91 7092550824</a>
                  <a href="tel:+917447447306" className="text-sm text-slate-200 hover:text-white block font-bold">+91 7447447306</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <a href="mailto:ActiveCarePhysio22@gmail.com" className="text-sm text-slate-300 hover:text-white break-all">
                  ActiveCarePhysio22@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-300">
                  No 1 Thazhambur main road, OMR, OPP to Mount literia ZEE school, Navalur, Chennai 600130
                </span>
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
            © {new Date().getFullYear()} Activecare Physiotherapy &amp; Sports Injury Clinic. All rights reserved.
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
