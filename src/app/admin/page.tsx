'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getAdminServices, seedInitialServicesToFirestore } from '@/lib/firestore-services';
import type { Service } from '@/lib/types/database';
import {
  Stethoscope,
  PlusCircle,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  CalendarCheck,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isConfigured } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccessMsg, setSeedSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const list = await getAdminServices();
        setServices(list);
      } catch (err) {
        console.error('Error loading dashboard services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSeedServices = async () => {
    if (!confirm('This will seed the standard 10 physiotherapy & specialty services into Firestore. Proceed?')) {
      return;
    }
    setSeeding(true);
    try {
      const count = await seedInitialServicesToFirestore();
      setSeedSuccessMsg(`Successfully seeded ${count} default services into Cloud Firestore!`);
      const updated = await getAdminServices();
      setServices(updated);
    } catch (err: any) {
      alert(`Error seeding services: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#0F2440] border border-[rgba(100,200,255,0.12)] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="badge bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider">
            Portal Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-white">
            Welcome, Administrator
          </h1>
          <p className="text-sm text-slate-300 font-[var(--font-body)]">
            Manage treatments, specialized clinical programs, and healthcare offerings for <strong className="text-white">Active Care Physiotherapy Centre</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/services/new" className="btn-primary text-xs font-bold !py-2.5 !px-4">
            <PlusCircle className="w-4 h-4" />
            <span>Add Service</span>
          </Link>
          <Link href="/admin/services" className="btn-secondary text-xs font-bold !py-2.5 !px-4">
            <Stethoscope className="w-4 h-4" />
            <span>Manage All</span>
          </Link>
        </div>
      </div>

      {seedSuccessMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-200 text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{seedSuccessMsg}</span>
          </div>
          <button
            onClick={() => setSeedSuccessMsg(null)}
            className="text-xs text-emerald-400 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#112240] p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Total Services</span>
            <div className="w-8 h-8 rounded-lg bg-[#0284C7]/20 text-[#38BDF8] flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-[var(--font-heading)] text-white">
            {loading ? '...' : services.length}
          </p>
          <p className="text-xs text-slate-400">Treatments offered to patients</p>
        </div>

        <div className="bg-[#112240] p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Database State</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-base font-bold text-white flex items-center gap-2">
            {isConfigured ? (
              <span className="text-emerald-400 flex items-center gap-1.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Firebase Connected
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-4 h-4" />
                Seed/Local Fallback
              </span>
            )}
          </p>
          <p className="text-xs text-slate-400">Cloud Firestore sync</p>
        </div>

        <div className="bg-[#112240] p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Primary Center</span>
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-white leading-snug truncate">
            Active Care Physio
          </p>
          <p className="text-xs text-slate-400">Velachery, Chennai</p>
        </div>

        <div className="bg-[#112240] p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Admin User</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-white truncate">
            {user?.email || 'Logged In'}
          </p>
          <p className="text-xs text-emerald-400 font-semibold">Active Session</p>
        </div>
      </div>

      {/* Quick Setup / Seed Card */}
      {isConfigured && (
        <div className="bg-gradient-to-r from-[#0F2440] to-[#112240] border border-[#0284C7]/30 rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-[var(--font-heading)]">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              Populate Cloud Firestore with Seed Services
            </h3>
            <p className="text-xs text-slate-300">
              Easily sync all default hospital treatments (Back pain, Arthritis, Sports Rehab, Trauma Care, etc.) to your live Firestore collection with one click.
            </p>
          </div>
          <button
            onClick={handleSeedServices}
            disabled={seeding}
            className="btn-accent text-xs font-bold !py-2.5 !px-5 shrink-0"
          >
            {seeding ? 'Seeding Database...' : 'Seed Default Data'}
          </button>
        </div>
      )}

      {/* Services List Preview */}
      <div className="bg-[#112240] rounded-3xl border border-[rgba(100,200,255,0.08)] p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[rgba(100,200,255,0.08)] pb-4">
          <h2 className="text-lg font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#38BDF8]" />
            Active Care Services ({services.length})
          </h2>
          <Link
            href="/admin/services"
            className="text-xs font-bold text-[#38BDF8] hover:underline flex items-center gap-1"
          >
            <span>Full Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-slate-400 text-sm">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm space-y-3">
            <p>No services registered in the database yet.</p>
            <Link href="/admin/services/new" className="btn-primary text-xs">
              Add First Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-2xl bg-[#0A192F] border border-[rgba(100,200,255,0.08)] flex items-start justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">{service.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{service.description}</p>
                </div>
                <Link
                  href={`/admin/services/${service.id}/edit`}
                  className="text-xs font-bold text-[#38BDF8] hover:underline shrink-0 px-2.5 py-1 rounded bg-[#112240] border border-[rgba(100,200,255,0.1)]"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
