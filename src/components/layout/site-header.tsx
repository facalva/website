import Link from "next/link";

import { brandNav, features, secondaryNav } from "@/content/site";
import { FacalvaWordmark } from "@/components/brand/facalva-wordmark";
import { SubBrandLogo } from "@/components/brand/sub-brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchField } from "@/components/layout/search-field";
import { cn } from "@/lib/utils";

/**
 * While the right-hand tools (Nuestros Pasos / Contacto / search) are hidden,
 * mónica moves right to balance Alvarado Collection on the left. Turning
 * either feature back on restores the comp's arrangement.
 */
const showRightTools = features.secondaryNav || features.search;

function BrandLink({ brand }: { brand: keyof typeof brandNav }) {
  return (
    <Link href={brandNav[brand].href} className="flex items-center transition-opacity hover:opacity-70">
      <SubBrandLogo brand={brand} tone="light" size="header" />
    </Link>
  );
}

function HomeLink({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="FACALVA — Inicio" className={className}>
      <FacalvaWordmark />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-(--spacing-header) bg-brand-900">
      {/* ── below lg: hamburger · centred wordmark (· search) ── */}
      <div
        className={cn(
          "mx-auto h-full items-center gap-3 px-3 lg:hidden",
          features.search ? "flex" : "grid grid-cols-[1fr_auto_1fr]",
        )}
      >
        <MobileNav />
        <HomeLink className={features.search ? "" : "justify-self-center"} />
        {features.search && <SearchField className="ml-auto max-w-[260px]" />}
      </div>

      {/*
        ── lg and up: three zones ──
        A grid, not justify-between. The side groups can have very different
        widths, so space-between would push the FACALVA lockup off true centre.
      */}
      <div className="mx-auto hidden h-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-10 lg:grid">
        <nav aria-label="Colecciones" className="flex items-center gap-8">
          <BrandLink brand="alvarado" />
          {showRightTools && <BrandLink brand="monica" />}
        </nav>

        <HomeLink className="justify-self-center" />

        <div className="flex items-center justify-end gap-6">
          {!showRightTools && <BrandLink brand="monica" />}

          {features.secondaryNav && (
            <nav aria-label="Secundaria" className="flex items-center gap-6">
              {secondaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] tracking-eyebrow whitespace-nowrap text-white uppercase transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {features.search && <SearchField className="w-[210px]" />}
        </div>
      </div>
    </header>
  );
}
