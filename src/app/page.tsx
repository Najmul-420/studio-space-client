'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, Camera, Clapperboard, Mic2, Music2, Palette, Sparkles } from 'lucide-react';
import StudioCard from '@/components/shared/StudioCard';
import { apiRequest } from '@/lib/api';
import type { Studio } from '@/types/studio';

const slides = [
  {
    eyebrow: 'Make room for your next big idea',
    title: 'The right space changes everything.',
    body: 'Book considered, creator-ready studios for the work you can’t wait to make.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85',
  },
  {
    eyebrow: 'Built for the way you create',
    title: 'Find your perfect sound.',
    body: 'From quiet podcast rooms to fully equipped music suites, your next session starts here.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
  },
  {
    eyebrow: 'Your space could inspire someone',
    title: 'Share the space. Shape the story.',
    body: 'Turn your studio into a place where the creative community can do its best work.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
  },
];

const categories = [
  { title: 'Photo studios', category: 'Photo Studio', description: 'Natural light, cyc walls & room to frame the shot.', icon: Camera },
  { title: 'Film stages', category: 'Film Stage', description: 'Production-ready spaces for your next scene.', icon: Clapperboard },
  { title: 'Podcast rooms', category: 'Podcast Lounge', description: 'Sound-treated spaces made for conversation.', icon: Mic2 },
  { title: 'Music suites', category: 'Music Suite', description: 'Find your rhythm in a space built for sound.', icon: Music2 },
  { title: 'Art workshops', category: 'Art Workshop', description: 'Room to experiment, collaborate and create.', icon: Palette },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadStudios() {
      try {
        const data = await apiRequest<Studio[]>('/studios?limit=6');
        if (!Array.isArray(data)) throw new Error('The studio API returned an invalid list.');
        if (active) setStudios(data.slice(0, 6));
      } catch (requestError) {
        if (active) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load studios.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStudios();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  const slide = slides[activeSlide];
  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className="pb-20">
      <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 text-white sm:min-h-[690px]">
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/15" />
        <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20 sm:min-h-[690px] sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <Sparkles size={16} className="text-amber-300" />
              {slide.eyebrow}
            </p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">{slide.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/studios" className="rounded-xl bg-sky-500 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-sky-400">
                Explore studios
              </Link>
              <Link href="/add-studio" className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                Host your space
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-3" aria-label="Hero slides">
              <button onClick={() => changeSlide(-1)} aria-label="Previous slide" className="rounded-full border border-white/30 p-2.5 transition hover:bg-white/15">
                <ArrowLeft size={18} />
              </button>
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={activeSlide === index}
                  className={`h-1.5 rounded-full transition-all ${activeSlide === index ? 'w-10 bg-white' : 'w-5 bg-white/50'}`}
                />
              ))}
              <button onClick={() => changeSlide(1)} aria-label="Next slide" className="rounded-full border border-white/30 p-2.5 transition hover:bg-white/15">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Find your setting</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">A space for every kind of making.</h2>
          </div>
          <Link href="/studios" className="inline-flex items-center gap-2 font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400">
            Browse all spaces <ArrowDownRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ title, category, description, icon: Icon }) => (
            <Link
              key={category}
              href={`/studios?category=${encodeURIComponent(category)}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
            >
              <span className="mb-7 inline-flex rounded-xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <Icon size={22} />
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Made for the moment</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Spaces creators are loving.</h2>
              <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">Thoughtful studios, transparent hourly rates, and the details you need to plan your next session.</p>
            </div>
            <Link href="/studios" className="font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400">See every studio <ArrowRight size={16} className="ml-1 inline" /></Link>
          </div>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading featured studios">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                  <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-3 p-5"><div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" /><div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" /></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-rose-200 bg-white p-8 text-center dark:border-rose-900 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Featured studios could not be loaded.</p>
              <p className="mt-2 text-sm text-slate-500">{error}</p>
              <button onClick={() => { setError(''); setLoading(true); setRefreshKey((key) => key + 1); }} className="mt-5 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Try again</button>
            </div>
          ) : studios.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">No studios are listed yet.</p>
              <Link href="/add-studio" className="mt-4 inline-block font-semibold text-sky-700 dark:text-sky-400">Be the first to host a space</Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => <StudioCard key={studio._id} studio={studio} />)}
            </div>
          )}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">From idea to done</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Less searching. More creating.</h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-400">StudioSpace brings independent creators and inspiring spaces together. Find a setup that fits your project, book by the hour, and get on with making something good.</p>
          <Link href="/studios" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">Find a studio <ArrowRight size={17} /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['01', 'Explore', 'Filter spaces by category and find the setup that suits your project.'],
            ['02', 'Compare', 'Review the photos, amenities, capacity and clear hourly pricing.'],
            ['03', 'Reserve', 'Choose your date and time, then send a booking request to the host.'],
            ['04', 'Create', 'Arrive ready to make something memorable.'],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-sm font-bold text-sky-600">{number}</span>
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-sky-950 px-7 py-10 text-white sm:flex-row sm:items-center sm:px-12 sm:py-12">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300"><AudioLines size={16} className="mr-2 inline" /> For studio owners</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Your space has a story. Share it.</h2>
            <p className="mt-3 text-sky-100/80">Meet the creators looking for a place just like yours.</p>
          </div>
          <Link href="/add-studio" className="shrink-0 rounded-xl bg-white px-5 py-3 font-semibold text-sky-950 transition hover:bg-sky-100">List your studio</Link>
        </div>
      </section>
    </div>
  );
}
