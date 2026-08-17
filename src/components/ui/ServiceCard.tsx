import React from 'react';
import {
  Stethoscope,
  Bone,
  Activity,
  Zap,
  Dumbbell,
  Footprints,
  PersonStanding,
  Crosshair,
  Brain,
  Syringe,
  SunMedium,
  Sparkles,
  Trophy,
  Baby,
  HeartHandshake,
  Compass,
  Wind,
  HeartPulse,
  ShieldCheck,
  Bandage,
  Gauge,
} from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  slug: string;
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  'electrotherapy': <Zap className="w-7 h-7" />,
  'thermal-physical-modalities': <SunMedium className="w-7 h-7" />,
  'manual-therapy': <Sparkles className="w-7 h-7" />,
  'exercise-therapy': <Dumbbell className="w-7 h-7" />,
  'neuro-physiotherapy': <Brain className="w-7 h-7" />,
  'orthopaedic-physiotherapy': <Bone className="w-7 h-7" />,
  'sports-physiotherapy': <Trophy className="w-7 h-7" />,
  'spine-physiotherapy': <Activity className="w-7 h-7" />,
  'pediatric-physiotherapy': <Baby className="w-7 h-7" />,
  'geriatric-physiotherapy': <HeartHandshake className="w-7 h-7" />,
  'vestibular-physiotherapy': <Compass className="w-7 h-7" />,
  'post-surgical-rehabilitation': <Stethoscope className="w-7 h-7" />,
  'respiratory-physiotherapy': <Wind className="w-7 h-7" />,
  'womens-health-physiotherapy': <HeartPulse className="w-7 h-7" />,
  'pain-management': <ShieldCheck className="w-7 h-7" />,
  'taping-supportive-techniques': <Bandage className="w-7 h-7" />,
  'functional-rehabilitation': <PersonStanding className="w-7 h-7" />,
  'advanced-rehabilitation': <Gauge className="w-7 h-7" />,
  'neurological-care': <Brain className="w-7 h-7" />,
  'diabetes-management': <Syringe className="w-7 h-7" />,
  'arthritis-treatment': <Bone className="w-7 h-7" />,
  'back-pain': <Activity className="w-7 h-7" />,
  'balance-exercise-therapy': <PersonStanding className="w-7 h-7" />,
  'foot-and-ankle-pain': <Footprints className="w-7 h-7" />,
  'trauma-care': <Crosshair className="w-7 h-7" />,
  'joint-care': <Bone className="w-7 h-7" />,
  'spine-care': <Activity className="w-7 h-7" />,
  'sports-injury-rehabilitation': <Dumbbell className="w-7 h-7" />,
};

/* Rich Dark Accent Icon Colors */
const colors = [
  'bg-[#0284C7]',   /* Sky Blue */
  'bg-[#D97706]',   /* Amber */
  'bg-[#0D9488]',   /* Teal */
  'bg-[#2563EB]',   /* Blue */
  'bg-[#7C3AED]',   /* Violet */
  'bg-[#059669]',   /* Emerald */
  'bg-[#EA580C]',   /* Orange */
  'bg-[#0891B2]',   /* Cyan */
];

export default function ServiceCard({
  name,
  description,
  slug,
  index = 0,
}: ServiceCardProps) {
  const icon = iconMap[slug] || <Stethoscope className="w-7 h-7" />;
  const color = colors[index % colors.length];

  return (
    <div
      className="bg-[#112240] rounded-2xl border border-[rgba(100,200,255,0.08)] p-6 card-hover shadow-lg group flex flex-col justify-between"
      id={`service-card-${slug}`}
      data-animate="scale"
    >
      <div>
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-white shadow-md mb-5 transition-transform group-hover:scale-110`}>
          {icon}
        </div>

        <h3 className="text-lg font-bold font-[var(--font-heading)] text-white mb-2 leading-snug">
          {name}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-[var(--font-body)]">
          {description}
        </p>
      </div>
    </div>
  );
}
