"use client"; // If using client-side hooks like useState in App Router

import React, { useState } from "react";
import Link from "next/link";
import { 
  Camera, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Layers,
  Clock,
  Lock
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"creators" | "hosts">("creators");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 border border-indigo-500/30">
            <Sparkles className="w-4 h-4" /> Production Workflow Simplified
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            How <span className="text-indigo-400">StudioSpace</span> Works
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Whether you are a filmmaker searching for the ultimate cyc wall or a studio owner looking to monetize your production space, we’ve made booking seamless and secure.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/80 backdrop-blur border border-slate-700 shadow-xl">
            <button
              onClick={() => setActiveTab("creators")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === "creators"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              For Creators & Filmmakers
            </button>
            <button
              onClick={() => setActiveTab("hosts")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === "hosts"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              For Studio Hosts
            </button>
          </div>
        </div>
      </section>

      {/* --- MAIN WORKFLOW SECTION --- */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        {activeTab === "creators" ? (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Your Journey as a Creator</h2>
              <p className="text-slate-600 dark:text-slate-400">
                From finding the exact aesthetic you need to bringing your production to life in 4 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  01
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Discover Spaces</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Browse through photo cyc walls, cinema sound stages, podcast lounges, and music suites with advanced category filters.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  02
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Select Shoot Hours</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Check dynamic availability, calculate total hourly rates, review security deposits, and pick your exact time slots.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  03
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Secure your reservation instantly with double-booking prevention protection and transparent checkout.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  04
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Create & Produce</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Check-in at the studio, access professional amenities, shoot your masterpiece, and share feedback.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                Explore Available Studios <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Monetize Your Creative Space</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Turn your empty studio hours into revenue with complete control, liability protection, and verified creators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Host Step 1 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  01
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">List Your Space</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Provide studio specs, hourly rates, security deposits, high-resolution photo URLs, and specific equipment lists.
                </p>
              </div>

              {/* Host Step 2 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  02
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Set Rules & Pricing</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Define your calendar availability, maximum capacity, house rules, and amenities tags effortlessly through your dashboard.
                </p>
              </div>

              {/* Host Step 3 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  03
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Manage Bookings</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Review pending reservation slots, track confirmed bookings, and update or modify your listings anytime from My Listings.
                </p>
              </div>

              {/* Host Step 4 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  04
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">Earn Secure Payouts</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Get reliable earnings with built-in host protection guarantee, verified creator profiles, and 24/7 support.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/add-studio"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                Host Your Space Today <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* --- TRUST & HOST GUARANTEE SECTION --- */}
      <section className="py-16 px-4 md:px-8 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Liability Protection</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Every booking is backed by comprehensive platform safety assurances and security deposits.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Verified Creator Profiles</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Collaborate with confidence knowing members undergo authentication and verified booking histories.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">24/7 Creator Support</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Our support desk is always online to assist with technical adjustments, scheduling, and emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}