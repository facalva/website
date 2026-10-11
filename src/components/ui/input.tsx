import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Input — base text field. The style guide documents two treatments (a
 * light "General" field and the dark header search); this carries the shared
 * behaviour and each call site overrides the skin.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base outline-none",
        "transition-colors placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
