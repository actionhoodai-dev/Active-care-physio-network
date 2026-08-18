'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getAdminServices } from '@/lib/firestore-services';
import type { Service } from '@/lib/types/database';
import {
  Stethoscope,
  PlusCircle,
  Database,
  ArrowRight,
  Building2,
  CalendarCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { getAdminFacilities } from '@/lib/firestore-facilities';
import type { Facility } from '@/lib/types/database';

export default function AdminDashboardPage() {
  const { user, isConfigured } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [serviceList, facilityList] = await Promise.all([
          getAdminServices(),
          getAdminFacilities(),
        ]);
        setServices(serviceList);
        setFacilities(facilityList);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#0F2440] border border-[rgba(100,200,255,0.12)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-3 sm:space-y-2 mb-5 sm:mb-0">
          <span className="badge bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider">
            Portal Overview
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-[var(--font-heading)] text-white">
            Welcome, Administrator
          </h1>
          <p className="text-sm text-slate-300 font-[var(--font-body)]">
            Manage treatments, schedules, and clinic working hours for <strong className="text-white">Active Care Physiotherapy Centre</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-stretch sm:items-center gap-3 mt-4">
          <Link
            href="/admin/working-hours"
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <Clock className="w-4 h-4" />
            <span>Edit Clinic Working Hours</span>
          </Link>
          <Link
            href="/admin/services/new"
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-[#112240] hover:bg-[#1A365D] text-slate-200 hover:text-white text-sm font-bold border border-[rgba(100,200,255,0.15)] transition-all active:scale-95"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Manage Services</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-[#112240] p-4 sm:p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase">Total Services</span>
            <div className="w-8 h-8 rounded-lg bg-[#0284C7]/20 text-[#38BDF8] flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-white">
            {loading ? '...' : services.length}
          </p>
          <p className="text-[0.65rem] sm:text-xs text-slate-400">Treatments offered</p>
        </div>

        <div className="bg-[#112240] p-4 sm:p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase">Database</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-white">
            {isConfigured ? (
              <span className="text-emerald-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Connected
              </span>
            ) : (
              <span className="text-amber-400 text-xs">Fallback Mode</span>
            )}
          </p>
          <p className="text-[0.65rem] sm:text-xs text-slate-400">Cloud Firestore</p>
        </div>

        <div className="bg-[#112240] p-4 sm:p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase">Primary Center</span>
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-white leading-snug truncate">
            Active Care Physio
          </p>
          <p className="text-[0.65rem] sm:text-xs text-slate-400">Velachery, Chennai</p>
        </div>

        <div className="bg-[#112240] p-4 sm:p-5 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase">Admin User</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white truncate">
            {user?.email || 'Logged In'}
          </p>
          <p className="text-[0.65rem] sm:text-xs text-emerald-400 font-semibold">Active Session</p>
        </div>
      </div>

      {/* Services List Preview */}
      <div className="bg-[#112240] rounded-2xl sm:rounded-3xl border border-[rgba(100,200,255,0.08)] p-4 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(100,200,255,0.08)] pb-4">
          <h2 className="text-base sm:text-lg font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#38BDF8]" />
            Services Overview ({services.length})
          </h2>
          <Link
            href="/admin/services"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1A365D] text-[#38BDF8] hover:text-white text-xs font-bold border border-[rgba(100,200,255,0.1)] transition-all active:scale-95"
          >
            <span>Full Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-slate-400 text-sm">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm space-y-4">
            <p>No services registered in the database yet.</p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Add First Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-2xl bg-[#0A192F] border border-[rgba(100,200,255,0.08)] flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-white truncate">{service.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{service.description}</p>
                </div>
                <Link
                  href={`/admin/services/${service.id}/edit`}
                  className="flex items-center justify-center px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#0284C7]/20 text-[#38BDF8] border border-[rgba(100,200,255,0.1)] text-xs font-bold transition-all shrink-0 active:scale-95 min-w-[56px]"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clinic Working Hours Overview */}
      <div className="bg-[#112240] rounded-2xl sm:rounded-3xl border border-[rgba(100,200,255,0.08)] p-4 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(100,200,255,0.08)] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-[var(--font-heading)] text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Clinic Working Hours &amp; Schedules
            </h2>
            <p className="text-xs text-slate-400 mt-1">Configure opening times and flexible booking policies for each branch.</p>
          </div>
          <Link
            href="/admin/working-hours"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
          >
            <span>Manage All Hours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facilities.map((facility) => (
            <div
              key={facility.slug}
              className="p-5 rounded-2xl bg-[#0A192F] border border-[rgba(100,200,255,0.08)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#38BDF8]">{facility.type}</span>
                </div>
                <h3 className="font-bold text-sm text-white">{facility.name}</h3>
                <p className="text-xs text-slate-400">{facility.city}, {facility.state}</p>

                <div className="pt-2 border-t border-[rgba(100,200,255,0.08)] space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-medium text-slate-400">Mon–Sat:</span>
                    <span className="font-semibold text-white">{facility.opening_hours?.monday || 'See schedule'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="font-medium text-slate-400">Sunday:</span>
                    <span className="font-semibold text-amber-400">{facility.opening_hours?.sunday || 'Appointment only'}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/admin/working-hours?clinic=${facility.slug}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#112240] hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-bold transition-all text-center"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Edit {facility.name.split(' ')[0]} Hours</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
