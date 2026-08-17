'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollAnimations from '@/components/ui/ScrollAnimations';

export default function PublicLayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A192F] text-slate-100 antialiased font-sans">
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <>
      <ScrollAnimations />
      <Header />
      <main className="flex-grow pt-24 md:pt-28">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
