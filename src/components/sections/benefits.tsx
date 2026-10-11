import { benefits } from "@/content/site";
import { SectionHeading } from "@/components/brand/section-heading";

export function Benefits() {
  return (
    <section id="lo-que-ofrecemos" aria-labelledby="lo-que-ofrecemos-heading" className="py-16 md:py-24">
      <div className="container-grid">
        <SectionHeading id="lo-que-ofrecemos-heading">{benefits.heading}</SectionHeading>

        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2 md:mt-20">
          {benefits.items.map((item) => (
            <li key={item.title} className="mx-auto flex max-w-[360px] flex-col items-center text-center">
              {/*
                Rendered as <img>, not inlined: 346x346 decorative art used once
                and never recoloured. Note these keep a literal #8e7d6b rather
                than currentColor — inside an <img>-loaded SVG, currentColor
                resolves against the SVG's own root colour, i.e. black.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                width={172}
                height={172}
                loading="lazy"
                decoding="async"
                className="size-[132px] md:size-[172px]"
              />

              <h3 className="text-brand-700 mt-6 text-sm font-bold uppercase md:text-base">
                {item.title}
              </h3>

              {/*
                The comp sets this copy in taupe (#8e7d6b on white ≈ 2.9:1),
                below the 4.5:1 AA minimum for body text. Using the guide's own
                designated text colour instead — see README.
              */}
              <p className="text-brand-700 mt-2 text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
