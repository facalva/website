import Image from "next/image";
import Link from "next/link";

import { nuestrosPasos } from "@/content/site";

export function NuestrosPasosBanner() {
  return (
    <Link
      href={nuestrosPasos.href}
      /* Taller on mobile so the headline isn't crammed against the shoes; the
         comp gives it roughly a 3:2 block at phone widths. */
      className="group relative block aspect-[3/2] w-full overflow-hidden sm:aspect-[16/7] md:aspect-[16/6]"
    >
      <Image
        src="/img/nuestros-pasos.webp"
        alt={nuestrosPasos.imageAlt}
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {/* Left-weighted scrim: the headline sits left, the shoes sit right. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="container-grid">
          <h2 className="tracking-display text-[clamp(1.5rem,5.5vw,3.5rem)] leading-[1.15] text-white uppercase">
            {nuestrosPasos.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </Link>
  );
}
