import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { getStudioLocation } from "@/lib/api";
import type { Studio } from "@/types/studio";

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Link
        href={`/studios/${studio._id}`}
        className="relative block aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        <Image
          src={studio.thumbnail || studio.imageUrl || studio.images?.[0] || "/window.svg"}
          alt={studio.title}
          width={400}
          height={250}
          className="object-cover w-full h-full"
        />
        {/* <Image
          src={studio.images?.[0] || "/window.svg"}
          alt={studio.title}
          width={400}
          height={250}
          className="object-cover w-full h-full"
        /> */}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
          {studio.category}
        </span>
        {typeof studio.rating === "number" && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {studio.rating.toFixed(1)}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white">
          {studio.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={15} className="shrink-0" />
          <span className="line-clamp-1">
            {getStudioLocation(studio.location) ||
              "Location available on request"}
          </span>
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">
            ${studio.hourlyRate}
            <span className="ml-1 text-sm font-medium text-slate-500">
              / hr
            </span>
          </p>
          <Link
            href={`/studios/${studio._id}`}
            className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
