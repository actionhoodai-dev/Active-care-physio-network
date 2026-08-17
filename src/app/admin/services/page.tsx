'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getAdminServices,
  deleteAdminService,
  seedInitialServicesToFirestore,
} from '@/lib/firestore-services';
import { useAuth } from '@/lib/auth-context';
import type { Service } from '@/lib/types/database';
import {
  Stethoscope,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function AdminServicesListPage() {
  const { isConfigured } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [seeding, setSeeding] = useState(false);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getAdminServices();
      setServices(data);
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to load services: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the service "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    setMessage(null);
    try {
      await deleteAdminService(id);
      setMessage({ type: 'success', text: `Service "${name}" successfully deleted.` });
      await loadServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to delete service: ${err.message}` });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will write the standard 10 services to your Cloud Firestore database. Continue?')) {
      return;
    }
    setSeeding(true);
    setMessage(null);
    try {
      const count = await seedInitialServicesToFirestore();
      setMessage({ type: 'success', text: `Successfully synced ${count} default services to Cloud Firestore!` });
      await loadServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: `Error seeding services: ${err.message}` });
    } finally {
      setSeeding(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const query = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.slug.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(100,200,255,0.08)] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-white flex items-center gap-2.5">
            <Stethoscope className="w-7 h-7 text-[#38BDF8]" />
            Manage Services &amp; Treatments
          </h1>
          <p className="text-sm text-slate-300 font-[var(--font-body)] mt-1">
            Add, update, or remove medical services displayed across Active Care Physiotherapy Centre
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isConfigured && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="btn-secondary text-xs font-bold !py-2.5 !px-4"
              title="Seed 10 default treatments"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{seeding ? 'Seeding...' : 'Seed Data'}</span>
            </button>
          )}
          <Link href="/admin/services/new" className="btn-primary text-xs font-bold !py-2.5 !px-4">
            <PlusCircle className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-sm flex items-center justify-between gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-red-500/10 border-red-500/30 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs hover:underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Controls Bar */}
      <div className="bg-[#112240] p-4 rounded-2xl border border-[rgba(100,200,255,0.08)] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, keyword, or slug..."
            className="form-input pl-10 text-xs !py-2.5"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-white">{filteredServices.length}</strong> of {services.length} services
        </div>
      </div>

      {/* Services Grid/Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
          <span>Loading services list...</span>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="bg-[#112240] rounded-3xl p-12 text-center border border-[rgba(100,200,255,0.08)] space-y-4">
          <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white font-[var(--font-heading)]">
            No matching services found
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {search
              ? `No services match your query "${search}". Try searching for something else.`
              : 'You have not added any services yet. Click below to create your first medical service or use the Seed Data button.'}
          </p>
          <div className="pt-2">
            <Link href="/admin/services/new" className="btn-primary text-xs">
              <PlusCircle className="w-4 h-4" /> Add Service
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id || idx}
              className="bg-[#112240] rounded-2xl border border-[rgba(100,200,255,0.08)] p-5 shadow-lg card-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-base text-white font-[var(--font-heading)]">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#38BDF8] font-mono mt-0.5">
                      slug: /{service.slug}
                    </p>
                  </div>
                  <span className="badge bg-[#0A192F] text-slate-300 border border-[rgba(100,200,255,0.1)] text-[0.65rem]">
                    #{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-[var(--font-body)]">
                  {service.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[rgba(100,200,255,0.08)] flex items-center justify-between">
                <Link
                  href="/services"
                  target="_blank"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition"
                  title="View on public site"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0284C7]/20 hover:bg-[#0284C7]/30 text-[#38BDF8] border border-[#0284C7]/30 text-xs font-bold transition"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(service.id, service.name)}
                    disabled={deletingId === service.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold transition disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{deletingId === service.id ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
