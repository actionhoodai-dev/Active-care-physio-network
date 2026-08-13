'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MapPin } from 'lucide-react';
import { seedFacilities } from '@/lib/seed-data';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Network', href: '/our-network' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-[rgba(100,200,255,0.08)] shadow-md">
      {/* 1. TOP LOCATION BANNER */}
      <div className="bg-[#060F1E] border-b border-[rgba(100,200,255,0.08)] py-2 px-4 text-xs font-[var(--font-body)] overflow-hidden">
        <div className="container-custom flex items-center gap-4">
          <div className="flex items-center gap-1.5 shrink-0 text-[#F59E0B] font-bold uppercase tracking-wide text-[0.7rem] bg-[#060F1E] z-10 pr-2">
            <MapPin className="w-3.5 h-3.5 shrink-0 animate-bounce" />
            <span>Clinic Locations:</span>
          </div>

          <div className="marquee-container no-scrollbar flex-grow">
            <div className="marquee-content">
              {/* List 1 */}
              <div className="flex items-center gap-12">
                {seedFacilities.map((facility) => {
                  const mapsUrl =
                    facility.google_maps_url ||
                    facility.google_business_url ||
                    `https://maps.google.com/?q=${encodeURIComponent(facility.address || facility.name)}`;

                  return (
                    <a
                      key={`${facility.slug}-1`}
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-slate-300 hover:text-white font-bold transition-colors text-[0.75rem] whitespace-nowrap group"
                      title={`Open ${facility.name} location on Google Maps`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#F59E0B] group-hover:text-[#38BDF8] transition-colors shrink-0" />
                      <span>{facility.name}</span>
                      {facility.city && (
                        <span className="text-[0.65rem] text-slate-500 font-normal hidden lg:inline">
                          ({facility.city})
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Duplicate List 2 for seamless infinite scroll */}
              <div className="flex items-center gap-12">
                {seedFacilities.map((facility) => {
                  const mapsUrl =
                    facility.google_maps_url ||
                    facility.google_business_url ||
                    `https://maps.google.com/?q=${encodeURIComponent(facility.address || facility.name)}`;

                  return (
                    <a
                      key={`${facility.slug}-2`}
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-slate-300 hover:text-white font-bold transition-colors text-[0.75rem] whitespace-nowrap group"
                      title={`Open ${facility.name} location on Google Maps`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#F59E0B] group-hover:text-[#38BDF8] transition-colors shrink-0" />
                      <span>{facility.name}</span>
                      {facility.city && (
                        <span className="text-[0.65rem] text-slate-500 font-normal hidden lg:inline">
                          ({facility.city})
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="header-logo">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-[#0284C7] transition-all">
              <img src="/logo.png" alt="Activecare Physiotherapy Emblem" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold font-[var(--font-heading)] text-white leading-tight">
                Activecare
              </span>
              <span className="text-[0.55rem] md:text-[0.6rem] font-bold text-[#0284C7] tracking-wider uppercase leading-none font-[var(--font-body)]">
                Physiotherapy &amp; Sports Injury
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-[0.9375rem] font-bold text-slate-300 hover:text-white hover:bg-[#112240] rounded-lg transition-all duration-200 font-[var(--font-body)]"
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#112240] transition-colors"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0F2440] border-t border-[rgba(100,200,255,0.08)] px-6 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-[0.9375rem] font-bold text-slate-300 hover:text-white hover:bg-[#112240] rounded-lg transition-all font-[var(--font-body)]"
              id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

