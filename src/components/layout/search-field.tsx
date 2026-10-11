import { SearchIcon } from "lucide-react";

import { search } from "@/content/site";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

/**
 * Header search, per the style guide's "Búsqueda" spec: dark brown field with
 * an attached burnt-orange square button. Composed entirely from shadcn's
 * InputGroup; only the skin is set here.
 *
 * Hidden until search is implemented (`features.search` in content/site.ts).
 * There is no product catalogue yet, so there is nothing to submit to.
 */
export function SearchField({ className }: { className?: string }) {
  return (
    <form role="search" className={cn("w-full", className)}>
      <InputGroup className="h-8 border-brand-500 bg-brand-900">
        <InputGroupInput
          type="search"
          name="q"
          aria-label={search.label}
          placeholder={search.placeholder}
          className="text-white placeholder:text-taupe-300"
        />
        <InputGroupAddon align="inline-end" className="h-full p-0 has-[>button]:mr-0">
          <InputGroupButton
            type="submit"
            size="icon-sm"
            className="h-full bg-brand-500 text-white hover:bg-brand-500/85 hover:text-white"
          >
            <SearchIcon strokeWidth={1.5} />
            <span className="sr-only">{search.submitLabel}</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
