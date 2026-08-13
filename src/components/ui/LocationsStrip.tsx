import { MapPin, Navigation } from 'lucide-react';
import { getFacilities } from '@/lib/data';

export default async function LocationsStrip() {
  const facilities = await getFacilities();

  return (
    <section
      className="bg-[#060F1E] border-y border-[rgba(100,200,255,0.08)] py-4"
      id="locations-strip"
      aria-label="Branch Locations"
    >
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap">
          {/* Label */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider font-[var(--font-body)] shrink-0">
            <Navigation className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Our Locations</span>
          </div>

          {/* Divider — visible on desktop */}
          <div className="hidden sm:block w-px h-5 bg-[rgba(100,200,255,0.15)]" />

          {/* Location Links */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            {facilities.map((facility, idx) => {
              const mapsUrl =
                facility.google_maps_url ||
                `https://maps.google.com/?q=${encodeURIComponent(facility.address || facility.name)}`;

              return (
                <a
                  key={facility.id}
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="locations-strip-link group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.08)] hover:border-[#0284C7]/50 hover:bg-[#112240] transition-all duration-300"
                  id={`location-link-${facility.slug}`}
                  title={`Open ${facility.name} on Google Maps`}
                >
                  <MapPin className="w-4 h-4 text-[#F59E0B] group-hover:text-[#38BDF8] transition-colors shrink-0" />
                  <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap font-[var(--font-body)]">
                    {facility.name}
                  </span>
                  {facility.city && (
                    <span className="text-[0.65rem] text-slate-500 font-medium font-[var(--font-body)] hidden md:inline">
                      {facility.city}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
