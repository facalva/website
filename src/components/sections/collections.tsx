import Image from "next/image";
import Link from "next/link";

import { collections, SHOW_COLLECTIONS_ON_MOBILE } from "@/content/site";
import { cn } from "@/lib/utils";

export function Collections() {
  return (
    <section
      aria-label="Nuestras colecciones"
      className={cn(
        "grid grid-cols-1 md:grid-cols-2",
        !SHOW_COLLECTIONS_ON_MOBILE && "hidden md:grid",
      )}
    >
      {collections.map((c) => (
        <Link
          key={c.id}
          href={c.href}
          className={cn(
            "group flex flex-col items-center gap-6 px-6 py-14 text-center md:py-20",
            c.surface,
          )}
        >
          {/*
            Brand logos stay as separate SVG documents: they're multi-colour and
            must never inherit currentColor. Plain <img> rather than next/image
            — the latter needs dangerouslyAllowSVG, which turns on SVG handling
            app-wide for no benefit, and Next can't shrink an SVG anyway.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.logo}
            alt={c.logoAlt}
            width={c.logoWidth}
            height={c.logoHeight}
            className="h-16 w-auto object-contain md:h-20"
          />

          <div className="border-taupe-300 relative flex h-40 w-56 items-center justify-center border md:h-48 md:w-72">
            {/* The comp lets the shoe overflow its frame slightly. */}
            <Image
              src={c.photo}
              alt={c.photoAlt}
              width={c.photoWidth}
              height={c.photoHeight}
              sizes="(min-width: 768px) 320px, 260px"
              className="max-h-none w-[115%] max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>

          <div className="text-taupe-500 flex flex-col gap-1">
            <span className="tracking-eyebrow text-xs uppercase md:text-sm">{c.eyebrow}</span>
            <span className="text-2xl uppercase md:text-[2rem] md:leading-tight">{c.title}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
