'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import type { StudioCategory } from '@/types/studio';

const categories: StudioCategory[] = ['Photo Studio', 'Film Stage', 'Podcast Lounge', 'Music Suite', 'Workshop', 'Art Workshop'];
const amenityOptions = ['Natural light', 'Soundproofing', 'Lighting kit', 'Cyclorama wall', 'Green screen', 'Wi-Fi', 'Air conditioning', 'Parking', 'Editing suite', 'Accessible entrance'];
const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950';

export default function AddStudioPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [authLoading, router, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      toast.error('Sign in before listing a studio.');
      router.push('/login');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const studioData = {
      title: String(formData.get('title') ?? '').trim(),
      category: String(formData.get('category') ?? ''),
      hourlyRate: Number(formData.get('hourlyRate')),
      securityDeposit: Number(formData.get('securityDeposit')),
      maxCapacity: Number(formData.get('maxCapacity')),
      location: String(formData.get('location') ?? '').trim(),
      imageUrl: String(formData.get('imageUrl') ?? '').trim(),
      amenities: formData.getAll('amenities').map(String),
      overview: String(formData.get('overview') ?? '').trim(),
      hostName: user.name,
      hostEmail: user.email,
    };

    if (!Number.isFinite(studioData.hourlyRate) || studioData.hourlyRate <= 0 ||
      !Number.isFinite(studioData.securityDeposit) || studioData.securityDeposit < 0 ||
      !Number.isInteger(studioData.maxCapacity) || studioData.maxCapacity < 1) {
      toast.error('Enter a valid rate, deposit, and capacity.');
      return;
    }

    setSaving(true);
    try {
      await apiRequest<unknown>('/studios', { method: 'POST', body: JSON.stringify(studioData) });
      toast.success('Your studio is now listed.');
      router.push('/my-listings');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to publish your studio.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return <div className="mx-auto max-w-3xl animate-pulse px-5 py-16"><div className="h-10 w-64 rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-6 h-96 rounded-3xl bg-slate-100 dark:bg-slate-900" /></div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Link href="/my-listings" className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-400">← Back to my listings</Link>
      <div className="mb-8 mt-5">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Give your space a stage</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">List your studio</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Share the details creators need to plan a great session.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Studio details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Studio title
              <input name="title" type="text" maxLength={100} className={`${fieldClass} mt-2 font-normal`} required />
            </label>
            <label className="text-sm font-semibold">Category
              <select name="category" className={`${fieldClass} mt-2 font-normal`} required defaultValue="Photo Studio">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold">Hourly rate ($)
              <input name="hourlyRate" type="number" min="1" step="0.01" className={`${fieldClass} mt-2 font-normal`} required />
            </label>
            <label className="text-sm font-semibold">Security deposit ($)
              <input name="securityDeposit" type="number" min="0" step="0.01" className={`${fieldClass} mt-2 font-normal`} required />
            </label>
            <label className="text-sm font-semibold">Maximum capacity
              <input name="maxCapacity" type="number" min="1" step="1" className={`${fieldClass} mt-2 font-normal`} required />
            </label>
            <label className="text-sm font-semibold">Location / address
              <input name="location" type="text" maxLength={200} className={`${fieldClass} mt-2 font-normal`} required />
            </label>
          </div>
          <label className="block text-sm font-semibold">Cover image URL
            <input name="imageUrl" type="url" placeholder="https://…" className={`${fieldClass} mt-2 font-normal`} required />
          </label>
          <label className="block text-sm font-semibold">Studio overview
            <textarea name="overview" rows={5} maxLength={3000} placeholder="What makes this space special? Include helpful information for visiting creators." className={`${fieldClass} mt-2 resize-y font-normal`} required />
          </label>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Amenities</h2>
          <p className="mb-4 mt-1 text-sm text-slate-500">Choose what guests can use during their booking.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {amenityOptions.map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm dark:border-slate-700">
                <input type="checkbox" name="amenities" value={amenity} className="size-4 accent-sky-600" />
                {amenity}
              </label>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 pt-7 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Host information</h2>
          <p className="mb-4 mt-1 text-sm text-slate-500">These details come from your signed-in account.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Host name
              <input value={user.name} readOnly className={`${fieldClass} mt-2 cursor-not-allowed bg-slate-50 font-normal dark:bg-slate-950`} />
            </label>
            <label className="text-sm font-semibold">Host email
              <input value={user.email} readOnly className={`${fieldClass} mt-2 cursor-not-allowed bg-slate-50 font-normal dark:bg-slate-950`} />
            </label>
          </div>
        </section>

        <button type="submit" disabled={saving} className="w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60">
          {saving ? 'Publishing…' : 'Publish studio'}
        </button>
      </form>
    </div>
  );
}
