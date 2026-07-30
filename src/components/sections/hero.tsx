import Image from "next/image";

import { hero } from "@/content/site";
import { ChevronDownIcon } from "@/components/icons";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      /* svh, not vh — on iOS, 100vh includes the collapsing URL bar and the
         section overflows the viewport on first paint. */
      className="relative flex max-h-[980px] min-h-[520px] items-center justify-center overflow-hidden md:h-[calc(100svh-var(--spacing-header))]"
    >
      <Image
        src="/img/hero-artesano.webp"
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        /* Biased right of centre so the artisan's hands stay in frame when the
           box goes tall and narrow on mobile. */
        className="object-cover object-[62%_50%]"
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <h1
          id="hero-heading"
          /* No max-width: the comp sets this on one line at desktop and lets it
             wrap to two only when it genuinely runs out of room on mobile. */
          className="tracking-display text-center text-[clamp(1.75rem,6vw,3.5rem)] leading-[1.15] text-balance text-white uppercase"
        >
          {hero.title}
        </h1>
        <div className="h-px w-40 bg-white/70 md:w-56" aria-hidden="true" />
      </div>

      {/* Mobile-only scroll cue, per the comp. */}
      <a
        href="#lo-que-ofrecemos"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white transition-opacity hover:opacity-70 md:hidden"
      >
        <span className="sr-only">{hero.scrollLabel}</span>
        <ChevronDownIcon className="h-4 w-8" />
      </a>
    </section>
  );
}
