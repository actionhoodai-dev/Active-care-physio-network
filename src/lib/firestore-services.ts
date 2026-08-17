import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { seedServices } from '@/lib/seed-data';
import type { Service } from '@/lib/types/database';

const SERVICES_COLLECTION = 'services';

export async function getAdminServices(): Promise<Service[]> {
  if (!db || !isFirebaseConfigured()) {
    return seedServices.map((s, i) => ({
      ...s,
      id: `service-${i + 1}`,
      created_at: new Date().toISOString(),
    }));
  }

  try {
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const snapshot = await getDocs(servicesRef);

    if (snapshot.empty) {
      return seedServices.map((s, i) => ({
        ...s,
        id: `service-${i + 1}`,
        created_at: new Date().toISOString(),
      }));
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        icon: data.icon || undefined,
        created_at: data.created_at?.toDate?.()?.toISOString?.() || new Date().toISOString(),
      } as Service;
    }).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  } catch (error) {
    console.error('Error fetching services from Firestore:', error);
    return seedServices.map((s, i) => ({
      ...s,
      id: `service-${i + 1}`,
      created_at: new Date().toISOString(),
    }));
  }
}

export async function getAdminServiceById(id: string): Promise<Service | null> {
  if (!db || !isFirebaseConfigured()) {
    const fallback = seedServices.find((_, i) => `service-${i + 1}` === id || _.slug === id);
    if (!fallback) return null;
    return {
      ...fallback,
      id,
      created_at: new Date().toISOString(),
    };
  }

  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name || '',
      slug: data.slug || '',
      description: data.description || '',
      icon: data.icon || undefined,
      created_at: data.created_at?.toDate?.()?.toISOString?.() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    return null;
  }
}

export async function createAdminService(service: {
  name: string;
  slug: string;
  description: string;
  icon?: string;
}): Promise<string> {
  if (!db || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please add your Firebase environment variables.');
  }

  const docId = service.slug.trim().toLowerCase().replace(/\s+/g, '-');
  const docRef = doc(db, SERVICES_COLLECTION, docId);

  await setDoc(docRef, {
    ...service,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });

  return docId;
}

export async function updateAdminService(
  id: string,
  service: {
    name: string;
    slug: string;
    description: string;
    icon?: string;
  }
): Promise<void> {
  if (!db || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please add your Firebase environment variables.');
  }

  const docRef = doc(db, SERVICES_COLLECTION, id);
  await updateDoc(docRef, {
    ...service,
    updated_at: serverTimestamp(),
  });
}

export async function deleteAdminService(id: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please add your Firebase environment variables.');
  }

  const docRef = doc(db, SERVICES_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function seedInitialServicesToFirestore(): Promise<number> {
  if (!db || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please add your Firebase environment variables.');
  }

  let count = 0;
  for (const s of seedServices) {
    const docId = s.slug;
    const docRef = doc(db, SERVICES_COLLECTION, docId);
    await setDoc(docRef, {
      name: s.name,
      slug: s.slug,
      description: s.description,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    }, { merge: true });
    count++;
  }

  return count;
}
