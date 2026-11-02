"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Focus } from "lucide-react";
import { toast } from "sonner";
import { apiRequest, getApiUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiRequest<unknown>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const user = getApiUser(response);
      if (!user)
        throw new Error(
          "The API signed you in but did not return a valid user profile.",
        );
      login(user);
      toast.success("Welcome back.");
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  };

  
  const handleGoogleLogin = () => {
    const authUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
    if (!authUrl) {
      toast.error('Google sign-in is not configured for this application.');
      return;
    }
    window.location.assign(authUrl);
  };

  return (
    <div className="mx-auto flex min-h-[72vh] max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10 sm:p-9">
        <div className="mb-7 text-center">
          <span className="mx-auto inline-flex rounded-2xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            <Focus size={25} />
          </span>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
            Good to have you back
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign in to StudioSpace
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Pick up where your next creative project begins.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950"
              required
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <button
                type="button"
                onClick={() =>
                  toast.info("Password recovery is not available yet.")
                }
                className="text-xs font-semibold text-sky-700 hover:underline dark:text-sky-400"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          OR
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <span className="font-bold text-slate-700 dark:text-slate-200">
            G
          </span>{" "}
          Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          New to StudioSpace?{" "}
          <Link
            href="/register"
            className="font-bold text-sky-700 hover:underline dark:text-sky-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

