'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AddStudioPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Studio listed successfully!');
    router.push('/my-listings');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">List Your Studio Space</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Studio Title</label>
            <input type="text" className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
              <input type="number" className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input type="url" className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Host Name (Read-only)</label>
              <input type="text" value={user?.name || 'Samium Islam'} readOnly className="w-full px-4 py-2.5 rounded-xl border bg-slate-100 dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Host Email (Read-only)</label>
              <input type="email" value={user?.email || 'samium@gmail.com'} readOnly className="w-full px-4 py-2.5 rounded-xl border bg-slate-100 dark:bg-slate-800 dark:border-slate-700" />
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow transition mt-4">Publish Studio</button>
        </form>
      </div>
    </div>
  );
}