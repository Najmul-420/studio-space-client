'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Aperture, Menu, Moon, Sun, UserRound, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

import { useTheme } from '@/context/ThemeContext'; 

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Explore studios', href: '/studios' },
  { label: 'How it works', href: '/how-it-works' },
  {label: 'About Us', href: '/about'},
];

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast.success('You have signed out.');
      setAccountMenuOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign out.');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          <span className="inline-flex rounded-xl bg-sky-600 p-2 text-white"><Aperture size={21} /></span>
          StudioSpace
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-600 transition hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-400">{item.label}</Link>)}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {!loading && (user ? (
            <div className="relative">
              <button onClick={() => setAccountMenuOpen((open) => !open)} aria-expanded={accountMenuOpen} aria-label="Open account menu" className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 dark:border-slate-700">
                {user.photoUrl ? <span className="relative size-8 overflow-hidden rounded-full"><Image src={user.photoUrl} alt="" fill unoptimized sizes="32px" className="object-cover" /></span> : <span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"><UserRound size={17} /></span>}
                <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">{user.name}</span>
              </button>
              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <p className="truncate border-b border-slate-100 px-3 py-2 text-xs text-slate-500 dark:border-slate-800">{user.email}</p>
                  <Link onClick={() => setAccountMenuOpen(false)} href="/add-studio" className="block rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">List a studio</Link>
                  <Link onClick={() => setAccountMenuOpen(false)} href="/my-listings" className="block rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">My listings</Link>
                  <Link onClick={() => setAccountMenuOpen(false)} href="/my-bookings" className="block rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">My bookings</Link>
                  <button onClick={() => void handleLogout()} disabled={loggingOut} className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60 dark:hover:bg-rose-950/40">{loggingOut ? 'Signing out…' : 'Sign out'}</button>
                </div>
              )}
            </div>
          ) : !loading && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900">Sign in</Link>
              <Link href="/register" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">Get started</Link>
            </div>
          ))}
          <button onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 dark:border-slate-800 dark:text-slate-300 md:hidden">
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">{item.label}</Link>)}
            {!loading && (user ? (
              <>
                <Link href="/my-listings" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">My listings</Link>
                <Link href="/my-bookings" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">My bookings</Link>
                <button onClick={() => void handleLogout()} disabled={loggingOut} className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-rose-600">{loggingOut ? 'Signing out…' : 'Sign out'}</button>
              </>
            ) : (
              <div className="flex gap-3 px-3 py-2"><Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold dark:border-slate-700">Sign in</Link><Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 rounded-xl bg-sky-600 py-2.5 text-center text-sm font-semibold text-white">Get started</Link></div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
