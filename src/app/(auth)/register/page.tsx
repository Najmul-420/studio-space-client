// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';

// export default function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleRegister = (e: React.FormEvent) => {
//     e.preventDefault();
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const isValidLength = password.length >= 6;

//     if (!hasUpperCase || !hasLowerCase || !isValidLength) {
//       toast.error('পাসওয়ার্ডে অন্তত ১টি বড় হাতের, ১টি ছোট হাতের অক্ষর এবং ন্যূনতম ৬টি ক্যারেক্টার থাকতে হবে!');
//       return;
//     }

//     toast.success('রেজিস্ট্রেশন সফল হয়েছে! দয়া করে লগইন করুন।');
//     router.push('/login');
//   };

//   return (
//     <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
//       <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700" required />
//           </div>
//           <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow transition">Register</button>
//         </form>
//         <p className="text-center text-sm mt-4 text-slate-500">
//           Already have an account? <Link href="/login" className="text-sky-600 font-semibold">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; // <-- ১. আইকনগুলো ইমপোর্ট করা হলো

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- ২. পাসওয়ার্ড দেখানোর স্টেট
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isValidLength) {
      toast.error('পাসওয়ার্ডে অন্তত ১টি বড় হাতের, ১টি ছোট হাতের অক্ষর এবং ন্যূনতম ৬টি ক্যারেক্টার থাকতে হবে!');
      return;
    }

    toast.success('রেজিস্ট্রেশন সফল হয়েছে! দয়া করে লগইন করুন।');
    router.push('/login');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" 
              required 
            />
          </div>
          
          {/* পাসওয়ার্ড ফিল্ড এবং টগল বাটন */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input 
                // ৩. স্টেট অনুযায়ী input-এর type 'text' বা 'password' হবে
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-2.5 pr-10 rounded-xl border dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" 
                required 
              />
              {/* ৪. চোখের আইকন বাটন */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow transition">Register</button>
        </form>
        <p className="text-center text-sm mt-4 text-slate-500">
          Already have an account? <Link href="/login" className="text-sky-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}