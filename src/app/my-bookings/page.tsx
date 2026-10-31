'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([
    { _id: 'b1', studioTitle: 'Aura Cyc Wall Photo Studio', date: '2026-11-05', time: '10:00 AM - 02:00 PM', price: 260, status: 'Confirmed' },
    { _id: 'b2', studioTitle: 'Echo Podcast Lounge', date: '2026-11-12', time: '03:00 PM - 05:00 PM', price: 80, status: 'Pending' }
  ]);

  const handleCancel = (id: string) => {
    setBookings(bookings.map(b => b._id === id ? { ...b, status: 'Cancelled' } : b));
    toast.success('Booking cancelled successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Reservations & Bookings</h1>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Studio</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr key={item._id} className="border-b border-slate-100 dark:border-slate-800 text-sm">
                <td className="p-4 font-bold">{item.studioTitle}</td>
                <td className="p-4 text-slate-500">{item.date} ({item.time})</td>
                <td className="p-4 font-bold text-sky-600">${item.price}</td>
                <td className="p-4"><span className={`px-2.5 py-1 text-xs rounded-full font-bold ${item.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{item.status}</span></td>
                <td className="p-4">
                  {item.status === 'Pending' && (
                    <button onClick={() => handleCancel(item._id)} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}