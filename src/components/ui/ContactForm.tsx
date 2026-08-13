'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center space-y-4 bg-[#064E3B]/40 rounded-2xl border border-emerald-500/40 text-emerald-100 font-[var(--font-body)]">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold font-[var(--font-heading)] text-emerald-200">Thank You!</h3>
        <p className="text-sm leading-relaxed text-emerald-100">
          Your inquiry has been received. Our administration team at Activecare Healthcare Network will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary text-xs mt-2"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-[var(--font-body)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="contact-form-name">Your Full Name *</label>
          <input
            type="text"
            id="contact-form-name"
            className="form-input"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="contact-form-phone">Phone Number *</label>
          <input
            type="tel"
            id="contact-form-phone"
            className="form-input"
            placeholder="+91 88389 39754"
            required
          />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="contact-form-email">Email Address *</label>
        <input
          type="email"
          id="contact-form-email"
          className="form-input"
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div>
        <label className="form-label" htmlFor="contact-form-facility">Preferred Facility / Inquiry *</label>
        <select id="contact-form-facility" className="form-input">
          <option value="general">General Network Inquiry</option>
          <option value="active-care">Activecare Physiotherapy &amp; Sports Injury Clinic</option>
          <option value="dr-pauls">DR. PAUL&apos;S ORTHO CLINIC</option>
          <option value="arunai">Arunai Clinic</option>
        </select>
      </div>

      <div>
        <label className="form-label" htmlFor="contact-form-message">Message *</label>
        <textarea
          id="contact-form-message"
          rows={compact ? 3 : 5}
          className="form-input resize-none"
          placeholder="Describe your query or requested consultation..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-3"
      >
        <Send className="w-4 h-4" />
        {loading ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
