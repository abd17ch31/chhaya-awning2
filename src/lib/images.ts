/**
 * ─────────────────────────────────────────────────────────
 * CHHAYA AWNING — IMAGE SOURCES
 * ─────────────────────────────────────────────────────────
 *
 * To swap any image on the website:
 *   1. Drop the new photo into /public/images/... at the same path
 *   2. That's it — no code changes needed.
 *
 * If you want to change a path or filename, edit it here.
 * Everything else in the codebase reads from this file.
 * ─────────────────────────────────────────────────────────
 */

/* ── HOME ──────────────────────────────────────────────── */
export const HOME_IMAGES = {
  hero: "/images/hero.jpg",

  services: {
    residential: "/images/home/services/residential.jpg",
    commercial: "/images/home/services/commercial.jpg",
    retractable: "/images/home/services/retractable.jpg",
    custom: "/images/home/services/custom.jpg",
  },

  process: {
    consult: "/images/home/process/consult.jpg",
    measure: "/images/home/process/measure.jpg",
    craft: "/images/home/process/craft.jpg",
    install: "/images/home/process/install.jpg",
  },

  gallery: [
    "/images/home/gallery/01.jpg",
    "/images/home/gallery/02.jpg",
    "/images/home/gallery/03.jpg",
    "/images/home/gallery/04.jpg",
  ],
} as const

/* ── ABOUT ─────────────────────────────────────────────── */
export const ABOUT_IMAGES = {
  hero: "/images/about/hero.jpg",
  story: "/images/about/story.jpg",
  team: [
    { image: "/images/about/team/01.jpg", name: "Rajesh Chhaya", role: "Founder & Lead Craftsman" },
  ],
} as const

/* ── SERVICES ──────────────────────────────────────────── */
export const SERVICES_IMAGES = {
  hero: "/images/services/residential.jpg",
  rows: {
    residential: "/images/services/residential.jpg",
    commercial: "/images/services/commercial.jpg",
    retractable: "/images/services/retractable.jpg",
    custom: "/images/services/custom.jpg",
  },
} as const

/* ── GALLERY ───────────────────────────────────────────── */
export const GALLERY_IMAGES = [
  { image: "/images/gallery/01.jpg", location: "Bandra Residence", category: "Residential" as const },
  { image: "/images/gallery/02.jpg", location: "Kala Ghoda Café", category: "Commercial" as const },
  { image: "/images/gallery/03.jpg", location: "Juhu Terrace", category: "Retractable" as const },
  { image: "/images/gallery/04.jpg", location: "Alibaug Villa", category: "Custom" as const },
  { image: "/images/gallery/05.jpg", location: "Colaba Storefront", category: "Commercial" as const },
  { image: "/images/gallery/06.jpg", location: "Powai Home", category: "Residential" as const },
  { image: "/images/gallery/07.jpg", location: "Worli Sea Face", category: "Retractable" as const },
  { image: "/images/gallery/08.jpg", location: "Lonavala Retreat", category: "Custom" as const },
  { image: "/images/gallery/09.jpg", location: "Pali Hill Home", category: "Residential" as const },
  { image: "/images/gallery/10.jpg", location: "BKC Restaurant", category: "Commercial" as const },
  { image: "/images/gallery/11.jpg", location: "Versova Apartment", category: "Retractable" as const },
  { image: "/images/gallery/12.jpg", location: "Khandala Villa", category: "Custom" as const },
] as const

/* ── LOGO ──────────────────────────────────────────────── */
export const LOGO = "/logo.svg"