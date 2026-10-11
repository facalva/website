import { cn } from "@/lib/utils";

/**
 * The FACALVA wordmark, rendered as real text rather than the supplied SVG.
 *
 * `Facalva logo principal.svg` contains a live <text> element in
 * ProximaNova-Bold — as an <img> it would fall back to a serif and look wrong,
 * and inlined it would be a fixed-offset tspan layout that can't reflow, isn't
 * selectable and isn't in the accessibility tree. Since Proxima Bold is
 * already a loaded webfont, setting the type directly is both more faithful
 * and more useful.
 */
export function FacalvaWordmark({
  tone = "light",
  size = "header",
  className,
}: {
  tone?: "light" | "dark";
  size?: "header" | "drawer";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-bold tracking-wordmark whitespace-nowrap uppercase select-none",
        // letter-spacing also adds a gap AFTER the final letter, which pushes a
        // wide-tracked wordmark visibly left of true centre inside a centred
        // grid cell. Cancel the trailing gap.
        "[margin-inline-end:-0.16em]",
        tone === "light" ? "text-white" : "text-brand-900",
        size === "header" ? "text-[20px] leading-none md:text-[22px]" : "text-[28px] leading-none",
        className,
      )}
    >
      Facalva
    </span>
  );
}
