"use client";

import Link from "next/link";

import { nav } from "@/content/site";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FacalvaWordmark } from "@/components/brand/facalva-wordmark";
import { HamburgerIcon } from "@/components/icons";

/** Tablet and mobile navigation drawer. Hidden from lg up. */
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Abrir menú"
        className="-m-2 flex size-11 items-center justify-center p-2 text-white transition-opacity hover:opacity-70 lg:hidden"
      >
        <HamburgerIcon className="h-5 w-6" />
      </SheetTrigger>

      <SheetContent title="Menú principal" className="lg:hidden">
        <div className="flex flex-col gap-6 px-8 pt-7">
          <FacalvaWordmark tone="dark" size="drawer" />
          <div className="bg-taupe-300 h-px w-full" aria-hidden="true" />
        </div>

        <nav className="mt-2 flex flex-col">
          {nav.map((item) => (
            <SheetClose asChild key={item.label}>
              <Link
                href={item.href}
                className="text-brand-700 hover:bg-surface-50 flex min-h-[52px] items-center px-8 py-4 text-sm tracking-eyebrow uppercase transition-colors"
              >
                {item.wordmark ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.wordmark.dark}
                    alt={item.label}
                    width={Math.round(item.wordmark.ratio * 18)}
                    height={18}
                    className={item.label === "mónica" ? "h-5 w-auto" : "h-3.5 w-auto"}
                  />
                ) : (
                  item.label
                )}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
