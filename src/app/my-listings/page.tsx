// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Pencil, Plus, Trash2 } from 'lucide-react';
// import { toast } from 'sonner';
// import { useAuth } from '@/context/AuthContext';
// import { apiRequest, getStudioLocation } from '@/lib/api';
// import type { Studio } from '@/types/studio';

// export default function MyListingsPage() {
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();
//   const [listings, setListings] = useState<Studio[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     if (!authLoading && !user) router.replace('/login');
//   }, [authLoading, router, user]);

//   // useEffect(() => {
//   //   if (!user) return;
//   //   let active = true;
//   //   async function loadListings() {
//   //     try {
//   //       const data = await apiRequest<Studio[]>('/my-listings');
//   //       if (!Array.isArray(data)) throw new Error('The listings API returned an invalid list.');
//   //       if (active) setListings(data);
//   //     } catch (requestError) {
//   //       if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load your listings.');
//   //     } finally {
//   //       if (active) setLoading(false);
//   //     }
//   //   }

//   //   void loadListings();
//   //   return () => {
//   //     active = false;
//   //   };

//   // }, [user]);

// // hi
// useEffect(() => {
//     if (!user) return;
//     let active = true;
//     async function loadListings() {
//       try {
//         // এখানে user.email যুক্ত করতে হবে 👇
//         const data = await apiRequest<Studio[]>(`/my-listings?email=${user.email}`);
//         if (!Array.isArray(data)) throw new Error('The listings API returned an invalid list.');
//         if (active) setListings(data);
//       } catch (requestError) {
//         if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load your listings.');
//       } finally {
//         if (active) setLoading(false);
//       }
//     }

//     void loadListings();
//     return () => {
//       active = false;
//     };
//   }, [user]);

// // 
//   const deleteListing = async () => {
//     if (!studioToDelete) return;
//     setDeleting(true);
//     try {
//       await apiRequest<unknown>(`/studios/${encodeURIComponent(studioToDelete._id)}`, { method: 'DELETE' });
//       setListings((current) => current.filter((studio) => studio._id !== studioToDelete._id));
//       toast.success('Studio listing deleted.');
//       setStudioToDelete(null);
//     } catch (requestError) {
//       toast.error(requestError instanceof Error ? requestError.message : 'Unable to delete this studio.');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (authLoading || !user) {
//     return <div className="mx-auto max-w-6xl animate-pulse px-5 py-16"><div className="h-10 w-64 rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-6 h-72 rounded-3xl bg-slate-100 dark:bg-slate-900" /></div>;
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
//       <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Your creative spaces</p>
//           <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">My studio listings</h1>
//           <p className="mt-2 text-slate-500 dark:text-slate-400">Manage the spaces you share with the community.</p>
//         </div>
//         <Link href="/add-studio" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"><Plus size={18} /> Add a studio</Link>
//       </div>

//       <div className="mt-8">
//         {loading ? (
//           <div className="animate-pulse rounded-3xl border border-slate-200 p-8 dark:border-slate-800"><div className="h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-5 h-24 rounded bg-slate-100 dark:bg-slate-900" /></div>
//         ) : error ? (
//           <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/30">
//             <h2 className="font-bold text-slate-900 dark:text-white">Your listings could not be loaded.</h2>
//             <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{error}</p>
//           </div>
//         ) : listings.length === 0 ? (
//           <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
//             <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your first listing starts here.</h2>
//             <p className="mt-2 text-slate-500 dark:text-slate-400">Add your studio so creators can find and book your space.</p>
//             <Link href="/add-studio" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"><Plus size={17} /> List your studio</Link>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[760px] text-left">
//                 <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60">
//                   <tr><th className="px-5 py-4 font-semibold">Studio</th><th className="px-5 py-4 font-semibold">Category</th><th className="px-5 py-4 font-semibold">Location</th><th className="px-5 py-4 font-semibold">Rate</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                   {listings.map((studio) => (
//                     <tr key={studio._id}>
//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
//                             <Image src={studio.imageUrl || '/window.svg'} alt="" fill unoptimized sizes="56px" className="object-cover" />
//                           </div>
//                           <Link href={`/studios/${studio._id}`} className="font-semibold text-slate-900 hover:text-sky-700 dark:text-white dark:hover:text-sky-400">{studio.title}</Link>
//                         </div>
//                       </td>
//                       <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{studio.category}</td>
//                       <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{getStudioLocation(studio.location)}</td>
//                       <td className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">${studio.hourlyRate}<span className="font-normal text-slate-500"> / hr</span></td>
//                       <td className="px-5 py-4">
//                         <div className="flex justify-end gap-2">
//                           <Link href={`/studios/edit/${studio._id}`} aria-label={`Edit ${studio.title}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"><Pencil size={15} /> Edit</Link>
//                           <button onClick={() => setStudioToDelete(studio)} aria-label={`Delete ${studio.title}`} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/40"><Trash2 size={15} /> Delete</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {studioToDelete && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !deleting) setStudioToDelete(null); }}>
//           <section role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
//             <h2 id="delete-title" className="text-xl font-bold text-slate-900 dark:text-white">Delete this studio?</h2>
//             <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">This will permanently remove <strong>{studioToDelete.title}</strong> from your listings.</p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button onClick={() => setStudioToDelete(null)} disabled={deleting} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold dark:border-slate-700">Keep listing</button>
//               <button onClick={() => void deleteListing()} disabled={deleting} className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">{deleting ? 'Deleting…' : 'Delete studio'}</button>
//             </div>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { apiRequest, getStudioLocation } from '@/lib/api';
import type { Studio } from '@/types/studio';

