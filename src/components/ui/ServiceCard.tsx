import {
  Stethoscope,
  Bone,
  Activity,
  HeartPulse,
  Zap,
  Dumbbell,
  Footprints,
  PersonStanding,
  Crosshair,
  Brain,
  Syringe,
} from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  slug: string;
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
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
  'general-medicine': <Stethoscope className="w-7 h-7" />,
  'pain-management': <Zap className="w-7 h-7" />,
};

/* Professional Solid Color Palette */
const colors = [
  'bg-[#0F2C59]',   /* Deep Navy */
  'bg-[#D97706]',   /* Amber */
  'bg-[#0D9488]',   /* Teal */
  'bg-[#0284C7]',   /* Blue */
  'bg-[#7C3AED]',   /* Violet */
  'bg-[#DC2626]',   /* Red */
  'bg-[#1E3A8A]',   /* Royal Blue */
  'bg-[#B45309]',   /* Dark Amber */
  'bg-[#0F766E]',   /* Dark Teal */
  'bg-[#1D4ED8]',   /* Bright Blue */
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
      className="bg-white rounded-2xl border border-slate-200 p-6 card-hover shadow-[var(--shadow-card)] group"
      id={`service-card-${slug}`}
    >
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-white shadow-md mb-5 transition-transform group-hover:scale-110`}>
        {icon}
      </div>

      <h3 className="text-lg font-bold font-[var(--font-heading)] text-[#0F2C59] mb-2">
        {name}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 font-[var(--font-body)]">
        {description}
      </p>
    </div>
  );
}
