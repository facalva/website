"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { brandNav, features, secondaryNav } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FacalvaWordmark } from "@/components/brand/facalva-wordmark";
import { SubBrandLogo } from "@/components/brand/sub-brand-logo";
import { cn } from "@/lib/utils";

const navLinkClass = "h-auto min-h-13 w-full justify-start px-8 py-4";

/** Tablet and mobile navigation drawer. Hidden from lg up. */
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Abrir menú"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
        >
          <MenuIcon strokeWidth={1.5} className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="gap-0 lg:hidden">
        <SheetHeader className="gap-6 px-8 pt-7 pb-0">
          {/* Radix requires a dialog title; the comp shows the wordmark instead. */}
          <SheetTitle className="sr-only">Menú principal</SheetTitle>
          <FacalvaWordmark tone="dark" size="drawer" />
          <Separator />
        </SheetHeader>

        <nav className="mt-2 flex flex-col">
          {(Object.keys(brandNav) as (keyof typeof brandNav)[]).map((brand) => (
            <SheetClose asChild key={brand}>
              <Button asChild variant="ghost" className={navLinkClass}>
                <Link href={brandNav[brand].href}>
                  <SubBrandLogo brand={brand} tone="dark" size="drawer" />
                </Link>
              </Button>
            </SheetClose>
          ))}

          {features.secondaryNav &&
            secondaryNav.map((item) => (
              <SheetClose asChild key={item.label}>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(navLinkClass, "font-normal tracking-eyebrow text-brand-700 uppercase")}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </SheetClose>
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
