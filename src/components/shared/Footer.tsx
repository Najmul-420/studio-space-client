import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">StudioSpace</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            The ultimate high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, and musicians.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-sky-400 transition">Home</Link></li>
            <li><Link href="/studios" className="hover:text-sky-400 transition">Explore Studios</Link></li>
            <li><Link href="/add-studio" className="hover:text-sky-400 transition">Host Your Space</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Popular Categories</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>Photo Studios</li>
            <li>Cinema Sound Stages</li>
            <li>Podcast Lounges</li>
            <li>Music Recording Suites</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
          <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for latest studio drops.</p>
          <div className="flex gap-4">
            {/* New X Logo */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-sky-600 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © 2026 StudioSpace Platform. All rights reserved. Terms & Conditions apply.
      </div>
    </footer>
  );
}