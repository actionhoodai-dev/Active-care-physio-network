import GoogleMap from '@/components/ui/GoogleMap';
import ContactForm from '@/components/ui/ContactForm';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Activecare Healthcare Network',
  description: 'Get in touch with Activecare Physiotherapy Hospital Hub administration or reach associated clinics directly.',
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-[#0A192F] text-slate-100 min-h-screen">
      <div className="container-custom">
        {/* Dark Banner */}
        <div className="bg-[#0F2440] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-[rgba(100,200,255,0.12)]" data-animate="fade">
          <div className="max-w-2xl space-y-4">
            <span className="badge bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider font-[var(--font-body)]">
              Mother Organization Contact
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-heading)] leading-tight text-white">
              Contact Activecare Hub
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-[var(--font-body)]">
              Have questions regarding physical therapy sessions, orthopedic appointments, or clinic locations? We are here to assist.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#112240] rounded-3xl p-8 border border-[rgba(100,200,255,0.12)] shadow-xl space-y-6" data-animate="scale">
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-white">
              Send Us a Message / Request Appointment
            </h2>
            <ContactForm />
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6" data-animate="fade">
            <div className="bg-[#112240] rounded-3xl p-8 border border-[rgba(100,200,255,0.12)] shadow-xl space-y-6">
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-white">
                Central Hospital Hub Headquarters
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0 text-white font-bold">
                    <Phone className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 font-bold uppercase">Phone Lines</p>
                    <a href="tel:+919884308186" className="text-sm font-bold text-slate-200 hover:text-[#38BDF8] transition-colors block">+91 9884308186</a>
                    <a href="tel:+918838939754" className="text-sm font-bold text-slate-200 hover:text-[#38BDF8] transition-colors block">+91 88389 39754</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0 text-white font-bold">
                    <Mail className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 font-bold uppercase">Primary Email</p>
                    <a href="mailto:ActiveCarePhysio22@gmail.com" className="text-sm font-bold text-slate-200 hover:text-[#38BDF8] transition-colors block break-all">
                      ActiveCarePhysio22@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.1)] flex items-center justify-center shrink-0 text-white font-bold">
                    <MapPin className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div className="font-[var(--font-body)]">
                    <p className="text-xs text-slate-400 font-bold uppercase">Central Street Address</p>
                    <p className="text-sm font-bold text-slate-200 leading-snug">
                      938, MIG 938, 1st Main Rd, near Lakshmi super market, TamilNadu Housing Board Colony, Periyar Nagar, Velachery, Chennai, Greater Chennai, Tamil Nadu 600042
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-[#112240] rounded-3xl p-4 border border-[rgba(100,200,255,0.12)] shadow-xl overflow-hidden">
              <GoogleMap
                address="938, MIG 938, 1st Main Rd, near Lakshmi super market, TamilNadu Housing Board Colony, Periyar Nagar, Velachery, Chennai, Greater Chennai, Tamil Nadu 600042"
                embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7081937303064!2d80.21003507025628!3d12.99050648647958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f131c82665%3A0x665b19966024b1f7!2sActive%20Care%20Physiotherapy%20Center!5e0!3m2!1sen!2sin!4v1786561199448!5m2!1sen!2sin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
