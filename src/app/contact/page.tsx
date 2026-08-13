import GoogleMap from '@/components/ui/GoogleMap';
import ContactForm from '@/components/ui/ContactForm';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Activecare Healthcare Network',
  description: 'Get in touch with Activecare Physiotherapy Hospital Hub administration or reach associated clinics directly.',
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-[#F8FAFC] min-h-screen">
      <div className="container-custom">
        {/* Solid Banner */}
        <div className="bg-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-[#1E3A8A]">
          <div className="max-w-2xl space-y-4">
            <span className="badge bg-white text-[#0F2C59] text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
              Mother Organization Contact
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
              Contact Activecare Hub
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-[var(--font-body)]">
              Have questions regarding physical therapy sessions, orthopedic appointments, or clinic locations? We are here to assist.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-[#0F2C59]">
              Send Us a Message / Request Appointment
            </h2>
            <ContactForm />
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0F2C59]">
                Central Hospital Hub Headquarters
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0 text-[#0F2C59] font-bold">
                    <Phone className="w-5 h-5 text-[#0284C7]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 font-bold uppercase">Phone Lines</p>
                    <a href="tel:+917092550824" className="text-sm font-bold text-[#0F2C59] hover:text-[#0284C7] block">+91 7092550824</a>
                    <a href="tel:+917447447306" className="text-sm font-bold text-[#0F2C59] hover:text-[#0284C7] block">+91 7447447306</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0 text-[#0F2C59] font-bold">
                    <Mail className="w-5 h-5 text-[#0284C7]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 font-bold uppercase">Primary Email</p>
                    <a href="mailto:ActiveCarePhysio22@gmail.com" className="text-sm font-bold text-[#0F2C59] hover:text-[#0284C7] block break-all">
                      ActiveCarePhysio22@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0 text-[#0F2C59] font-bold">
                    <MapPin className="w-5 h-5 text-[#0284C7]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 font-bold uppercase">Central Street Address</p>
                    <p className="text-sm font-bold text-[#0F2C59]">
                      No 1 Thazhambur main road, OMR, OPP to Mount literia ZEE school, Navalur, Chennai 600130
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
              <GoogleMap
                address="No 1 Thazhambur main road, OMR, OPP to Mount literia ZEE school, Navalur, Chennai 600130"
                embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7081937303064!2d80.21003507025628!3d12.99050648647958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f131c82665%3A0x665b19966024b1f7!2sActive%20Care%20Physiotherapy%20Center!5e0!3m2!1sen!2sin!4v1786561199448!5m2!1sen!2sin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
