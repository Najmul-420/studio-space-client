// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Eye, EyeOff, Focus } from 'lucide-react';
// import { toast } from 'sonner';
// import { apiRequest } from '@/lib/api';

// export default function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [photoUrl, setPhotoUrl] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const passwordIsValid = password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);

//   const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!passwordIsValid) {
//       toast.error('Use at least 6 characters, including an uppercase and a lowercase letter.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await apiRequest<unknown>('/users', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, photoUrl, password }),
//       });
//       toast.success('Account created. Sign in to continue.');
//       router.push('/login');
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : 'Unable to create your account.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleRegister = () => {
//     const authUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
//     if (!authUrl) {
//       toast.error('Google sign-in is not configured for this application.');
//       return;
//     }
//     window.location.assign(authUrl);
//   };

//   return (
//     <div className="mx-auto flex min-h-[72vh] max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
//       <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10 sm:p-9">
//         <div className="mb-7 text-center">
//           <span className="mx-auto inline-flex rounded-2xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950 dark:text-sky-300"><Focus size={25} /></span>
//           <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Join the creative community</p>
//           <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</h1>
//           <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Find a space to make your next idea real.</p>
//         </div>

//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Full name</label>
//             <input id="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950" required />
//           </div>
//           <div>
//             <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email address</label>
//             <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950" required />
//           </div>
         
//           <div>
//             <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">Password</label>
//             <div className="relative">
//               <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} aria-describedby="password-requirements" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950" required />
//               <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white">
//                 {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
//               </button>
//             </div>
//             <p id="password-requirements" className={`mt-2 text-xs ${password && !passwordIsValid ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
//               At least 6 characters, with one uppercase and one lowercase letter.
//             </p>
//           </div>
//           <button type="submit" disabled={loading} className="w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60">
//             {loading ? 'Creating account…' : 'Create account'}
//           </button>
//         </form>

//         <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />OR<span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /></div>
//         <button type="button" onClick={handleGoogleRegister} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
//           <span className="font-bold text-slate-700 dark:text-slate-200">G</span> Continue with Google
//         </button>
//         <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
//           Already have an account? <Link href="/login" className="font-bold text-sky-700 hover:underline dark:text-sky-400">Sign in</Link>
//         </p>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Focus } from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest, getApiUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const passwordIsValid = password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordIsValid) {
      toast.error('Use at least 6 characters, including an uppercase and a lowercase letter.');
      return;
    }

    setLoading(true);
    try {
      await apiRequest<unknown>('/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, photoUrl, password }),
      });
      toast.success('Account created. Sign in to continue.');
      router.push('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast.error('Google Client ID is not configured.');
      return;
    }

    try {
      setLoading(true);

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        callback: async (response) => {
          if (response.access_token) {
            try {
              // ইউজারের প্রোফাইল তথ্য গুগল এপিআই থেকে ফেচ করা
              const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${response.access_token}` },
              });
              const googleUser = await userInfoRes.json();

              // ব্যাকএন্ডের /auth/google রাউটে ডাটা পাঠানো
              const backendResponse = await apiRequest<any>("/auth/google", {
                method: "POST",
                body: JSON.stringify({
                  email: googleUser.email,
                  name: googleUser.name,
                  photoUrl: googleUser.picture,
                }),
              });

              const user = getApiUser(backendResponse);
              if (!user) {
                throw new Error("Google sign-in failed on the server.");
              }

              login(user);
              toast.success("Successfully registered with Google!");
              router.push("/");
            } catch (err: any) {
              toast.error(err.message || "Google authentication failed.");
            } finally {
              setLoading(false);
            }
          }
        },
      });

      client.requestAccessToken();
    } catch (error) {
      toast.error("Unable to initialize Google Sign-In.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[72vh] max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10 sm:p-9">
        <div className="mb-7 text-center">
          <span className="mx-auto inline-flex rounded-2xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950 dark:text-sky-300"><Focus size={25} /></span>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Join the creative community</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Find a space to make your next idea real.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Full name</label>
            <input id="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950" required />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email address</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950" required />
          </div>
         
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">Password</label>
            <div className="relative">
              <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} aria-describedby="password-requirements" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950" required />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white">
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            <p id="password-requirements" className={`mt-2 text-xs ${password && !passwordIsValid ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
              At least 6 characters, with one uppercase and one lowercase letter.
            </p>
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />OR<span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /></div>
        <button type="button" onClick={handleGoogleRegister} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
          <span className="font-bold text-slate-700 dark:text-slate-200">G</span> Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link href="/login" className="font-bold text-sky-700 hover:underline dark:text-sky-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
}