import { contact, social } from "@/content/site";
import {
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/icons";

const SOCIAL_ICONS = {
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
} as const;

/**
 * Evaluated at build time, not render time — calling new Date() inside the
 * component would produce a server/client mismatch at a year boundary.
 */
const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="bg-surface-50">
      <div className="container-grid py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-brand-700 text-base font-bold uppercase">{contact.heading}</h2>

            <ul className="text-brand-700 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={contact.addressHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition-colors hover:text-brand-500"
                >
                  <LocationIcon className="text-taupe-500 mt-0.5 h-[18px] w-[14px] shrink-0" />
                  <span className="max-w-[46ch]">{contact.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-brand-500"
                >
                  <PhoneIcon className="text-taupe-500 h-[15px] w-[18px] shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="flex items-center gap-3 transition-colors hover:text-brand-500"
                >
                  <MailIcon className="text-taupe-500 h-[12px] w-[18px] shrink-0" />
                  <span>{contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <ul className="flex items-center gap-4">
            {social.map(({ id, label, href }) => {
              const Icon = SOCIAL_ICONS[id];
              return (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-taupe-500 hover:text-brand-700 block transition-colors"
                  >
                    <Icon className="size-8" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-taupe-500 mt-10 text-xs">
          {contact.rights} {YEAR}
        </p>
      </div>
    </footer>
  );
}
