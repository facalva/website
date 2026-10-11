import { search } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * The header search field.
 *
 * There is no product catalogue behind it yet, so it is rendered per the style
 * guide but deliberately inert and visibly de-emphasised — a control that
 * looks live but silently does nothing is worse than one that reads as
 * not-yet-available. Disabled + reduced opacity + an explanatory title, and it
 * stays out of the tab order.
 */
export function SearchField({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex h-8 items-stretch opacity-45", className)}
      title={search.unavailableNote}
    >
      <Input
        type="search"
        disabled
        aria-disabled="true"
        tabIndex={-1}
        aria-label={search.label}
        placeholder={search.placeholder}
        className={cn(
          "border-brand-500 bg-brand-900 h-full rounded-none border-r-0 text-white",
          "placeholder:text-taupe-300 disabled:cursor-not-allowed disabled:opacity-100",
        )}
      />
      <Button
        variant="search"
        size="icon"
        disabled
        aria-disabled="true"
        tabIndex={-1}
        className="h-full w-9 rounded-none disabled:opacity-100"
      >
        <span className="sr-only">{search.unavailableNote}</span>
        <SearchIcon className="h-4 w-3" />
      </Button>
    </div>
  );
}
