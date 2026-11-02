"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Users } from "lucide-react";
import BookingSection from "./BookingSection";
import { ApiError, apiRequest, getStudioLocation } from "@/lib/api";
import type { Studio } from "@/types/studio";

export default function StudioDetail({ id }: { id: string }) {
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let active = true;
    async function loadStudio() {
      try {
        const data = await apiRequest<Studio>(
          `/studios/${encodeURIComponent(id)}`,
        );
        if (!data || typeof data !== "object" || !data._id)
          throw new Error("The studio API returned an invalid listing.");
        if (active) {
          setStudio(data);
          setSelectedImage(data.thumbnail || data.images?.[0] || "");
          // setSelectedImage(data.imageUrl);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError
              : new Error("Unable to load this studio."),
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStudio();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-5 py-12">
        <div className="h-8 w-40 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 aspect-[16/7] rounded-3xl bg-slate-100 dark:bg-slate-900" />
        <div className="mt-6 h-48 rounded-3xl bg-slate-100 dark:bg-slate-900" />
      </div>
    );
  }

  if (error || !studio) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
          {notFound ? "Space not found" : "Unable to load this space"}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
          {notFound
            ? "This studio is no longer available."
            : "We couldn’t reach the studio details."}
        </h1>
        {!notFound && (
          <p
            role="alert"
            className="mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400"
          >
            {error?.message}
          </p>
        )}
        <Link
          href="/studios"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
        >
          <ArrowLeft size={17} /> Back to studios
        </Link>
      </div>
    );
  }

  const images = Array.from(
    new Set(
      [...(studio?.images ?? [])].filter((img): img is string => Boolean(img)),
    ),
  ).filter((img) => img !== studio?.thumbnail);

  // const images = Array.from(
  //   new Set(
  //     [studio.thumbnail, ...(studio.images ?? [])].filter(
  //       (img): img is string => Boolean(img),
  //     ),
  //   ),
  // );
  // const images = Array.from(new Set([studio.imageUrl, ...(studio.images ?? [])].filter(Boolean)));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
      <Link
        href="/studios"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-400"
      >
        <ArrowLeft size={16} /> All studios
      </Link>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            {studio.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {studio.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <MapPin size={16} />
            {getStudioLocation(studio.location)}
          </p>
        </div>
        {typeof studio.rating === "number" && (
          <p className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <Star size={17} className="fill-amber-400 text-amber-400" />
            {studio.rating.toFixed(1)}{" "}
            <span className="font-normal text-slate-500">
              ({studio.reviews?.length ?? 0} reviews)
            </span>
          </p>
        )}
      </div>

      <div className="mt-7 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 sm:min-h-[450px]">
          <Image
            src={
              selectedImage ||
              studio?.imageUrl ||
              studio?.thumbnail ||
              studio?.images?.[0] ||
              "/window.svg"
            }
            alt={studio?.title || "Studio image"}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover"
          />

          {/* <Image
            src={
              selectedImage ||
              studio.thumbnail ||
              studio.images?.[0] ||
              "/window.svg"
            }
            alt={studio.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover"
          /> */}
          {/* <Image src={selectedImage || '/window.svg'} alt={studio.title} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /> */}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {studio.imageUrl && studio.imageUrl !== selectedImage && (
            <button
              type="button"
              onClick={() => setSelectedImage(studio.imageUrl)}
              aria-label="View studio photo"
              className={`relative min-h-36 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 sm:min-h-52 lg:min-h-0 ${selectedImage === studio.imageUrl ? "ring-2 ring-sky-500" : ""}`}
            >
              <Image
                src={studio.imageUrl}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 1024px) 50vw, 35vw"
                className="object-cover transition hover:scale-105"
              />
            </button>
          )}

          
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              About this space
            </h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-600 dark:text-slate-300">
              {studio.overview || "The host has not added a description yet."}
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Amenities
            </h2>
            {studio.amenities?.length ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {studio.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300"
                  >
                    ✓ {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Ask the host about available amenities.
              </p>
            )}
          </section>
          <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Hosted by
            </p>
            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              {studio.hostName || "StudioSpace host"}
            </p>
          </section>
          {studio.reviews?.length ? (
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Guest reviews
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {studio.reviews.map((review, index) => (
                  <article
                    key={review._id ?? index}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {review.authorName}
                    </p>
                    <p className="mt-1 text-sm text-amber-600">
                      ★ {review.rating}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10 lg:sticky lg:top-24">
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            ${studio.hourlyRate}
            <span className="ml-1 text-sm font-medium text-slate-500">
              / hour
            </span>
          </p>
          <div className="mt-5 space-y-3 border-y border-slate-100 py-4 text-sm dark:border-slate-800">
            <p className="flex items-center justify-between">
              <span className="text-slate-500">Security deposit</span>
              <strong>${studio.securityDeposit}</strong>
            </p>
            <p className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-slate-500">
                <Users size={15} /> Capacity
              </span>
              <strong>{studio.maxCapacity} guests</strong>
            </p>
          </div>
          <BookingSection studio={studio} />
        </aside>
      </div>
    </div>
  );
}
