"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock3 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";
import type { Booking, BookingStatus } from "@/types/studio";

const statusStyles: Record<BookingStatus, string> = {
  Pending:
    "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  Confirmed:
    "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  Completed: "bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
  Cancelled:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, router, user]);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function loadBookings() {
      try {
        // const data = await apiRequest<Booking[]>('/my-bookings');
        // সঠিক কোড
        const data = await apiRequest<Booking[]>(
          `/my-bookings?email=${user?.email}`,
        );

        if (!Array.isArray(data))
          throw new Error("The bookings API returned an invalid list.");
        // if (active) setBookings(data);
        if (active) {
          // ⬇️ এখানে ফিল্টার করে শুধু active বুকিংগুলো সেভ করবেন
          const activeBookings = data.filter((item) => item.status !== "Cancelled");
          setBookings(activeBookings);
        }
      } catch (requestError) {
        if (active)
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load your bookings.",
          );
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadBookings();
    return () => {
      active = false;
    };
  }, [user]);

  
  const cancelBooking = async (booking: Booking) => {
    setCancellingId(booking._id);
    try {
      // ব্যাকএন্ডে প্যাচ রিকোয়েস্ট পাঠানো
      await apiRequest<unknown>(
        `/bookings/cancel/${encodeURIComponent(booking._id)}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: "Cancelled" }),
        },
      );

      // সফলভাবে ব্যাকএন্ডে আপডেট হওয়ার পর স্টেট থেকে এই আইডিটি ফিল্টার করে বাদ দেওয়া
      setBookings((currentBookings) =>
        currentBookings.filter((item) => item._id !== booking._id),
      );

      toast.success("Booking cancelled and removed.");
    } catch (requestError) {
      toast.error(
        requestError instanceof Error
          ? requestError.message
          : "Unable to cancel this booking.",
      );
    } finally {
      setCancellingId("");
    }
  };

  //
  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-5 py-16">
        <div className="h-10 w-64 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 h-72 rounded-3xl bg-slate-100 dark:bg-slate-900" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
          Your upcoming sessions
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          My bookings
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Keep track of the spaces and sessions you have reserved.
        </p>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/30"
          >
            <h2 className="font-bold text-slate-900 dark:text-white">
              Your bookings could not be loaded.
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {error}
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
            <CalendarDays size={30} className="mx-auto text-sky-600" />
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              No bookings yet.
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Your next great session starts with finding the right space.
            </p>
            <Link
              href="/studios"
              className="mt-5 inline-block rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
            >
              Explore studios
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:flex-row"
              >
                <div className="relative min-h-48 bg-slate-100 dark:bg-slate-800 sm:w-48 sm:shrink-0">
                  {booking.studioImage ? (
                    <Image
                      src={booking.studioImage}
                      alt={booking.studioTitle || "Studio"}
                      fill
                      unoptimized
                      sizes="192px"
                      className="object-cover"
                    />
                  ) : (
                    <CalendarDays
                      size={36}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      {booking.studioTitle}
                    </h2>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      {new Date(
                        `${booking.bookingDate}T00:00:00`,
                      ).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock3 size={15} />
                      {booking.startTime} – {booking.endTime}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">
                      ${booking.totalPrice.toFixed(2)}
                    </p>
                    {booking.status === "Pending" && (
                      <button
                        onClick={() => void cancelBooking(booking)}
                        disabled={cancellingId === booking._id}
                        className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/40"
                      >
                        {cancellingId === booking._id
                          ? "Cancelling…"
                          : "Cancel booking"}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
