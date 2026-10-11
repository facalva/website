import { cn } from "@/lib/utils";

/**
 * Section heading + hairline rule, per the "LO QUE OFRECEMOS" treatment.
 * The rule is decorative — a div, not a Separator component.
 */
export function SectionHeading({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <h2
        id={id}
        className="text-taupe-500 tracking-eyebrow text-center text-xl uppercase md:text-2xl"
      >
        {children}
      </h2>
      <div className="bg-taupe-300 h-px w-56 max-w-[70%] md:w-80" aria-hidden="true" />
    </div>
  );
}
