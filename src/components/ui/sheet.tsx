"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/icons";

/**
 * Sheet — the tablet/mobile navigation drawer.
 *
 * Built on Radix Dialog for the things that are tedious to get right by hand:
 * focus trap, focus restoration on close, Esc handling, scroll lock, `inert`
 * on the background, and the portal + ARIA wiring.
 *
 * The close affordance is the brand's own X (a dark-brown glyph inside a
 * 14%-opacity taupe square), not a generic icon.
 */
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-brand-900/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { title: string }) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-[85%] max-w-sm flex-col gap-0 bg-white shadow-xl md:w-[52%]",
          "transition ease-in-out",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=open]:duration-300",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=closed]:duration-200",
          className,
        )}
        {...props}
      >
        {/* Radix requires an accessible title. The comp doesn't show one, so
            it's visually hidden rather than omitted. */}
        <SheetPrimitive.Title className="sr-only">{title}</SheetPrimitive.Title>

        <SheetPrimitive.Close
          aria-label="Cerrar menú"
          className="absolute top-5 right-5 text-brand-900 transition-opacity hover:opacity-70"
        >
          <CloseIcon className="size-8" />
        </SheetPrimitive.Close>

        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
