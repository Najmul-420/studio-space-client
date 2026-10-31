'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function MyListingsPage() {
  const [listings, setListings] = useState([
    { _id: '1', title: 'Aura Cyc Wall Photo Studio', category: 'Photo Studio', hourlyRate: 65, location: 'Gulshan, Dhaka' },
    { _id: '2', title: 'Echo Podcast Lounge', category: 'Podcast Lounge', hourlyRate: 40, location: 'Dhanmondi, Dhaka' }
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this studio listing?')) {
      setListings(listings.filter(item => item._id !== id));
      toast.success('Studio listing deleted successfully!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Studio Listings</h1>
        <Link href="/add-studio" className="px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-xl shadow">
          + Add New Studio
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Studio Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Hourly Rate</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item._id} className="border-b border-slate-100 dark:border-slate-800 text-sm">
                <td className="p-4 font-bold">{item.title}</td>
                <td className="p-4"><span className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950 text-sky-600 rounded-full text-xs font-semibold">{item.category}</span></td>
                <td className="p-4 font-semibold text-sky-600">${item.hourlyRate}/hr</td>
                <td className="p-4 text-slate-500">{item.location}</td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/studios/edit/${item._id}`} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-medium">Update</Link>
                  <button onClick={() => handleDelete(item._id)} className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}