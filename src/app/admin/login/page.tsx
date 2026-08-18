'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Info } from 'lucide-react';

export default function AdminLoginPage() {
  const { user, loading, isConfigured, signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err: any) {
      console.error('Sign-in error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setErrorMsg('Invalid email or password. Please verify your administrator credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setErrorMsg('Access temporarily blocked due to multiple failed login attempts. Please try again later.');
      } else {
        setErrorMsg(err.message || 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0284C7]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white p-1 shadow-xl border border-slate-200 mb-2 overflow-hidden">
            <img src="/logo.png" alt="Active Care Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-white">
            Active Care Admin Portal
          </h1>
          <p className="text-sm text-slate-300 font-[var(--font-body)]">
            Sign in with your administrator credentials to manage website services
          </p>
        </div>

        {/* Configuration Notice if Firebase is not yet configured */}
        {!isConfigured && (
          <div className="p-4 bg-[#112240] rounded-2xl border border-amber-500/40 text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Info className="w-4 h-4" />
              <span>Firebase Environment Setup Required</span>
            </div>
            <p className="leading-relaxed">
              To enable live authentication &amp; real-time Firestore database updates, add your Firebase keys (<code className="bg-[#0A192F] px-1 py-0.5 rounded text-white">NEXT_PUBLIC_FIREBASE_*</code>) in your Vercel or local environment settings.
            </p>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-[#112240] border border-[rgba(100,200,255,0.12)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {errorMsg && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label" htmlFor="admin-email">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@activecarephysio.in"
                  className="form-input form-input-with-icon"
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input form-input-with-icon"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center text-sm !py-3 shadow-lg hover:shadow-cyan-500/25 mt-2"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In as Administrator</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Back to website */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1 font-medium"
          >
            ← Return to Active Care Physiotherapy Centre
          </Link>
        </div>
      </div>
    </div>
  );
}
