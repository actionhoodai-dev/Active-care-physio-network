'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Network', href: '/our-network' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="header-logo">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-[#0284C7] transition-all">
              <img src="/logo.png" alt="Activecare Physiotherapy Emblem" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-[var(--font-heading)] text-[#0F2C59] leading-tight">
                Activecare
              </span>
              <span className="text-[0.6rem] font-bold text-[#0284C7] tracking-wider uppercase leading-none font-[var(--font-body)]">
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
                className="px-4 py-2 text-[0.9375rem] font-bold text-[#334155] hover:text-[#0F2C59] hover:bg-slate-100 rounded-lg transition-all duration-200 font-[var(--font-body)]"
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#0F2C59]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0F2C59]" />
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
        <div className="bg-white border-t border-slate-200 px-6 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-[0.9375rem] font-bold text-[#334155] hover:text-[#0F2C59] hover:bg-slate-100 rounded-lg transition-all font-[var(--font-body)]"
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
