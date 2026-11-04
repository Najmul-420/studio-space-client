'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { apiRequest, getStudioLocation } from '@/lib/api';
import type { Studio, StudioCategory } from '@/types/studio';

const categories: StudioCategory[] = ['Photo Studio', 'Film Stage', 'Podcast Lounge', 'Music Suite', 'Workshop', 'Art Workshop'];
const amenities = ['Natural light', 'Soundproofing', 'Lighting kit', 'Cyclorama wall', 'Green screen', 'Wi-Fi', 'Air conditioning', 'Parking', 'Editing suite', 'Accessible entrance'];
const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950';

export default function EditStudioPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [authLoading, router, user]);

  useEffect(() => {
    if (!user || !id) return;
    let active = true;
    async function loadStudio() {
      try {
        const data = await apiRequest<Studio>(`/studios/${encodeURIComponent(id)}`);
        if (active) setStudio(data);
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load this studio.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStudio();
    return () => {
      active = false;
    };
  }, [id, user]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!studio || !user) return;
    const formData = new FormData(event.currentTarget);
    const updatedStudio = {
      title: String(formData.get('title') ?? '').trim(),
      category: String(formData.get('category') ?? ''),
      hourlyRate: Number(formData.get('hourlyRate')),
      securityDeposit: Number(formData.get('securityDeposit')),
      maxCapacity: Number(formData.get('maxCapacity')),
      location: String(formData.get('location') ?? '').trim(),
      imageUrl: String(formData.get('imageUrl') ?? '').trim(),
      thumbnail: String(formData.get('imageUrl') ?? '').trim(),
      amenities: formData.getAll('amenities').map(String),
      overview: String(formData.get('overview') ?? '').trim(),
      hostName: studio.hostName || user.name,
      hostEmail: studio.hostEmail || user.email,
    };

    if (!Number.isFinite(updatedStudio.hourlyRate) || updatedStudio.hourlyRate <= 0 ||
      !Number.isFinite(updatedStudio.securityDeposit) || updatedStudio.securityDeposit < 0 ||
      !Number.isInteger(updatedStudio.maxCapacity) || updatedStudio.maxCapacity < 1) {
      toast.error('Enter a valid rate, deposit, and capacity.');
      return;
    }

    setSaving(true);
    try {
      await apiRequest<unknown>(`/studios/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updatedStudio),
      });
      toast.success('Studio details updated.');
      router.push('/my-listings');
    } catch (requestError) {
      toast.error(requestError instanceof Error ? requestError.message : 'Unable to update this studio.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user || loading) {
    return <div className="mx-auto max-w-4xl animate-pulse px-5 py-16"><div className="h-10 w-64 rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-6 h-[600px] rounded-3xl bg-slate-100 dark:bg-slate-900" /></div>;
  }

  if (error || !studio) {
    return <div className="mx-auto max-w-3xl px-5 py-20 text-center"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Studio details are unavailable.</h1><p role="alert" className="mt-3 text-sm text-slate-500">{error}</p><Link href="/my-listings" className="mt-6 inline-block font-semibold text-sky-700 dark:text-sky-400">Back to my listings</Link></div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Link href="/my-listings" className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-400">← Back to my listings</Link>
      <div className="mb-8 mt-5"><p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Keep your listing current</p><h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Edit studio</h1></div>
      <form onSubmit={handleUpdate} className="space-y-7 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-9">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Studio title<input name="title" defaultValue={studio.title} maxLength={100} required className={`${fieldClass} mt-2 font-normal`} /></label>
          <label className="text-sm font-semibold">Category<select name="category" defaultValue={studio.category} className={`${fieldClass} mt-2 font-normal`}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="text-sm font-semibold">Hourly rate ($)<input name="hourlyRate" type="number" min="1" step="0.01" defaultValue={studio.hourlyRate} required className={`${fieldClass} mt-2 font-normal`} /></label>
          <label className="text-sm font-semibold">Security deposit ($)<input name="securityDeposit" type="number" min="0" step="0.01" defaultValue={studio.securityDeposit} required className={`${fieldClass} mt-2 font-normal`} /></label>
          <label className="text-sm font-semibold">Maximum capacity<input name="maxCapacity" type="number" min="1" step="1" defaultValue={studio.maxCapacity} required className={`${fieldClass} mt-2 font-normal`} /></label>
          <label className="text-sm font-semibold">Location<input name="location" defaultValue={getStudioLocation(studio.location)} required className={`${fieldClass} mt-2 font-normal`} /></label>
        </div>
        <label className="block text-sm font-semibold">Cover image URL<input name="imageUrl" type="url" defaultValue={studio.imageUrl || studio.thumbnail || ''} required className={`${fieldClass} mt-2 font-normal`} /></label>
        <label className="block text-sm font-semibold">Studio overview<textarea name="overview" rows={5} defaultValue={studio.overview} maxLength={3000} required className={`${fieldClass} mt-2 resize-y font-normal`} /></label>
        <fieldset>
          <legend className="text-sm font-semibold">Amenities</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => <label key={amenity} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm dark:border-slate-700"><input type="checkbox" name="amenities" value={amenity} defaultChecked={studio.amenities?.includes(amenity)} className="size-4 accent-sky-600" />{amenity}</label>)}
          </div>
        </fieldset>
        <div className="grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
          <label className="text-sm font-semibold">Host name<input value={studio.hostName || user.name} readOnly className={`${fieldClass} mt-2 cursor-not-allowed font-normal`} /></label>
          <label className="text-sm font-semibold">Host email<input value={studio.hostEmail || user.email} readOnly className={`${fieldClass} mt-2 cursor-not-allowed font-normal`} /></label>
        </div>
        <button type="submit" disabled={saving} className="w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white transition hover:bg-sky-700 disabled:opacity-60">{saving ? 'Saving changes…' : 'Save changes'}</button>
      </form>
    </div>
  );
}
