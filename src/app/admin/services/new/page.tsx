'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createAdminService } from '@/lib/firestore-services';
import {
  ArrowLeft,
  Save,
  Stethoscope,
  AlertCircle,
  X,
} from 'lucide-react';

export default function AdminNewServicePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim() || !description.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    try {
      await createAdminService({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim(),
      });
      router.push('/admin/services');
    } catch (err: any) {
      console.error('Error creating service:', err);
      setErrorMsg(err.message || 'Failed to create service in Firestore database.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Back button & Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/admin/services"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#112240] hover:bg-[#1A365D] text-slate-300 hover:text-white border border-[rgba(100,200,255,0.08)] transition shrink-0 active:scale-95"
          title="Back to services list"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
            Add New Medical Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-[var(--font-body)]">
            Create a new treatment or therapy offering for Active Care Physiotherapy Centre
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-[#112240] rounded-2xl sm:rounded-3xl border border-[rgba(100,200,255,0.12)] p-5 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5 font-[var(--font-body)]">
          <div>
            <label className="form-label" htmlFor="service-name">
              Service Name *
            </label>
            <input
              id="service-name"
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Laser Therapy, Post-Operative Rehabilitation..."
              className="form-input min-h-[44px]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="form-label mb-0" htmlFor="service-slug">
                URL Identifier / Slug *
              </label>
              <label className="text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer bg-[#0A192F] px-2.5 py-1 rounded-lg border border-[rgba(100,200,255,0.08)]">
                <input
                  type="checkbox"
                  checked={autoSlug}
                  onChange={(e) => setAutoSlug(e.target.checked)}
                  className="rounded bg-[#0A192F]"
                />
                <span>Auto-generate slug</span>
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono pointer-events-none select-none z-10">
                /
              </span>
              <input
                id="service-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setSlug(e.target.value);
                }}
                placeholder="laser-therapy"
                className="form-input form-input-with-prefix font-mono text-xs sm:text-sm min-h-[44px]"
              />
            </div>
            <p className="text-[0.7rem] text-slate-400 mt-1">
              Unique identifier slug for this service
            </p>
          </div>

          <div>
            <label className="form-label" htmlFor="service-desc">
              Detailed Clinical Description *
            </label>
            <textarea
              id="service-desc"
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Comprehensive clinical description of this physiotherapy or medical service, what conditions it addresses, and the therapeutic approach..."
              className="form-input resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[rgba(100,200,255,0.08)] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <Link
              href="/admin/services"
              className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#0A192F] hover:bg-[#1A365D] text-slate-300 hover:text-white border border-[rgba(100,200,255,0.1)] text-sm font-bold transition min-h-[44px] active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold shadow-lg transition min-h-[44px] active:scale-95"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving to Database...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save Service</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
