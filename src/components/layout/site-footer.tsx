import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { contact, features, social } from "@/content/site";

/**
 * Evaluated at build time, not render time — calling new Date() inside the
 * component would produce a server/client mismatch at a year boundary.
 */
const YEAR = new Date().getFullYear();

const contactRows = [
  { Icon: MapPinIcon, label: contact.address, href: contact.addressHref, external: true },
  { Icon: PhoneIcon, label: contact.phone, href: contact.phoneHref, external: false },
  { Icon: MailIcon, label: contact.email, href: contact.emailHref, external: false },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-surface-50">
      <div className="container-grid py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-brand-700 uppercase">{contact.heading}</h2>

            <ul className="flex flex-col gap-2.5 text-sm text-brand-700">
              {contactRows.map(({ Icon, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex items-start gap-3 transition-colors hover:text-brand-500"
                  >
                    <Icon strokeWidth={1.5} className="mt-px size-[18px] shrink-0 text-taupe-500" />
                    <span className="max-w-[46ch]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {features.socialLinks && (
            <ul className="flex items-center gap-4">
              {social.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="block transition-opacity hover:opacity-70"
                  >
                    {/* Brand marks, not lucide: lucide has no WhatsApp and its
                        brand icons are deprecated. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/icons/social/${id}.svg`} alt="" width={32} height={32} className="size-8" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-10 text-xs text-taupe-500">
          {contact.rights} {YEAR}
        </p>
      </div>
    </footer>
  );
}
