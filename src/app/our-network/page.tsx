import SectionHeading from '@/components/ui/SectionHeading';
import FacilityCard from '@/components/ui/FacilityCard';
import { getFacilities } from '@/lib/data';
import { Building2 } from 'lucide-react';

export const metadata = {
  title: 'Our Healthcare Network Directory | Activecare',
  description: 'Explore all 3 associated clinics under Activecare Physiotherapy Hospital Hub with phone numbers, addresses, maps, and direct official site links.',
};

export default async function OurNetworkPage() {
  const facilities = await getFacilities();

  return (
    <div className="py-12 md:py-20 bg-[#F8FAFC] min-h-screen">
      <div className="container-custom">
        {/* Solid Banner */}
        <div className="bg-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-[#1E3A8A]">
          <div className="max-w-3xl space-y-4">
            <span className="badge bg-white text-[#0F2C59] text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
              Network Facilities Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
              Associated Clinics &amp; Centers
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-[var(--font-body)]">
              Explore full profiles for Activecare Physiotherapy &amp; Sports Injury Clinic (Main Hub), DR. PAUL&apos;S ORTHO CLINIC, and Arunai Clinic with complete addresses, contact numbers, maps, and website redirect buttons.
            </p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0284C7]" />
              Activecare Network Clinics ({facilities.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
