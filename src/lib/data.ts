import { seedFacilities, seedServices, seedFacilityServices } from '@/lib/seed-data';
import { getAdminServices } from '@/lib/firestore-services';
import type { Facility, Service, FacilityWithServices } from '@/lib/types/database';

export async function getFacilities(): Promise<Facility[]> {
  return seedFacilities.map((f, i) => ({
    ...f,
    id: `facility-${i + 1}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

export async function getFacilityBySlug(slug: string): Promise<FacilityWithServices | null> {
  const foundSeed = seedFacilities.find((f) => f.slug === slug);
  if (!foundSeed) return null;

  const facility: Facility = {
    ...foundSeed,
    id: `facility-${foundSeed.slug}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const allServices = await getServices();
  const linkedServiceSlugs = seedFacilityServices
    .filter((fs) => fs.facilitySlug === slug)
    .map((fs) => fs.serviceSlug);

  const services: Service[] = allServices.filter((s) => linkedServiceSlugs.includes(s.slug));

  return { ...facility, services };
}

export async function getServices(): Promise<Service[]> {
  try {
    return await getAdminServices();
  } catch (error) {
    console.warn('Fallback to seed services:', error);
    return seedServices.map((s, i) => ({
      ...s,
      id: `service-${i + 1}`,
      created_at: new Date().toISOString(),
    }));
  }
}
