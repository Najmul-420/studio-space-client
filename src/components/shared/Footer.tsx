'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Aperture } from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest } from '@/lib/api';

const categories = [
  ['Photo studios', 'Photo Studio'],
  ['Film stages', 'Film Stage'],
  ['Podcast rooms', 'Podcast Lounge'],
  ['Music suites', 'Music Suite'],
  ['Art workshops', 'Art Workshop'],
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await apiRequest<unknown>('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      toast.success('You’re on the list. Watch your inbox for studio inspiration.');
      setEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to subscribe right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] lg:px-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white"><span className="rounded-xl bg-sky-600 p-2"><Aperture size={20} /></span>StudioSpace</Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">A home for the spaces behind the stories. We bring independent creators and inspiring studios together so great work can happen anywhere.</p>
        </div>
        <div>
          <h2 className="font-bold text-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="transition hover:text-sky-300">Home</Link></li>
            <li><Link href="/studios" className="transition hover:text-sky-300">All studios</Link></li>
            <li><Link href="/how-it-works" className="transition hover:text-sky-300">How it works</Link></li>
            <li><Link href="/add-studio" className="transition hover:text-sky-300">Host your space</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-white">Browse by category</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {categories.map(([label, category]) => <li key={category}><Link href={`/studios?category=${encodeURIComponent(category)}`} className="transition hover:text-sky-300">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-white">A little creative inspiration</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">Get new spaces and ideas delivered occasionally. No noise, just good places to make things.</p>
          <form onSubmit={subscribe} className="mt-4 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-500" />
            <button type="submit" disabled={submitting} className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-60">{submitting ? '…' : 'Join'}</button>
          </form>
          <div className="mt-5 flex gap-3" aria-label="Social links">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="Google" className="inline-flex size-10 items-center justify-center rounded-xl bg-slate-900 text-slate-300 transition hover:bg-sky-700 hover:text-white">
              <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="StudioSpace on X" className="inline-flex size-10 items-center justify-center rounded-xl bg-slate-900 text-slate-300 transition hover:bg-sky-700 hover:text-white">
              <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex size-10 items-center justify-center rounded-xl bg-slate-900 text-slate-300 transition hover:bg-sky-700 hover:text-white">
              <svg viewBox="0 0 24 24" className="size-4.25 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" className="fill-current stroke-none" /></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="inline-flex size-10 items-center justify-center rounded-xl bg-slate-900 text-slate-300 transition hover:bg-sky-700 hover:text-white">
              <svg viewBox="0 0 24 24" className="size-4.5 fill-current" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12s0 3.8.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12s0-3.8-.5-5.8ZM9.6 15.6V8.4l6.3 3.6z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© 2026 StudioSpace. Made for the makers.</p>
          <p>StudioSpace connects creators and independent workspace hosts. Terms apply.</p>
        </div>
      </div>
    </footer>
  );
}
