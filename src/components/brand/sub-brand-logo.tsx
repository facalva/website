import { brandNav } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The Alvarado Collection and mónica logotypes, used in the header (light, on
 * brown) and the drawer (dark, on white). Both are outlined artwork, not type:
 * "mónica" in particular is custom lettering and must never be typeset.
 *
 * Heights differ per brand because the marks have different proportions —
 * the comp sets them to equal optical weight, not equal height.
 */
const HEIGHTS = {
  header: { alvarado: "h-3", monica: "h-4" },
  drawer: { alvarado: "h-3.5", monica: "h-5" },
} as const;

export function SubBrandLogo({
  brand,
  tone,
  size,
  className,
}: {
  brand: keyof typeof brandNav;
  tone: "light" | "dark";
  size: keyof typeof HEIGHTS;
  className?: string;
}) {
  const { label, wordmark } = brandNav[brand];
  const height = size === "header" ? 16 : 20;

  return (
    // Plain <img>: next/image would need dangerouslyAllowSVG for no benefit.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={wordmark[tone]}
      alt={label}
      width={Math.round(wordmark.ratio * height)}
      height={height}
      className={cn("w-auto", HEIGHTS[size][brand], className)}
    />
  );
}
