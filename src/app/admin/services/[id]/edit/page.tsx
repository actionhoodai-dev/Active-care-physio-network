'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAdminServiceById, updateAdminService } from '@/lib/firestore-services';
import {
  ArrowLeft,
  Save,
  Stethoscope,
  AlertCircle,
} from 'lucide-react';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditServicePage({ params }: EditPageProps) {
  const resolvedParams = use(params);
  const serviceId = decodeURIComponent(resolvedParams.id);
  const router = useRouter();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const found = await getAdminServiceById(serviceId);
        if (found) {
          setName(found.name);
          setSlug(found.slug);
          setDescription(found.description);
        } else {
          setErrorMsg(`Service with identifier "${serviceId}" could not be found.`);
        }
      } catch (err: any) {
        setErrorMsg(`Failed to load service: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim() || !description.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    try {
      await updateAdminService(serviceId, {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim(),
      });
      router.push('/admin/services');
    } catch (err: any) {
      console.error('Error updating service:', err);
      setErrorMsg(err.message || 'Failed to update service in database.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 border-4 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading service details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Back button & Title */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="p-2 rounded-xl bg-[#112240] hover:bg-[#1A365D] text-slate-300 hover:text-white border border-[rgba(100,200,255,0.08)] transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-[#38BDF8]" />
            Edit Medical Service
          </h1>
          <p className="text-xs text-slate-400 font-[var(--font-body)]">
            Modify treatment title, description, or reference slug for Active Care Physiotherapy Centre
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-[#112240] rounded-3xl border border-[rgba(100,200,255,0.12)] p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5 font-[var(--font-body)]">
          <div>
            <label className="form-label" htmlFor="edit-service-name">
              Service Name *
            </label>
            <input
              id="edit-service-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="edit-service-slug">
              URL Identifier / Slug *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono">
                /
              </span>
              <input
                id="edit-service-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="form-input pl-7 font-mono text-xs"
              />
            </div>
            <p className="text-[0.7rem] text-slate-400 mt-1">
              Doc ID: <code className="text-slate-300 font-mono">{serviceId}</code>
            </p>
          </div>

          <div>
            <label className="form-label" htmlFor="edit-service-desc">
              Detailed Clinical Description *
            </label>
            <textarea
              id="edit-service-desc"
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[rgba(100,200,255,0.08)] flex items-center justify-end gap-3">
            <Link
              href="/admin/services"
              className="btn-secondary text-xs font-bold !py-2.5 !px-5"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs font-bold !py-2.5 !px-6"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating in Database...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Update Changes</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
