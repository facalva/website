import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button — the style guide's "Botones / Primario" spec.
 *
 * The guide documents exactly two states: passive is filled taupe with white
 * text, active/hover inverts to a white fill with a taupe border and taupe
 * text. That inversion is the whole spec, so it's encoded here once rather
 * than re-derived at each call site.
 *
 * Only the variants this site actually uses are defined. Unused cva branches
 * are dead code that still has to be read.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold " +
    "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Guide: Primario. Passive = filled taupe; active = inverted. */
        brand:
          "border border-taupe-500 bg-taupe-500 text-white tracking-eyebrow uppercase " +
          "hover:bg-white hover:text-taupe-500",
        /** The orange square submit attached to the header search field. */
        search: "bg-brand-500 text-white hover:bg-brand-500/85",
      },
      size: {
        default: "h-11 px-8",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "brand", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
