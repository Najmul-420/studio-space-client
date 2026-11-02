import { Aperture } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-5" role="status" aria-live="polite">
      <span className="animate-spin rounded-2xl bg-sky-600 p-3 text-white"><Aperture size={28} /></span>
      <p className="mt-5 font-semibold text-slate-800 dark:text-slate-200">Setting the scene…</p>
      <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full w-1/2 animate-pulse rounded-full bg-sky-500" /></div>
    </div>
  );
}
