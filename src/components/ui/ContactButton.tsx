import { ExternalLink, Globe } from 'lucide-react';

interface ContactButtonProps {
  websiteUrl?: string | null;
  googleBusinessUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ContactButton({
  websiteUrl,
  googleBusinessUrl,
  className = '',
  size = 'md',
}: ContactButtonProps) {
  const url = websiteUrl || googleBusinessUrl;
  const label = websiteUrl ? 'Visit Website' : 'Open Google Business Profile';
  const icon = websiteUrl ? (
    <Globe className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
  ) : (
    <ExternalLink className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
  );

  if (!url) return null;

  const sizeClasses = {
    sm: 'text-xs !py-2 !px-3.5',
    md: 'text-sm !py-2.5 !px-5',
    lg: 'text-base !py-3.5 !px-7 font-bold',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-accent ${sizeClasses[size]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
