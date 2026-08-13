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

        <h3 className="text-lg font-bold font-[var(--font-heading)] text-white mb-2">
          {name}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 font-[var(--font-body)]">
          {description}
        </p>
      </div>
    </div>
  );
}
