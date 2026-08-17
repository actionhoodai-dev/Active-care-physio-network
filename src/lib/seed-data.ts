import type { Facility, Service } from '@/lib/types/database';

export const seedFacilities: Omit<Facility, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Active Care Physiotherapy & Sports Injury Clinic',
    slug: 'active-care-physiotherapy-center',
    type: 'Physiotherapy & Sports Injury Clinic',
    tagline: 'Your Pain Stops Here',
    description:
      'A fully equipped center for effective physiotherapy treatments. Our experienced and clinically versatile physiotherapists are immensely knowledgeable in clinical reasoning and hypothesizing clinical impressions. We offer world-class physiotherapy at clinic, home, or online — choose what works for you!',
    website_url: 'https://activecarephysio.in/',
    google_business_url: 'https://activecarephysio.in/',
    phone: '+91 9884308186',
    phone_secondary: '+91 8838939754',
    email: 'ActiveCarePhysio22@gmail.com',
    address: '938, MIG 938, 1st Main Rd, near Lakshmi super market, TamilNadu Housing Board Colony, Periyar Nagar, Velachery, Chennai, Greater Chennai, Tamil Nadu 600042',
    city: 'Chennai',
    state: 'Tamil Nadu',
    logo_url: '/active-care-banner.png',
    cover_image_url: '/active-care-banner.png',
    doctor_name: 'Dr. Senthil Nathan',
    opening_hours: {
      monday: '10 AM – 1 PM, 4 PM – 8 PM',
      tuesday: '10 AM – 1 PM, 4 PM – 8 PM',
      wednesday: '10 AM – 1 PM, 4 PM – 8 PM',
      thursday: '10 AM – 1 PM, 4 PM – 8 PM',
      friday: '10 AM – 1 PM, 4 PM – 8 PM',
      saturday: '10 AM – 1 PM, 4 PM – 8 PM',
      sunday: 'By Prior Appointment',
    },
    flexible_hours: 'Flexible appointments outside working hours with prior booking: 7 AM – 10 AM and 8 PM – 10 PM on all working days.',
    stats: [
      { value: '15+', label: 'Years of Experience' },
      { value: '5★', label: 'Star Rated Physiotherapist' },
      { value: '5000+', label: 'Happy Patients Treated' },
      { value: '800+', label: 'New Visits Every Year' },
    ],
    social_links: {
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      google: 'https://google.com',
      instagram: null,
    },
    google_maps_url: 'https://maps.google.com/?q=Active+Care+Physiotherapy+Center,+Velachery,+Chennai',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7081937303064!2d80.21003507025628!3d12.99050648647958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f131c82665%3A0x665b19966024b1f7!2sActive%20Care%20Physiotherapy%20Center!5e0!3m2!1sen!2sin!4v1786561199448!5m2!1sen!2sin',
  },
  {
    name: "DR.PAUL'S ORTHO CLINIC",
    slug: 'dr-pauls-ortho-clinic',
    type: 'Orthopedic Specialty Clinic',
    tagline: 'Refined Orthopedic Care for Active Lifestyles — Expert Care, Accurate Diagnosis, Better Mobility, Stronger You',
    description:
      "At DR.PAUL'S ORTHO CLINIC, we deliver sophisticated, personalized orthopaedic treatment to active individuals, trauma cases, and athletes. Specializing in Trauma Care, Joint Replacement, Spine Therapy, and Sports Medicine. Led by expert orthopedic surgeon Dr. Paul.",
    website_url: 'https://drpaulsorthoclinic.com/',
    google_business_url: 'https://drpaulsorthoclinic.com/',
    phone: '+91 8838939754',
    phone_secondary: '+91 9344674737',
    email: 'drpaulsorthoclinic@gmail.com',
    address: 'Plot no 16, Ramaiah Nagar, Medavakkam, Chennai, Medavakkam, Tamil Nadu 600100',
    city: 'Chennai',
    state: 'Tamil Nadu',
    logo_url: '/dr-pauls-banner.png',
    cover_image_url: '/dr-pauls-banner.png',
    doctor_name: 'Dr. Paul',
    opening_hours: {
      monday: '05:00 PM – 09:30 PM',
      tuesday: '05:00 PM – 09:30 PM',
      wednesday: '05:00 PM – 09:30 PM',
      thursday: '05:00 PM – 09:30 PM',
      friday: '05:00 PM – 09:30 PM',
      saturday: '05:00 PM – 09:30 PM',
      sunday: 'By Appointment Only',
    },
    flexible_hours: 'Consultation: Mon - Sat 5 PM to 9.30 PM. Sunday on appointment only. By appointment on major holidays.',
    stats: [
      { value: '4 Core', label: 'Trauma · Joint · Spine · Sports' },
      { value: '₹400', label: 'Initial Consultation Fee' },
      { value: '₹200', label: 'Review Consultation Fee' },
    ],
    social_links: null,
    google_maps_url: 'https://maps.google.com/?q=DR.PAUL%27S+ORTHO+CLINIC,+Medavakkam,+Chennai',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.928843121064!2d80.18768517024745!3d12.912294888348905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d0012cbb7ab%3A0xdb8a425ae0f03b9c!2sDR.PAUL%27s%20ORTHO%20CLINIC!5e0!3m2!1sen!2sin!4v1786561392185!5m2!1sen!2sin',
    consultations: [
      {
        title: 'Initial Consultation',
        duration: '5 mins',
        fee: '₹400',
        description: 'Comprehensive evaluation of orthopedic condition.',
      },
      {
        title: 'Review Consultation',
        duration: '5 mins',
        fee: '₹200',
        description: 'Follow-up evaluation for existing patients.',
      },
    ],
  },
  {
    name: 'Arunai Clinic',
    slug: 'arunai-clinic',
    type: 'Speciality Centre for Neurological Diseases & Diabetes',
    tagline: 'Speciality Centre for Neurological Diseases & Diabetes',
    description:
      'Arunai Clinic is a specialized healthcare clinic dedicated to expert diagnosis, treatment, and ongoing care for Neurological Diseases and Diabetes. We offer comprehensive diabetic management, nerve health evaluations, preventive health check-ups, and outpatient medical care under Active Care network standards.',
    website_url: null,
    google_business_url: 'https://maps.app.goo.gl/adgaBELxiT8XLhxRA',
    phone: '+91 9884122274',
    phone_secondary: '+91 9884308186',
    email: 'ActiveCarePhysio22@gmail.com',
    address: 'Latha Illam, TNHB Main Rd, TamilNadu Housing Board Colony, TNHB Colony, Velachery, Chennai, Greater Chennai, Tamil Nadu 600042',
    city: 'Chennai',
    state: 'Tamil Nadu',
    logo_url: '/arunai-clinic-banner.png',
    cover_image_url: '/arunai-clinic-banner.png',
    doctor_name: 'Neurology & Diabetes Specialist',
    opening_hours: {
      monday: '09:00 AM – 01:00 PM, 05:00 PM – 09:00 PM',
      tuesday: '09:00 AM – 01:00 PM, 05:00 PM – 09:00 PM',
      wednesday: '09:00 AM – 01:00 PM, 05:00 PM – 09:00 PM',
      thursday: '09:00 AM – 01:00 PM, 05:00 PM – 09:00 PM',
      friday: '09:00 AM – 01:00 PM, 05:00 PM – 09:00 PM',
      saturday: '09:00 AM – 01:00 PM, 05:00 PM – 09:00 PM',
      sunday: 'Sunday Holiday',
    },
    google_maps_url: 'https://maps.app.goo.gl/adgaBELxiT8XLhxRA',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7161313809565!2d80.20689037025625!3d12.98999938649172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267603edb060d%3A0xcff6c3c2c84b15cf!2sArunai%20Clinic!5e0!3m2!1sen!2sin!4v1786561242964!5m2!1sen!2sin',
    flexible_hours: 'Sunday Holiday. Outpatient consultations available Monday through Saturday.',
    stats: [
      { value: 'Speciality', label: 'Neurological Diseases & Diabetes' },
      { value: '100%', label: 'Dedicated Outpatient Care' },
    ],
    social_links: null,
  },
];

