/**
 * Every piece of user-facing Spanish copy on the site, in one place.
 *
 * Kept separate from the JSX so wording and accents can be proofread without
 * reading markup. Copy is transcribed verbatim from the 2020 design comps.
 */

/**
 * The mobile comp drops the collections section entirely (hero jumps straight
 * to "Lo que ofrecemos"). We keep it, stacked — it's the only on-page route to
 * either product line, and burying it behind the drawer on the highest-traffic
 * breakpoint loses the primary conversion path. Flip to false to match the
 * comp exactly.
 */
export const SHOW_COLLECTIONS_ON_MOBILE = true;

export const site = {
  name: "FACALVA",
  tagline: "Vanguardia Artesanal",
  description:
    "Empresa guatemalteca con más de 30 años fabricando calzado de cuero legítimo. Calzado para caballero y dama, elaborado con técnicas de confort de la punta al talón.",
  url: "https://facalva.com",
  locale: "es_GT",
} as const;

/**
 * The two sub-brand entries carry their own logotypes rather than being
 * typeset. "mónica" in particular is custom lettering — setting it in Proxima
 * (and uppercasing it, as the nav style would) is simply the wrong mark.
 * Light variants for the dark header, brown for the white drawer; both keep
 * the same aspect ratio, so height alone sizes them.
 */
export const nav = [
  {
    label: "Alvarado Collection",
    href: "#",
    wordmark: { light: "/brand/wordmark-ac-white.svg", dark: "/brand/wordmark-ac-brown.svg", ratio: 16.77 },
  },
  {
    label: "mónica",
    href: "#",
    wordmark: { light: "/brand/wordmark-monica-white.svg", dark: "/brand/wordmark-monica-brown.svg", ratio: 4.35 },
  },
  { label: "Nuestros Pasos", href: "#", wordmark: null },
  { label: "Contacto", href: "#", wordmark: null },
] as const;

export const hero = {
  title: "Vanguardia Artesanal",
  imageAlt: "Artesano trabajando una pieza de cuero en el taller de FACALVA",
  scrollLabel: "Ver más",
} as const;

export const collections = [
  {
    id: "caballero",
    href: "#",
    eyebrow: "Calzado",
    title: "Para Caballero",
    logo: "/brand/logo-alvarado.svg",
    logoAlt: "Alvarado Collection",
    logoWidth: 499,
    logoHeight: 145,
    photo: "/img/calzado-caballero.webp",
    photoAlt: "Zapato formal de cuero negro para caballero, Alvarado Collection",
    photoWidth: 642,
    photoHeight: 481,
    surface: "bg-surface-100",
  },
  {
    id: "dama",
    href: "#",
    eyebrow: "Calzado",
    title: "Para Dama",
    logo: "/brand/logo-monica.svg",
    logoAlt: "mónica",
    logoWidth: 357,
    logoHeight: 193,
    photo: "/img/calzado-dama.webp",
    photoAlt: "Zapato plano de cuero azul para dama, colección mónica",
    photoWidth: 592,
    photoHeight: 444,
    surface: "bg-surface-50",
  },
] as const;

export const benefits = {
  heading: "Lo que ofrecemos",
  items: [
    {
      icon: "/icons/beneficio-1.svg",
      title: "Calzado manufacturado con cuero legítimo de ganado vacuno y ovino",
      body: "Trabajados con la mejor selección de pieles nacionales e importadas de México, Colombia, Ecuador, Costa Rica y otros.",
    },
    {
      icon: "/icons/beneficio-2.svg",
      title: "Fabricado con técnicas de confort de la punta al talón",
      body: "Brindando un producto de calidad para pies delicados.",
    },
    {
      icon: "/icons/beneficio-3.svg",
      title: "Somos una empresa guatemalteca con más de 30 años de experiencia",
      body: "en el área de fabricación y comercialización de calzado a nivel nacional e internacional.",
    },
    {
      icon: "/icons/beneficio-4.svg",
      title: "Enfocados en la satisfacción, comodidad y moda",
      body: "para nuestros clientes, por lo que nos especializamos en dar una atención personalizada a cada uno de ellos.",
    },
  ],
} as const;

export const nuestrosPasos = {
  title: ["Nuestros", "Pasos"],
  href: "#",
  imageAlt: "Par de zapatos de vestir de cuero negro sobre un tronco de madera",
} as const;

export const contact = {
  heading: "FACALVA Guatemala",
  address: "0 avenida C 3-36 zona 4 de Mixco, Colonia Monserrat I, Guatemala, C.A.",
  addressHref: "https://www.google.com/maps/search/?api=1&query=0+avenida+C+3-36+zona+4+de+Mixco+Colonia+Monserrat+I+Guatemala",
  phone: "(+ 502) 2433-0043",
  phoneHref: "tel:+50224330043",
  email: "servicioalcliente@facalva.com",
  emailHref: "mailto:servicioalcliente@facalva.com",
  rights: "Todos los derechos reservados, FACALVA",
} as const;

export const social = [
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/50224330043" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/facalva" },
  { id: "twitter", label: "Twitter", href: "https://twitter.com/facalva" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/facalva" },
] as const;

export const search = {
  placeholder: "Zapato Casual",
  label: "Buscar calzado",
  /** No product catalogue exists yet, so the field is deliberately inert. */
  unavailableNote: "La búsqueda estará disponible próximamente",
} as const;
