interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      <div
        className={`w-16 h-1 rounded-full bg-[#D97706] mb-4 ${centered ? 'mx-auto' : ''}`}
      />
      <h2
        className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-[var(--font-heading)] leading-tight ${
          light ? 'text-white' : 'text-[#0F2C59]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
