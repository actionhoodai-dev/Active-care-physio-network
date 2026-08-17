export interface ConsultationOption {
  title: string;
  duration?: string;
  fee?: string;
  description: string;
}

export interface Facility {
  id: string;
  name: string;
  slug: string;
  type: string;
  tagline: string | null;
  description: string;
  website_url: string | null;
  google_business_url: string | null;
  phone: string | null;
  phone_secondary: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  doctor_name: string | null;
  opening_hours: OpeningHours | null;
  flexible_hours: string | null;
  stats: FacilityStat[] | null;
  social_links: SocialLinks | null;
  consultations?: ConsultationOption[] | null;
  google_maps_url?: string | null;
  map_embed_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface FacilityStat {
  value: string;
  label: string;
}

export interface SocialLinks {
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  google?: string | null;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  created_at?: string;
}

export interface FacilityService {
  facility_id: string;
  service_id: string;
}

export interface FacilityWithServices extends Facility {
  services: Service[];
}
