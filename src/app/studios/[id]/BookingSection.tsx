// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { useAuth } from '@/context/AuthContext';
// import { apiRequest } from '@/lib/api';
// import type { Studio } from '@/types/studio';

// function toMinutes(value: string) {
//   const [hours, minutes] = value.split(':').map(Number);
//   return hours * 60 + minutes;
// }

// function localDateString(date: Date) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

// export default function BookingSection({ studio }: { studio: Studio }) {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [bookingDate, setBookingDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!user) {
//       toast.error('Sign in before booking a studio.');
//       router.push('/login');
//       return;
//     }

//     const durationMinutes = toMinutes(endTime) - toMinutes(startTime);
//     if (durationMinutes <= 0) {
//       toast.error('Choose an end time after the start time.');
//       return;
//     }
//     if (bookingDate < localDateString(new Date())) {
//       toast.error('Choose today or a future date.');
//       return;
//     }

//     const durationHours = durationMinutes / 60;
//     const totalPrice = Math.round(durationHours * studio.hourlyRate * 100) / 100;
//     setLoading(true);
//     try {
//       await apiRequest<unknown>('/bookings', {
//         method: 'POST',
//         body: JSON.stringify({
//           studioId: studio._id,
//           studioTitle: studio.title,
//           // studioImage: studio.imageUrl,
//           studioImage: studio.thumbnail || studio.imageUrl, // thumbnail fallback যোগ করা হয়েছে
//           userEmail: user.email,
//           userName: user.name,
//           bookingDate,
//           startTime,
//           endTime,
//           durationHours,
//           hourlyRate: studio.hourlyRate,
//           totalPrice,
//           status: 'Pending',
//         }),
//       });
//       toast.success('Booking request sent to the host.');
//       setIsOpen(false);
//       router.push('/my-bookings');
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : 'Unable to send your booking request.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button onClick={() => setIsOpen(true)} className="mt-5 w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white transition hover:bg-sky-700">
//         Book this workspace
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !loading) setIsOpen(false); }}>
//           <section role="dialog" aria-modal="true" aria-labelledby="booking-title" className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
//             <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Request a reservation</p>
//             <h2 id="booking-title" className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{studio.title}</h2>
//             <p className="mt-1 text-sm text-slate-500">${studio.hourlyRate} per hour · Pending host confirmation</p>
//             <form onSubmit={handleBooking} className="mt-6 space-y-4">
//               <label className="block text-sm font-semibold">Booking date
//                 <input type="date" min={localDateString(new Date())} required value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950" />
//               </label>
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <label className="block text-sm font-semibold">Start time
//                   <input type="time" required value={startTime} onChange={(event) => setStartTime(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950" />
//                 </label>
//                 <label className="block text-sm font-semibold">End time
//                   <input type="time" required value={endTime} onChange={(event) => setEndTime(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950" />
//                 </label>
//               </div>
//               {startTime && endTime && toMinutes(endTime) > toMinutes(startTime) && (
//                 <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
//                   Estimated total: <strong>${(((toMinutes(endTime) - toMinutes(startTime)) / 60) * studio.hourlyRate).toFixed(2)}</strong>
//                 </p>
//               )}
//               <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Your booking is pending until the host confirms availability. The server checks for overlapping confirmed bookings.</p>
//               <div className="flex gap-3 pt-2">
//                 <button type="button" onClick={() => setIsOpen(false)} disabled={loading} className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold dark:border-slate-700">Cancel</button>
//                 <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-60">{loading ? 'Sending…' : 'Request booking'}</button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}
//     </>
//   );
// }
