import type { Metadata } from "next";

import "./globals.css";
import { proxima } from "./fonts";
import { contact, site } from "@/content/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/img/hero-artesano.webp", width: 1920, height: 1281, alt: site.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/img/hero-artesano.webp"],
  },
};

/** Structured data so the Mixco address and phone are machine-readable. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ShoeStore",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "0 avenida C 3-36 zona 4",
    addressLocality: "Mixco",
    addressRegion: "Guatemala",
    addressCountry: "GT",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${proxima.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#lo-que-ofrecemos"
          className="bg-brand-900 sr-only px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
