'use client';

import { useState } from 'react';
import Link from 'next/link';

const sampleStudios = [
  { _id: '1', title: 'Aura Cyc Wall Photo Studio', category: 'Photo Studio', hourlyRate: 65, location: 'Gulshan, Dhaka', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800' },
  { _id: '2', title: 'Matrix Cinema Sound Stage', category: 'Film Stage', hourlyRate: 150, location: 'Banani, Dhaka', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800' },
  { _id: '3', title: 'Echo Podcast Lounge', category: 'Podcast Lounge', hourlyRate: 40, location: 'Dhanmondi, Dhaka', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800' }
];

export default function StudiosPage() {
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? sampleStudios : sampleStudios.filter(s => s.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Studio Workspaces</h1>
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
        {['All', 'Photo Studio', 'Film Stage', 'Podcast Lounge', 'Music Suite', 'Workshop'].map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap ${category === cat ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((studio) => (
          <div key={studio._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
            <img src={studio.imageUrl} alt={studio.title} className="w-full h-48 object-cover" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 rounded-full">{studio.category}</span>
                <h3 className="text-lg font-bold mt-3 mb-1">{studio.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{studio.location} • ⭐ {studio.rating}</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <span className="text-lg font-bold text-sky-600">${studio.hourlyRate} <span className="text-xs text-slate-400">/ hr</span></span>
                <Link href={`/studios/${studio._id}`} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}