export const seedServices: Omit<Service, 'id' | 'created_at'>[] = [
  {
    name: 'Neurological Disease Care',
    slug: 'neurological-care',
    description:
      'Specialized diagnostic evaluation, treatment, and ongoing management for neurological disorders, nerve health, and balance conditions.',
  },
  {
    name: 'Diabetes & Metabolic Management',
    slug: 'diabetes-management',
    description:
      'Comprehensive diabetic care, blood sugar regulation, preventive health screenings, and lifestyle management for long-term health.',
  },
  {
    name: 'Arthritis Treatment',
    slug: 'arthritis-treatment',
    description:
      'Arthritis treatment typically aims to manage symptoms, slow down the progression of the disease, and improve quality of life through targeted physiotherapy and medication management.',
  },
  {
    name: 'Back Pain Treatment',
    slug: 'back-pain',
    description:
      'Back pain can result from various causes, including muscle strains, ligament sprains, poor posture, injury, or underlying medical conditions. We provide evidence-based treatment for full relief.',
  },
  {
    name: 'Balance Exercise Therapy',
    slug: 'balance-exercise-therapy',
    description:
      'Balance exercise therapy, also known as balance training, is a form of physical therapy aimed at improving balance, stability, and coordination for fall prevention and mobility restoration.',
  },
  {
    name: 'Foot and Ankle Pain',
    slug: 'foot-and-ankle-pain',
    description:
      'Foot and ankle pain can arise from various causes, including injuries, overuse, medical conditions, or structural issues. Our targeted therapy restores pain-free walking and mobility.',
  },
  {
    name: 'Trauma & Fracture Care',
    slug: 'trauma-care',
    description:
      'Emergency and planned orthopedic trauma care, fracture fixation, wound care, and post-traumatic joint restoration.',
  },
  {
    name: 'Joint Replacement & Care',
    slug: 'joint-care',
    description:
      'Comprehensive knee, hip, and shoulder joint evaluation, non-surgical joint management, and pre/post-operative surgical care.',
  },
  {
    name: 'Spine & Back Therapy',
    slug: 'spine-care',
    description:
      'Specialized spinal evaluation, disc management, sciatica treatment, and non-surgical posture rehabilitation.',
  },
  {
    name: 'Sports Injury Rehabilitation',
    slug: 'sports-injury-rehabilitation',
    description:
      'Dedicated sports medicine services for athletes at all levels. Includes injury prevention, acute injury treatment, surgical and non-surgical management, and return-to-sport programs.',
  },
];

export const seedFacilityServices: { facilitySlug: string; serviceSlug: string }[] = [
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'arthritis-treatment' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'back-pain' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'balance-exercise-therapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'foot-and-ankle-pain' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'sports-injury-rehabilitation' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'trauma-care' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'joint-care' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'spine-care' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'sports-injury-rehabilitation' },
  { facilitySlug: 'arunai-clinic', serviceSlug: 'neurological-care' },
  { facilitySlug: 'arunai-clinic', serviceSlug: 'diabetes-management' },
];
