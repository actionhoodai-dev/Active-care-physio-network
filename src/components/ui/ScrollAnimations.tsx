'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Re-observe on route changes (for Next.js SPA navigation)
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
          }
        );

        const elements = document.querySelectorAll('[data-animate]:not(.animate-visible)');
        elements.forEach((el) => observer.observe(el));
      }, 100);
    };

    // MutationObserver to detect DOM changes (SPA navigation)
    const mutationObserver = new MutationObserver(() => {
      handleRouteChange();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => mutationObserver.disconnect();
  }, []);

  return null;
}
