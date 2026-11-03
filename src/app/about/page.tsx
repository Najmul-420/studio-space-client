import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Users, Camera, Code2, Database, Layout, Server, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-400"
      >
        <ArrowLeft size={16} /> Return to home
      </Link>

      {/* Hero Header */}
      <div className="mt-8 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <Sparkles size={13} /> About StudioSpace
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          A home for the spaces behind the stories.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          StudioSpace is a high-performance peer-to-peer marketplace designed for independent creators, filmmakers, photographers, podcasters, and musicians. We bridge the gap between creative professionals and inspiring studio owners.
        </p>
      </div>

      {/* Platform Highlights */}
      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-sky-600 dark:bg-sky-950/50">
            <Camera size={26} />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Creative Studios</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Discover and reserve curated photo cyc walls, cinema sound stages, podcast lounges, and art workshops with ease.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-sky-600 dark:bg-sky-950/50">
            <Users size={26} />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Verified Hosts</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Connect directly with verified space owners, inspect dynamic availability, and manage bookings seamlessly.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-sky-600 dark:bg-sky-950/50">
            <ShieldCheck size={26} />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Secure Platform</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Enjoy reliable security deposits, transparent pricing, instant booking status updates, and modern notifications.
          </p>
        </div>
      </div>

      {/* Mission & Core Features Section */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2 items-center rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 dark:border-slate-800 dark:bg-slate-900/50">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Empowering Creators Worldwide
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether you are shooting a commercial film, recording a music album, or hosting a creative workshop, StudioSpace provides the robust infrastructure needed to find and book your ideal space instantly.
          </p>
          <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-sky-600 shrink-0" />
              Dynamic search, category filtering, and real-time specs.
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-sky-600 shrink-0" />
              Protected user dashboards for managing listings and reservations.
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-sky-600 shrink-0" />
              Fully responsive design optimized for mobile, tablet, and desktop.
            </li>
          </ul>
        </div>

        {/* Tech Stack Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Core Technology Stack</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
              <Layout className="text-sky-600" size={20} />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Next.js App Router</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
              <Code2 className="text-sky-600" size={20} />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Tailwind CSS & UI</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
              <Server className="text-sky-600" size={20} />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Express.js API</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
              <Database className="text-sky-600" size={20} />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">MongoDB Atlas</span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Developed by</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Najmul</p>
            </div>
            <Link
              href="/studios"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
            >
              Explore Studios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}