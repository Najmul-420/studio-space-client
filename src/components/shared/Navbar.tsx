'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Camera, Sun, Moon, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <Camera className="w-6 h-6 text-sky-600" />
          <span>StudioSpace</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400">Home</Link>
          <Link href="/studios" className="hover:text-sky-600 dark:hover:text-sky-400">Explore Studios</Link>
          <Link href="/#how-it-works" className="hover:text-sky-600 dark:hover:text-sky-400">How It Works</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-full border border-slate-300 dark:border-slate-700">
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-6 h-6 text-slate-600" />
                )}
              </button>
              <div className="absolute right-0 w-48 mt-2 hidden group-hover:block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 font-semibold text-xs text-slate-500">{user.name}</div>
                <Link href="/add-studio" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">Add New Studio</Link>
                <Link href="/my-listings" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">My Studio Listings</Link>
                <Link href="/my-bookings" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">My Bookings</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700">Logout</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600">Login</Link>
              <Link href="/register" className="px-4 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}