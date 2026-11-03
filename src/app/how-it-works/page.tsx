// "use client"; // If using client-side hooks like useState in App Router

// import React, { useState } from "react";
// import Link from "next/link";
// import { 
//   Camera, 
//   Calendar, 
//   ShieldCheck, 
//   Sparkles, 
//   DollarSign, 
//   Users, 
//   CheckCircle2, 
//   HelpCircle, 
//   ArrowRight,
//   Layers,
//   Clock,
//   Lock
// } from "lucide-react";

// export default function HowItWorksPage() {
//   const [activeTab, setActiveTab] = useState<"creators" | "hosts">("creators");

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
//       {/* --- HERO SECTION --- */}
//       <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white text-center overflow-hidden">
//         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
//         <div className="max-w-4xl mx-auto relative z-10">
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 border border-indigo-500/30">
//             <Sparkles className="w-4 h-4" /> Production Workflow Simplified
//           </span>
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
//             How <span className="text-indigo-400">StudioSpace</span> Works
//           </h1>
//           <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
//             Whether you are a filmmaker searching for the ultimate cyc wall or a studio owner looking to monetize your production space, we’ve made booking seamless and secure.
//           </p>

//           {/* Tab Switcher */}
//           <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/80 backdrop-blur border border-slate-700 shadow-xl">
//             <button
//               onClick={() => setActiveTab("creators")}
//               className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
//                 activeTab === "creators"
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
//                   : "text-slate-400 hover:text-white"
//               }`}
//             >
//               For Creators & Filmmakers
//             </button>
//             <button
//               onClick={() => setActiveTab("hosts")}
//               className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
//                 activeTab === "hosts"
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
//                   : "text-slate-400 hover:text-white"
//               }`}
//             >
//               For Studio Hosts
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* --- MAIN WORKFLOW SECTION --- */}
//       <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
//         {activeTab === "creators" ? (
//           <div>
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               <h2 className="text-3xl font-bold mb-4">Your Journey as a Creator</h2>
//               <p className="text-slate-600 dark:text-slate-400">
//                 From finding the exact aesthetic you need to bringing your production to life in 4 simple steps.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {/* Step 1 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   01
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Camera className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Discover Spaces</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Browse through photo cyc walls, cinema sound stages, podcast lounges, and music suites with advanced category filters.
//                 </p>
//               </div>

//               {/* Step 2 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   02
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Calendar className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Select Shoot Hours</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Check dynamic availability, calculate total hourly rates, review security deposits, and pick your exact time slots.
//                 </p>
//               </div>

//               {/* Step 3 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   03
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Lock className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Secure your reservation instantly with double-booking prevention protection and transparent checkout.
//                 </p>
//               </div>

//               {/* Step 4 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   04
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Sparkles className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Create & Produce</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Check-in at the studio, access professional amenities, shoot your masterpiece, and share feedback.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-12 text-center">
//               <Link
//                 href="/studios"
//                 className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
//               >
//                 Explore Available Studios <ArrowRight className="w-5 h-5" />
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               <h2 className="text-3xl font-bold mb-4">Monetize Your Creative Space</h2>
//               <p className="text-slate-600 dark:text-slate-400">
//                 Turn your empty studio hours into revenue with complete control, liability protection, and verified creators.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {/* Host Step 1 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   01
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Layers className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">List Your Space</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Provide studio specs, hourly rates, security deposits, high-resolution photo URLs, and specific equipment lists.
//                 </p>
//               </div>

//               {/* Host Step 2 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   02
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Clock className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Set Rules & Pricing</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Define your calendar availability, maximum capacity, house rules, and amenities tags effortlessly through your dashboard.
//                 </p>
//               </div>

//               {/* Host Step 3 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   03
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <Users className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Manage Bookings</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Review pending reservation slots, track confirmed bookings, and update or modify your listings anytime from My Listings.
//                 </p>
//               </div>

