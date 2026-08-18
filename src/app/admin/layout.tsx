'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Stethoscope,
  Globe,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  UserCheck,
  PlusCircle,
} from 'lucide-react';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, isConfigured, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [user, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#0A192F] text-slate-100">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-slate-100 p-4">
        <div className="flex flex-col items-center gap-4 bg-[#112240] p-8 rounded-3xl border border-[rgba(100,200,255,0.1)] shadow-2xl">
          <div className="w-10 h-10 border-4 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Verifying administrator access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Services', href: '/admin/services', icon: Stethoscope },
    { label: 'Add New Service', href: '/admin/services/new', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-[#0F2440] border-r border-[rgba(100,200,255,0.08)] p-5 shrink-0">
        <div className="space-y-6">
          {/* Logo & Portal title */}
          <Link href="/admin" className="flex items-center gap-3 px-2 py-1 group">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center shadow-md border border-slate-200 overflow-hidden shrink-0">
              <img src="/logo.png" alt="Active Care Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-[var(--font-heading)] leading-tight">
                Active Care
              </h2>
              <span className="text-[0.65rem] font-bold text-[#38BDF8] uppercase tracking-wider">
                Admin Portal
              </span>
            </div>
          </Link>

          {!isConfigured && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Firebase env keys missing. Operating in preview mode.</span>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname === item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all min-h-[44px] active:scale-95 ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-lg'
                      : 'text-slate-300 hover:bg-[#112240] hover:text-white border border-transparent hover:border-[rgba(100,200,255,0.08)]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Bottom Actions */}
        <div className="space-y-4 pt-6 border-t border-[rgba(100,200,255,0.08)]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0A192F] border border-[rgba(100,200,255,0.06)]">
            <div className="w-9 h-9 rounded-full bg-[#112240] border border-[#0284C7]/40 flex items-center justify-center text-[#38BDF8] shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{user.email || 'Admin'}</p>
              <p className="text-[0.65rem] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Authenticated
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#112240] hover:bg-[#1A365D] text-xs font-bold text-slate-200 hover:text-white border border-[rgba(100,200,255,0.1)] transition min-h-[40px] active:scale-95"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/20 text-xs font-bold transition min-h-[40px] active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <header className="md:hidden bg-[#0F2440] border-b border-[rgba(100,200,255,0.08)] p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white p-0.5 flex items-center justify-center shadow overflow-hidden">
            <img src="/logo.png" alt="Active Care" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Active Care</h2>
            <span className="text-[0.6rem] font-bold text-[#38BDF8] uppercase tracking-wide">Admin Portal</span>
          </div>
        </Link>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2.5 rounded-xl bg-[#112240] text-white border border-[rgba(100,200,255,0.1)] min-w-[42px] min-h-[42px] flex items-center justify-center active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#0F2440] border-b border-[rgba(100,200,255,0.08)] p-5 space-y-4 shadow-2xl">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-md'
                      : 'text-slate-200 bg-[#112240] hover:bg-[#1A365D]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#38BDF8]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[rgba(100,200,255,0.08)] space-y-3">
            <div className="p-2.5 rounded-xl bg-[#0A192F] text-xs text-slate-300 truncate">
              Signed in as: <strong className="text-white">{user.email}</strong>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#112240] text-xs font-bold text-slate-200 border border-[rgba(100,200,255,0.1)] min-h-[42px]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Site</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-500/15 text-red-300 border border-red-500/30 text-xs font-bold min-h-[42px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
