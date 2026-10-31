import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-sky-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Studio Space Not Found</h2>
      <p className="text-slate-500 mb-6">The page or creative studio you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl shadow hover:bg-sky-700 transition">
        Return to Home
      </Link>
    </div>
  );
}