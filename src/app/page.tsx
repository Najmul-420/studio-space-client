import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white rounded-3xl p-8 sm:p-16 text-center shadow-2xl overflow-hidden">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 inline-block">Peer-to-Peer Production Marketplace</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">Find & Rent Professional <span className="text-sky-100">Creative Spaces</span></h1>
          <p className="text-base sm:text-xl text-slate-100 max-w-2xl mx-auto mb-8">Photography cyc walls, cinema stages, podcast suites & recording lounges.</p>
          <div className="flex justify-center gap-4">
            <Link href="/studios" className="px-6 py-3.5 bg-white text-sky-700 font-bold rounded-xl shadow-lg hover:bg-sky-50 transition">Explore Studios</Link>
            <Link href="/add-studio" className="px-6 py-3.5 bg-sky-900/60 hover:bg-sky-900 text-white font-bold rounded-xl border border-white/20 transition">Host Your Space</Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">How Booking Works</h2>
        <p className="text-slate-500 mb-10">4 simple steps to book your production studio</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg mb-2">Discover Spaces</h3>
            <p className="text-sm text-slate-500">Browse through cyc walls and sound stages.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg mb-2">Select Shoot Hours</h3>
            <p className="text-sm text-slate-500">Pick preferred dates and duration.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg mb-2">Book Instantly</h3>
            <p className="text-sm text-slate-500">Secure confirmation with verified hosts.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center mx-auto mb-4">4</div>
            <h3 className="font-bold text-lg mb-2">Create & Produce</h3>
            <p className="text-sm text-slate-500">Show up and bring your project to life.</p>
          </div>
        </div>
      </section>
    </div>
  );
}