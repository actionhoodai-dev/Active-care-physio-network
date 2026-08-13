import Link from 'next/link';
import { MapPin, Phone, ArrowRight, ExternalLink, Globe, Building2, Clock, User } from 'lucide-react';
import type { Facility } from '@/lib/types/database';

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  const externalLink = facility.website_url || facility.google_business_url;
  const externalLabel = facility.website_url
    ? 'Visit Website'
    : 'Open Google Business Profile';

  const externalIcon = facility.website_url ? (
    <Globe className="w-4 h-4" />
  ) : (
    <ExternalLink className="w-4 h-4" />
  );

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover shadow-[var(--shadow-card)] flex flex-col justify-between"
      id={`facility-card-${facility.slug}`}
    >
      <div>
        {/* Header Banner */}
        <div className="h-44 bg-white border-b border-slate-200 relative overflow-hidden flex items-center justify-center p-3">
          {facility.cover_image_url ? (
            <img src={facility.cover_image_url} alt={facility.name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-[#0F2C59] rounded-xl flex items-center justify-center">
              <Building2 className="w-14 h-14 text-white/30" />
            </div>
          )}
          <span className="absolute top-3 left-3 badge bg-[#0F2C59] text-white text-[0.65rem] font-bold shadow-md font-[var(--font-body)]">
            {facility.type}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
              <span className="text-[#0F2C59] font-extrabold text-lg font-[var(--font-heading)]">{facility.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold font-[var(--font-heading)] text-[#0F2C59] leading-tight">
                {facility.name}
              </h3>
              {facility.city && (
                <p className="flex items-center gap-1 text-xs text-slate-500 mt-1 font-[var(--font-body)]">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                  {facility.city}, {facility.state}
                </p>
              )}
            </div>
          </div>

          {facility.tagline && (
            <p className="text-sm font-bold text-[#D97706] italic font-[var(--font-heading)]">&ldquo;{facility.tagline}&rdquo;</p>
          )}

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 font-[var(--font-body)]">
            {facility.description}
          </p>

          {facility.doctor_name && (
            <div className="flex items-center gap-2 text-xs text-[#0F2C59] font-bold font-[var(--font-body)]">
              <User className="w-3.5 h-3.5 text-[#0284C7]" />
              Lead: {facility.doctor_name}
            </div>
          )}

          <div className="space-y-1">
            {facility.phone && (
              <a href={`tel:${facility.phone}`} className="flex items-center gap-2 text-xs font-bold text-[#0F2C59] hover:text-[#0284C7] transition-colors font-[var(--font-body)]">
                <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                {facility.phone}
              </a>
            )}
            {facility.phone_secondary && (
              <a href={`tel:${facility.phone_secondary}`} className="flex items-center gap-2 text-xs font-bold text-[#0F2C59] hover:text-[#0284C7] transition-colors font-[var(--font-body)]">
                <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                {facility.phone_secondary}
              </a>
            )}
          </div>

          {facility.opening_hours && (
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#F8FAFC] rounded-lg p-2.5 border border-slate-200 font-[var(--font-body)]">
              <Clock className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
              <span>{facility.opening_hours.monday}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 space-y-2.5">
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-accent justify-center text-sm !py-2.5 shadow-md hover:shadow-lg"
            id={`external-link-${facility.slug}`}
          >
            {externalIcon}
            <span>{externalLabel}</span>
          </a>
        )}
        <Link
          href={`/facility/${facility.slug}`}
          className="w-full btn-secondary justify-center text-sm !py-2.5"
          id={`view-details-${facility.slug}`}
        >
          <span>View Full Details, Hours & Map</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
