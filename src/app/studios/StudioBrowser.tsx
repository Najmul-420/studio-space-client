'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import StudioCard from '@/components/shared/StudioCard';
import { apiRequest, getStudioLocation } from '@/lib/api';
import type { Studio } from '@/types/studio';

const categories = ['All', 'Photo Studio', 'Film Stage', 'Podcast Lounge', 'Music Suite', 'Workshop', 'Art Workshop'];

export default function StudioBrowser({ initialCategory }: { initialCategory: string }) {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    let active = true;
    async function loadStudios() {
      try {
        const data = await apiRequest<Studio[]>('/studios');
        if (!Array.isArray(data)) throw new Error('The studio API returned an invalid list.');
        if (active) setStudios(data);
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load studios.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStudios();
    return () => {
      active = false;
    };
  }, []);

  const filteredStudios = useMemo(() => studios.filter((studio) => {
    const matchesCategory = category === 'All' || studio.category === category;
    const searchable = `${studio.title} ${studio.category} ${getStudioLocation(studio.location)}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  }), [category, query, studios]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-8 border-b border-slate-200 pb-8 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Find your next creative space</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Explore studios</h1>
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">Compare inspiring spaces, transparent prices, and the details that make a great session.</p>
        </div>
        <Link href="/add-studio" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700">
          List your space
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <label className="relative block max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by studio, location or category"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2" aria-label="Filter by category">
          <SlidersHorizontal size={17} className="mr-1 shrink-0 text-slate-500" />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading studios">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3 p-5"><div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" /><div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" /></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/30">
            <h2 className="font-bold text-slate-900 dark:text-white">We couldn&apos;t load the studios.</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-5 rounded-xl bg-sky-600 px-5 py-2.5 font-semibold text-white hover:bg-sky-700">Try again</button>
          </div>
        ) : filteredStudios.length > 0 ? (
          <>
            <p className="mb-5 text-sm text-slate-500">{filteredStudios.length} {filteredStudios.length === 1 ? 'studio' : 'studios'} available</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudios.map((studio) => <StudioCard key={studio._id} studio={studio} />)}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">No studios match that search.</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Try another category or search term.</p>
            <button onClick={() => { setCategory('All'); setQuery(''); }} className="mt-5 font-semibold text-sky-700 dark:text-sky-400">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
