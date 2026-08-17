'use client';

import React, { useEffect, useState } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import { getAdminServices } from '@/lib/firestore-services';
import type { Service } from '@/lib/types/database';

interface LiveServicesGridProps {
  initialServices: Service[];
  gridCols?: string;
}

export default function LiveServicesGrid({
  initialServices,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}: LiveServicesGridProps) {
  const [services, setServices] = useState<Service[]>(initialServices);

  useEffect(() => {
    let isMounted = true;
    async function refreshServices() {
      try {
        const live = await getAdminServices();
        if (isMounted && live && live.length > 0) {
          setServices(live);
        }
      } catch (err) {
        console.warn('Notice loading live services:', err);
      }
    }

    refreshServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.id || service.slug || index}
          name={service.name}
          description={service.description}
          slug={service.slug}
          index={index}
        />
      ))}
    </div>
  );
}
