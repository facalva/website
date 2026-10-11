import Link from "next/link";

import { nav } from "@/content/site";
import { FacalvaWordmark } from "@/components/brand/facalva-wordmark";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchField } from "@/components/layout/search-field";

const [alvarado, monica, ...rightNav] = nav;

export function SiteHeader() {
  return (
    <header className="bg-brand-900 sticky top-0 z-50 h-(--spacing-header)">
      <div className="mx-auto flex h-full max-w-[1600px] items-center gap-3 px-5 lg:gap-6 lg:px-10">
        {/* ── below lg: hamburger · wordmark · search fills the remainder ── */}
        <MobileNav />

        <Link href="/" className="lg:hidden" aria-label="FACALVA — Inicio">
          <FacalvaWordmark />
        </Link>

        <SearchField className="ml-auto w-full max-w-[260px] lg:hidden" />

        {/*
          ── lg and up: three zones ──
          A grid, not justify-between. The left group (two sub-brand wordmarks)
          and right group (two links + search) have very different widths, so
          space-between would push the FACALVA lockup off true centre — the comp
          has it dead centre at ~49.7% of the viewport.
        */}
        <div className="hidden w-full grid-cols-[1fr_auto_1fr] items-center lg:grid">
          <nav aria-label="Colecciones" className="flex items-center gap-8">
            {[alvarado, monica].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center transition-opacity hover:opacity-70"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.wordmark.light}
                  alt={item.label}
                  width={Math.round(item.wordmark.ratio * 14)}
                  height={14}
                  className={item.label === "mónica" ? "h-4 w-auto" : "h-3 w-auto"}
                />
              </Link>
            ))}
          </nav>

          <Link href="/" aria-label="FACALVA — Inicio" className="justify-self-center">
            <FacalvaWordmark />
          </Link>

          <div className="flex items-center justify-end gap-6">
            <nav aria-label="Secundaria" className="flex items-center gap-6">
              {rightNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="tracking-eyebrow text-[11px] whitespace-nowrap text-white uppercase transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <SearchField className="w-[210px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
