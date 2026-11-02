import Link from 'next/link';
import { Aperture, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      <div className="absolute left-[12%] top-[20%] text-sky-200 dark:text-sky-900"><Sparkles size={25} /></div>
      <div className="absolute bottom-[20%] right-[14%] text-amber-300"><Sparkles size={20} /></div>
      <div className="relative">
        <span className="mx-auto inline-flex rounded-3xl bg-sky-50 p-5 text-sky-600 dark:bg-sky-950 dark:text-sky-300"><Aperture size={50} strokeWidth={1.4} /></span>
        <span className="absolute -right-3 -top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">404</span>
      </div>
      <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Out of frame</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">This page missed its cue.</h1>
      <p className="mt-4 max-w-md leading-7 text-slate-600 dark:text-slate-400">The page or creative space you’re looking for has moved, or may not exist.</p>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 font-bold text-white transition hover:bg-sky-700"><ArrowLeft size={17} /> Return to home</Link>
    </div>
  );
}