export default function MyListingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ১. সেশন লোডিং শেষ না হওয়া পর্যন্ত রিডাইরেক্ট করা যাবে না
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, router, user]);

  // ২. ইউজার পাওয়ার পর এবং authLoading শেষ হওয়ার পর সঠিকভাবে ডেটা ফেচ করবে
  useEffect(() => {
    const email = user?.email;
    if (authLoading || !email) return;

    let active = true;
    async function loadListings() {
      try {
        setLoading(true);
        const data = await apiRequest<Studio[]>(`/my-listings?email=${email}`);
        if (!Array.isArray(data)) throw new Error('The listings API returned an invalid list.');
        if (active) setListings(data);
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load your listings.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadListings();
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  const deleteListing = async () => {
    if (!studioToDelete) return;
    setDeleting(true);
    try {
      await apiRequest<unknown>(`/studios/${encodeURIComponent(studioToDelete._id)}`, { method: 'DELETE' });
      setListings((current) => current.filter((studio) => studio._id !== studioToDelete._id));
      toast.success('Studio listing deleted.');
      setStudioToDelete(null);
    } catch (requestError) {
      toast.error(requestError instanceof Error ? requestError.message : 'Unable to delete this studio.');
    } finally {
      setDeleting(false);
    }
  };

  // ৩. সেশন চেক বা লোডিং চলাকালীন স্মুথ লোডার স্পিনার দেখাবে
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Your creative spaces</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">My studio listings</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage the spaces you share with the community.</p>
        </div>
        <Link href="/add-studio" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"><Plus size={18} /> Add a studio</Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/30">
            <h2 className="font-bold text-slate-900 dark:text-white">Your listings could not be loaded.</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{error}</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your first listing starts here.</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Add your studio so creators can find and book your space.</p>
            <Link href="/add-studio" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"><Plus size={17} /> List your studio</Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60">
                  <tr><th className="px-5 py-4 font-semibold">Studio</th><th className="px-5 py-4 font-semibold">Category</th><th className="px-5 py-4 font-semibold">Location</th><th className="px-5 py-4 font-semibold">Rate</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {listings.map((studio) => (
                    <tr key={studio._id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <Image src={studio.imageUrl || '/window.svg'} alt="" fill unoptimized sizes="56px" className="object-cover" />
                          </div>
                          <Link href={`/studios/${studio._id}`} className="font-semibold text-slate-900 hover:text-sky-700 dark:text-white dark:hover:text-sky-400">{studio.title}</Link>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{studio.category}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{getStudioLocation(studio.location)}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">${studio.hourlyRate}<span className="font-normal text-slate-500"> / hr</span></td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/studios/edit/${studio._id}`} aria-label={`Edit ${studio.title}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"><Pencil size={15} /> Edit</Link>
                          <button onClick={() => setStudioToDelete(studio)} aria-label={`Delete ${studio.title}`} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/40"><Trash2 size={15} /> Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {studioToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !deleting) setStudioToDelete(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h2 id="delete-title" className="text-xl font-bold text-slate-900 dark:text-white">Delete this studio?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">This will permanently remove <strong>{studioToDelete.title}</strong> from your listings.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setStudioToDelete(null)} disabled={deleting} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold dark:border-slate-700">Keep listing</button>
              <button onClick={() => void deleteListing()} disabled={deleting} className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">{deleting ? 'Deleting…' : 'Delete studio'}</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}