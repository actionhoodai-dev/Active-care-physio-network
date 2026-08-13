'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#0D9488] text-white shadow-xl border border-[rgba(100,200,255,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[#0F766E] hover:shadow-2xl hover:scale-110 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
      id="back-to-top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
