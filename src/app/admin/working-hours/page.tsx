'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getAdminFacilities, updateAdminFacilityHours } from '@/lib/firestore-facilities';
import type { Facility, OpeningHours } from '@/lib/types/database';
import {
  Clock,
  Building2,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Copy,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

const DAYS_OF_WEEK: { key: keyof OpeningHours; label: string; short: string }[] = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
];

const PRESETS = [
  { label: '10 AM – 1 PM, 4 PM – 8 PM', value: '10 AM – 1 PM, 4 PM – 8 PM' },
  { label: '5:00 PM – 9:30 PM', value: '05:00 PM – 09:30 PM' },
  { label: '9:00 AM – 8:00 PM', value: '09:00 AM – 08:00 PM' },
  { label: 'By Prior Appointment', value: 'By Prior Appointment' },
  { label: 'Closed', value: 'Closed' },
];

function WorkingHoursEditor() {
  const searchParams = useSearchParams();
  const initialClinicSlug = searchParams.get('clinic');
  const { isConfigured } = useAuth();

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('active-care-physiotherapy-center');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states for the currently selected facility
  const [hours, setHours] = useState<OpeningHours>({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });
  const [flexibleHours, setFlexibleHours] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const list = await getAdminFacilities();
        setFacilities(list);

        const targetSlug = initialClinicSlug && list.some((f) => f.slug === initialClinicSlug)
          ? initialClinicSlug
          : list[0]?.slug || 'active-care-physiotherapy-center';

        setSelectedSlug(targetSlug);

        const activeFacility = list.find((f) => f.slug === targetSlug);
        if (activeFacility) {
          if (activeFacility.opening_hours) {
            setHours(activeFacility.opening_hours);
          }
          setFlexibleHours(activeFacility.flexible_hours || '');
        }
      } catch (err) {
        console.error('Failed to load clinic facilities:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [initialClinicSlug]);

  const handleSelectClinic = (slug: string) => {
    setSelectedSlug(slug);
    setStatusMessage(null);
    const fac = facilities.find((f) => f.slug === slug);
    if (fac) {
      if (fac.opening_hours) {
        setHours({ ...fac.opening_hours });
      }
      setFlexibleHours(fac.flexible_hours || '');
    }
  };

  const handleHourChange = (day: keyof OpeningHours, value: string) => {
    setHours((prev) => ({ ...prev, [day]: value }));
    setStatusMessage(null);
  };

  const applyPresetToDay = (day: keyof OpeningHours, presetValue: string) => {
    handleHourChange(day, presetValue);
  };

  const copyMondayToWeekdays = () => {
    const monVal = hours.monday;
    if (!monVal) return;
    setHours((prev) => ({
      ...prev,
      tuesday: monVal,
      wednesday: monVal,
      thursday: monVal,
      friday: monVal,
      saturday: monVal,
    }));
    setStatusMessage({
      type: 'success',
      text: 'Applied Monday hours to Tuesday through Saturday.',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      await updateAdminFacilityHours(selectedSlug, hours, flexibleHours);

      // Update local state list
      setFacilities((prev) =>
        prev.map((f) =>
          f.slug === selectedSlug
            ? { ...f, opening_hours: hours, flexible_hours: flexibleHours }
            : f
        )
      );

      setStatusMessage({
        type: 'success',
        text: `Working hours for "${currentFacility?.name || selectedSlug}" updated successfully! Changes are live across the website.`,
      });
    } catch (err: any) {
      console.error('Error saving clinic hours:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to save changes. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const currentFacility = facilities.find((f) => f.slug === selectedSlug);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-300">Loading clinic schedules...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#0F2440] border border-[rgba(100,200,255,0.12)] rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Branch Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-white">
          Clinic Working Hours &amp; Schedule Manager
        </h1>
        <p className="text-sm text-slate-300 font-[var(--font-body)]">
          Independently customize daily operating hours and flexible off-hour appointment policies for each clinic in the Active Care network.
        </p>
      </div>

      {/* Clinic Selector Tabs */}
      <div className="bg-[#112240] p-2 rounded-2xl border border-[rgba(100,200,255,0.08)] shadow-md grid grid-cols-1 sm:grid-cols-3 gap-2">
        {facilities.map((facility) => {
          const isSelected = facility.slug === selectedSlug;
          return (
            <button
              key={facility.slug}
              type="button"
              onClick={() => handleSelectClinic(facility.slug)}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-[#0A192F]/60 text-slate-300 hover:text-white hover:bg-[#0A192F] border border-transparent'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-[#112240] text-[#38BDF8]'
                }`}
              >
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold truncate">{facility.name}</p>
                <p className={`text-[0.65rem] truncate ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                  {facility.city}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Editor Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#112240] rounded-3xl border border-[rgba(100,200,255,0.12)] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(100,200,255,0.08)] pb-5">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Currently Editing
              </span>
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-white mt-0.5">
                {currentFacility?.name}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{currentFacility?.type}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyMondayToWeekdays}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1A365D] text-sky-300 hover:text-white text-xs font-bold border border-[rgba(100,200,255,0.15)] transition-all"
                title="Copy Monday hours to Tuesday through Saturday"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Mon &rarr; Tue–Sat</span>
              </button>

              <Link
                href={`/facility/${selectedSlug}`}
                target="_blank"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1A365D] text-slate-300 hover:text-white text-xs font-bold border border-[rgba(100,200,255,0.15)] transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Page</span>
              </Link>
            </div>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Daily Hours Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Daily Operating Times
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {DAYS_OF_WEEK.map(({ key, label }) => {
                const isSunday = key === 'sunday';
                return (
                  <div
                    key={key}
                    className={`p-4 rounded-2xl border transition-all ${
                      isSunday
                        ? 'bg-[#0A192F]/80 border-amber-500/30'
                        : 'bg-[#0A192F]/50 border-[rgba(100,200,255,0.06)] hover:border-[rgba(100,200,255,0.15)]'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                      <div className="lg:col-span-3 flex items-center justify-between">
                        <label
                          htmlFor={`hours-${key}`}
                          className={`text-sm font-bold ${
                            isSunday ? 'text-amber-400' : 'text-slate-200'
                          }`}
                        >
                          {label}
                        </label>
                        {isSunday && (
                          <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                            Weekend
                          </span>
                        )}
                      </div>

                      <div className="lg:col-span-5">
                        <input
                          id={`hours-${key}`}
                          type="text"
                          value={hours[key] || ''}
                          onChange={(e) => handleHourChange(key, e.target.value)}
                          placeholder="e.g. 10 AM – 1 PM, 4 PM – 8 PM or Closed"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.15)] focus:border-amber-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all font-[var(--font-body)]"
                        />
                      </div>

                      <div className="lg:col-span-4 flex flex-wrap items-center gap-1.5">
                        <span className="text-[0.65rem] text-slate-500 mr-1">Presets:</span>
                        {PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => applyPresetToDay(key, preset.value)}
                            className="px-2 py-1 rounded-lg bg-[#112240] hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-[0.65rem] font-semibold border border-[rgba(100,200,255,0.08)] hover:border-amber-500/30 transition-all"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flexible Hours Policy Box */}
          <div className="pt-4 border-t border-[rgba(100,200,255,0.08)] space-y-2">
            <label htmlFor="flexible-hours-input" className="block text-sm font-bold text-slate-200">
              Flexible / Extended Appointment Policy
            </label>
            <p className="text-xs text-slate-400">
              Displayed as a helpful callout note on the public clinic page (e.g. early morning or late night slots).
            </p>
            <textarea
              id="flexible-hours-input"
              rows={3}
              value={flexibleHours}
              onChange={(e) => setFlexibleHours(e.target.value)}
              placeholder="e.g. Flexible appointments outside working hours with prior booking: 7 AM – 10 AM and 8 PM – 10 PM on all working days."
              className="w-full p-3.5 rounded-2xl bg-[#0A192F] border border-[rgba(100,200,255,0.15)] focus:border-amber-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all resize-none font-[var(--font-body)]"
            />
          </div>

          {/* Live Schedule Preview Card */}
          <div className="p-5 rounded-2xl bg-[#0A192F] border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                Live Patient Website Preview
              </span>
              <span className="text-[0.65rem] text-slate-400">How patients see this clinic</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              {DAYS_OF_WEEK.map(({ key, short }) => (
                <div key={key} className="p-2.5 rounded-xl bg-[#112240] border border-[rgba(100,200,255,0.06)] space-y-1">
                  <p className="text-slate-400 font-bold uppercase text-[0.65rem]">{short}</p>
                  <p className={`font-semibold truncate ${key === 'sunday' ? 'text-amber-400' : 'text-white'}`}>
                    {hours[key] || 'Not specified'}
                  </p>
                </div>
              ))}
            </div>

            {flexibleHours && (
              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <strong className="text-amber-300">Flexible Hours Note:</strong> {flexibleHours}
              </div>
            )}
          </div>

          {/* Save Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              {isConfigured
                ? 'Changes will sync immediately to Cloud Firestore.'
                : 'Local preview mode active.'}
            </p>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Saving Schedule...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Working Hours</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminWorkingHoursPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400 text-sm">Loading Working Hours...</div>}>
      <WorkingHoursEditor />
    </Suspense>
  );
}