//               {/* Host Step 4 */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-indigo-500 transition-all">
//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
//                   04
//                 </div>
//                 <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
//                   <DollarSign className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">Earn Secure Payouts</h3>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                   Get reliable earnings with built-in host protection guarantee, verified creator profiles, and 24/7 support.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-12 text-center">
//               <Link
//                 href="/add-studio"
//                 className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
//               >
//                 Host Your Space Today <ArrowRight className="w-5 h-5" />
//               </Link>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* --- TRUST & HOST GUARANTEE SECTION --- */}
//       <section className="py-16 px-4 md:px-8 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="flex gap-4 items-start">
//             <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-2">Liability Protection</h4>
//               <p className="text-slate-600 dark:text-slate-400 text-sm">
//                 Every booking is backed by comprehensive platform safety assurances and security deposits.
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-4 items-start">
//             <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
//               <CheckCircle2 className="w-6 h-6" />
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-2">Verified Creator Profiles</h4>
//               <p className="text-slate-600 dark:text-slate-400 text-sm">
//                 Collaborate with confidence knowing members undergo authentication and verified booking histories.
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-4 items-start">
//             <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
//               <HelpCircle className="w-6 h-6" />
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-2">24/7 Creator Support</h4>
//               <p className="text-slate-600 dark:text-slate-400 text-sm">
//                 Our support desk is always online to assist with technical adjustments, scheduling, and emergencies.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }


"use client";

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
    <div className="min-h-screen bg-[#07090e] text-slate-100 transition-colors duration-300 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#0d1322] via-[#090d16] to-[#07090e] border-b border-[#172033] text-center overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-xs md:text-sm font-medium mb-6 border border-sky-500/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-400" /> Production Workflow Simplified
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            How <span className="text-[#00a3ff]">StudioSpace</span> Works
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are a creator searching for the ultimate cyc wall or a studio owner looking to monetize your space, we’ve made booking seamless and secure.
          </p>

          {/* Tab Switcher (Matching Top Bar Style) */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0f172a]/90 backdrop-blur-md border border-[#1e293b] shadow-2xl">
            <button
              onClick={() => setActiveTab("creators")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === "creators"
                  ? "bg-[#00a3ff] text-white shadow-lg shadow-sky-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              For Creators &amp; Filmmakers
            </button>
            <button
              onClick={() => setActiveTab("hosts")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === "hosts"
                  ? "bg-[#00a3ff] text-white shadow-lg shadow-sky-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
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
              <span className="text-xs uppercase tracking-widest font-semibold text-sky-400 mb-2 block">
                CREATOR JOURNEY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                From Idea to Production
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Find the exact aesthetic you need and bring your project to life in 4 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      01
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Discover Spaces</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Browse photo cyc walls, cinema sound stages, podcast lounges, and music suites with advanced filtering.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      02
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Select Shoot Hours</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Check dynamic availability, calculate total hourly rates, review security deposits, and pick your time slots.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      03
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Instant Booking</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Secure your reservation instantly with double-booking prevention protection and transparent checkout.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      04
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Create &amp; Produce</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Check-in at the studio, access professional amenities, shoot your project, and leave a verified review.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-14 text-center">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 bg-[#00a3ff] hover:bg-sky-500 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:gap-3"
              >
                Explore Available Studios <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest font-semibold text-sky-400 mb-2 block">
                HOST WORKFLOW
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Monetize Your Creative Space
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Turn unused studio hours into steady revenue with full control, safety features, and verified creators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Host Step 1 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      01
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">List Your Space</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Provide studio specs, hourly rates, security deposits, high-resolution photos, and equipment details.
                  </p>
                </div>
              </div>

              {/* Host Step 2 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      02
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Set Rules &amp; Pricing</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Define availability, guest capacity, house rules, and specialized tags directly from your host dashboard.
                  </p>
                </div>
              </div>

              {/* Host Step 3 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      03
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Manage Bookings</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Review pending requests, track upcoming sessions, and edit your listings anytime from My Listings.
                  </p>
                </div>
              </div>

              {/* Host Step 4 */}
              <div className="bg-[#0f172a]/70 hover:bg-[#0f172a] p-8 rounded-2xl border border-[#1e293b] hover:border-sky-500/50 shadow-lg relative group transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-sky-500/40 transition-colors">
                      04
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Earn Secure Payouts</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Receive payouts directly with built-in host protection, verified profiles, and 24/7 dedicated support.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-14 text-center">
              <Link
                href="/add-studio"
                className="inline-flex items-center gap-2 bg-[#00a3ff] hover:bg-sky-500 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:gap-3"
              >
                Host Your Space Today <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* --- TRUST & HOST GUARANTEE SECTION (Dark Modern Card Banner) --- */}
      <section className="py-16 px-4 md:px-8 bg-[#0b0f19] border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto bg-[#0f172a]/50 p-8 md:p-12 rounded-3xl border border-[#1e293b] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-white">Liability Assurance</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every booking is backed by comprehensive platform safety assurances and security deposits.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#00a3ff]/10 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-white">Verified Profiles</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Collaborate with confidence knowing members undergo authentication and booking history checks.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-white">24/7 Dedicated Support</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our support team is online round-the-clock to assist with adjustments, scheduling, and help.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}