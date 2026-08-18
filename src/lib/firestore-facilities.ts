import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { seedFacilities } from '@/lib/seed-data';
import type { Facility, OpeningHours } from '@/lib/types/database';

const FACILITIES_COLLECTION = 'facilities';

// In-memory / localStorage cache fallback when Firebase is not connected
const LOCAL_STORAGE_KEY = 'activecare_facilities_hours_cache';

function getLocalCache(): Record<string, { opening_hours: OpeningHours; flexible_hours: string | null }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setLocalCache(slug: string, opening_hours: OpeningHours, flexible_hours: string | null) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalCache();
    current[slug] = { opening_hours, flexible_hours };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save to local cache:', err);
  }
}

export async function getAdminFacilities(): Promise<Facility[]> {
  if (!db || !isFirebaseConfigured()) {
    const cache = getLocalCache();
    return seedFacilities.map((f, i) => {
      const cached = cache[f.slug];
      return {
        ...f,
        id: `facility-${i + 1}`,
        opening_hours: cached ? cached.opening_hours : f.opening_hours,
        flexible_hours: cached ? cached.flexible_hours : f.flexible_hours,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });
  }

  try {
    const facilitiesRef = collection(db, FACILITIES_COLLECTION);
    const snapshot = await getDocs(facilitiesRef);

    if (snapshot.empty) {
      return seedFacilities.map((f, i) => ({
        ...f,
        id: `facility-${i + 1}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }

    const firestoreMap = new Map<string, any>();
    snapshot.docs.forEach((docSnap) => {
      firestoreMap.set(docSnap.id, docSnap.data());
    });

    return seedFacilities.map((f, i) => {
      const firestoreData = firestoreMap.get(f.slug) || firestoreMap.get(`facility-${i + 1}`);
      if (!firestoreData) {
        return {
          ...f,
          id: `facility-${i + 1}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      return {
        ...f,
        id: f.slug,
        opening_hours: firestoreData.opening_hours || f.opening_hours,
        flexible_hours: firestoreData.flexible_hours !== undefined ? firestoreData.flexible_hours : f.flexible_hours,
        phone: firestoreData.phone || f.phone,
        email: firestoreData.email || f.email,
        created_at: firestoreData.created_at?.toDate?.()?.toISOString?.() || new Date().toISOString(),
        updated_at: firestoreData.updated_at?.toDate?.()?.toISOString?.() || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.warn('Using seed/cached facilities fallback:', (error as any)?.message || error);
    const cache = getLocalCache();
    return seedFacilities.map((f, i) => {
      const cached = cache[f.slug];
      return {
        ...f,
        id: `facility-${i + 1}`,
        opening_hours: cached ? cached.opening_hours : f.opening_hours,
        flexible_hours: cached ? cached.flexible_hours : f.flexible_hours,
        created_at: new Date().toISOString(),
      };
    });
  }
}

export async function getAdminFacilityBySlug(slug: string): Promise<Facility | null> {
  const all = await getAdminFacilities();
  return all.find((f) => f.slug === slug) || null;
}

export async function updateAdminFacilityHours(
  slug: string,
  openingHours: OpeningHours,
  flexibleHours: string | null
): Promise<void> {
  // Always update local cache first for instant client feedback
  setLocalCache(slug, openingHours, flexibleHours);

  if (!db || !isFirebaseConfigured()) {
    console.info(`Saved clinic hours for "${slug}" in local storage (Firebase not configured).`);
    return;
  }

  const docRef = doc(db, FACILITIES_COLLECTION, slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      opening_hours: openingHours,
      flexible_hours: flexibleHours,
      updated_at: serverTimestamp(),
    });
  } else {
    // Seed initial doc with updated hours
    const baseSeed = seedFacilities.find((f) => f.slug === slug);
    await setDoc(docRef, {
      ...(baseSeed || {}),
      slug,
      opening_hours: openingHours,
      flexible_hours: flexibleHours,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  }
}
