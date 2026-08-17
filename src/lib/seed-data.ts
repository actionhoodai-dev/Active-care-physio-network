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
    type: 'Orthopedic & Physiotherapy Specialty Clinic',
    tagline: 'Refined Orthopedic Care & Physiotherapy for Active Lifestyles — Expert Care, Accurate Diagnosis, Better Mobility, Stronger You',
    description:
      "At DR.PAUL'S ORTHO CLINIC, we deliver sophisticated, personalized orthopaedic treatment and specialized physiotherapy care to active individuals, trauma cases, and athletes. Specializing in Physiotherapy & Rehabilitation, Trauma Care, Joint Replacement, Spine Therapy, and Sports Medicine.",
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
    doctor_name: 'Orthopedic & Joint Care Specialist',
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
      { value: 'Specialist', label: 'Orthopedic Surgery & Trauma' },
      { value: 'Active Rehab', label: 'Physiotherapy & Sports Rehab' },
      { value: 'Advanced Care', label: 'Joint Replacement & Spine' },
      { value: '5 PM – 9:30 PM', label: 'Evening Consultations' },
    ],
    social_links: null,
    google_maps_url: 'https://maps.google.com/?q=DR.PAUL%27S+ORTHO+CLINIC,+Medavakkam,+Chennai',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.928843121064!2d80.18768517024745!3d12.912294888348905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d0012cbb7ab%3A0xdb8a425ae0f03b9c!2sDR.PAUL%27s%20ORTHO%20CLINIC!5e0!3m2!1sen!2sin!4v1786561392185!5m2!1sen!2sin',
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
    name: '1. Electrotherapy',
    slug: 'electrotherapy',
    description:
      'Advanced electro-therapeutic modalities to relieve pain, promote tissue repair, and re-educate neuromuscular pathways. Includes IFT (Interferential Therapy), TENS, EMS / NMES, FES (Functional Electrical Stimulation), Russian stimulation, Diadynamic currents, and Microcurrent therapy.',
  },
  {
    name: '2. Thermal & Physical Modalities',
    slug: 'thermal-physical-modalities',
    description:
      'Therapeutic thermal applications and physical modalities for deep circulation, pain relief, and collagen extensibility. Includes Ultrasound therapy, Therapeutic laser, Wax therapy / Paraffin wax bath, Hot pack, Cold pack / Cryotherapy, Contrast therapy, and Infrared therapy.',
  },
  {
    name: '3. Manual Therapy',
    slug: 'manual-therapy',
    description:
      'Expert hands-on clinical interventions restoring joint range, resolving soft-tissue restrictions, and easing neural tension. Includes Joint mobilization, Soft-tissue mobilization, Myofascial release, Trigger-point therapy, Muscle energy techniques, Manual stretching, Fascial techniques, and Clinical manipulation.',
  },
  {
    name: '4. Exercise Therapy',
    slug: 'exercise-therapy',
    description:
      'Structured therapeutic exercise regimens tailored for functional recovery and whole-body conditioning. Includes ROM exercises, Active & passive exercises, Stretching, Strengthening exercises, Resistance training, Isometric exercises, Progressive resistance exercises, Functional strengthening, Endurance training, and Cardiovascular conditioning.',
  },
  {
    name: '5. Neuro Physiotherapy',
    slug: 'neuro-physiotherapy',
    description:
      'Specialized neurological rehabilitation for Stroke, GBS, Parkinson’s, Multiple Sclerosis, Spinal cord injury, Peripheral nerve injury, and Facial palsy / Bell’s palsy. Features Balance & coordination training, Gait training, Proprioceptive training, Sensory re-education, Motor control training, and Neurodevelopmental therapy (NDT).',
  },
  {
    name: '6. Orthopaedic Physiotherapy',
    slug: 'orthopaedic-physiotherapy',
    description:
      'Comprehensive musculoskeletal care for Back pain, Neck pain, Shoulder pain & stiffness, Frozen shoulder, Tennis elbow, Wrist & hand problems, Hip pain, Knee pain, Ankle & foot problems, Arthritis rehabilitation, Ligament injuries, Tendon injuries, Muscle strains, and Post-fracture rehabilitation.',
  },
  {
    name: '7. Sports Physiotherapy',
    slug: 'sports-physiotherapy',
    description:
      'Dedicated athletic conditioning and trauma recovery covering Sports injury rehabilitation, Muscle strain & sprain rehabilitation, ACL & Meniscus rehabilitation, Rotator cuff rehabilitation, Return-to-sport training, Sports-specific strengthening, Agility training, and Injury prevention programs.',
  },
  {
    name: '8. Spine Physiotherapy',
    slug: 'spine-physiotherapy',
    description:
      'Targeted spinal rehabilitation for Cervical spondylosis, Lumbar spondylosis, Disc-related pain, Sciatica, Postural correction, Core strengthening, Spinal stabilization, and Traction therapy.',
  },
  {
    name: '9. Pediatric Physiotherapy',
    slug: 'pediatric-physiotherapy',
    description:
      'Compassionate developmental therapy addressing Developmental delay, Cerebral palsy, Pediatric neurological conditions, Congenital conditions, Gross motor training, Balance & coordination, Gait training, and Postural training for children.',
  },
  {
    name: '10. Geriatric Physiotherapy',
    slug: 'geriatric-physiotherapy',
    description:
      'Specialized senior care focused on Senior citizen strengthening, Balance training, Fall-prevention programs, Walking / gait training, Arthritis management, Mobility training, and Functional independence in daily living.',
  },
  {
    name: '11. Vestibular Physiotherapy',
    slug: 'vestibular-physiotherapy',
    description:
      'Inner-ear and balance therapy including Vertigo rehabilitation, BPPV repositioning techniques, Vestibular adaptation exercises, Balance rehabilitation, Gaze stabilization, and Habituation exercises for dizziness and equilibrium restoration.',
  },
  {
    name: '12. Post-Surgical Rehabilitation',
    slug: 'post-surgical-rehabilitation',
    description:
      'Structured clinical recovery protocols following Knee replacement, Hip replacement, ACL reconstruction, Fracture surgery, Shoulder surgery, Spine surgery, and General post-operative mobility training.',
  },
  {
    name: '13. Respiratory Physiotherapy',
    slug: 'respiratory-physiotherapy',
    description:
      'Cardiopulmonary physical therapy including Breathing exercises, Chest physiotherapy, Airway clearance techniques, Diaphragmatic breathing, Incentive spirometry training, Post-operative respiratory rehabilitation, and Pulmonary conditioning.',
  },
  {
    name: '14. Women’s Health Physiotherapy',
    slug: 'womens-health-physiotherapy',
    description:
      'Specialized women’s wellness services covering Prenatal exercises, Postnatal rehabilitation, Pelvic-floor muscle training, Core rehabilitation, Postural correction, and Diastasis recti rehabilitation.',
  },
  {
    name: '15. Pain Management',
    slug: 'pain-management',
    description:
      'Multi-modal pain alleviation protocols for Acute pain management, Chronic pain management, Myofascial pain, Musculoskeletal pain, Postural pain, Therapeutic exercise programs, and Manual therapy-based pain management.',
  },
  {
    name: '16. Taping & Supportive Techniques',
    slug: 'taping-supportive-techniques',
    description:
      'Neuromuscular and biomechanical taping methods including Kinesio taping, Sports taping, McConnell taping, Joint support taping, and Edema-management lymphatic taping.',
  },
  {
    name: '17. Functional Rehabilitation',
    slug: 'functional-rehabilitation',
    description:
      'Functional life skills restoration including Activities of daily living (ADL) training, Functional mobility, Sit-to-stand training, Stair training, Transfer training, Walking aids training, Workplace ergonomics, and Posture correction.',
  },
  {
    name: '18. Advanced Rehabilitation',
    slug: 'advanced-rehabilitation',
    description:
      'Modern state-of-the-art rehabilitation therapies including Shockwave therapy, Dry needling, Cupping therapy, Proprioceptive training, Suspension therapy, Balance-board training, Resistance-band training, and Functional Electrical Stimulation (FES).',
  },
];

export const seedFacilityServices: { facilitySlug: string; serviceSlug: string }[] = [
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'electrotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'thermal-physical-modalities' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'manual-therapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'exercise-therapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'neuro-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'orthopaedic-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'sports-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'spine-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'pediatric-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'geriatric-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'vestibular-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'post-surgical-rehabilitation' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'respiratory-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'womens-health-physiotherapy' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'pain-management' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'taping-supportive-techniques' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'functional-rehabilitation' },
  { facilitySlug: 'active-care-physiotherapy-center', serviceSlug: 'advanced-rehabilitation' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'orthopaedic-physiotherapy' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'spine-physiotherapy' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'sports-physiotherapy' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'post-surgical-rehabilitation' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'pain-management' },
  { facilitySlug: 'dr-pauls-ortho-clinic', serviceSlug: 'manual-therapy' },
  { facilitySlug: 'arunai-clinic', serviceSlug: 'neuro-physiotherapy' },
  { facilitySlug: 'arunai-clinic', serviceSlug: 'geriatric-physiotherapy' },
  { facilitySlug: 'arunai-clinic', serviceSlug: 'exercise-therapy' },
];
