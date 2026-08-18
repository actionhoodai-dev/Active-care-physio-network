import { seedFacilities, seedServices, seedFacilityServices } from '@/lib/seed-data';
import { getAdminServices } from '@/lib/firestore-services';
import { getAdminFacilities, getAdminFacilityBySlug as fetchAdminFacilityBySlug } from '@/lib/firestore-facilities';
import type { Facility, Service, FacilityWithServices } from '@/lib/types/database';

export async function getFacilities(): Promise<Facility[]> {
  try {
    return await getAdminFacilities();
  } catch (error) {
    console.warn('Fallback to seed facilities:', error);
    return seedFacilities.map((f, i) => ({
      ...f,
      id: `facility-${i + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }
}

export async function getFacilityBySlug(slug: string): Promise<FacilityWithServices | null> {
  let facility: Facility | null = null;
  try {
    facility = await fetchAdminFacilityBySlug(slug);
  } catch (err) {
    console.warn('Fallback fetching facility slug:', err);
  }

  if (!facility) {
    const foundSeed = seedFacilities.find((f) => f.slug === slug);
    if (!foundSeed) return null;
    facility = {
      ...foundSeed,
      id: `facility-${foundSeed.slug}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

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
