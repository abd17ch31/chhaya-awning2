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
 *
 * ── Folder structure ─────────────────────────────────────
 *
 *   public/
 *   ├── logo.svg
 *   └── images/
 *       ├── hero-1.jpg → hero-4.jpg          (Home hero slider)
 *       ├── home/
 *       │   ├── services/
 *       │   │   ├── residential.jpg
 *       │   │   ├── commercial.jpg
 *       │   │   ├── retractable.jpg
 *       │   │   └── custom.jpg
 *       │   ├── process/
 *       │   │   ├── consult.jpg
 *       │   │   ├── measure.jpg
 *       │   │   ├── craft.jpg
 *       │   │   └── install.jpg
 *       │   └── gallery/
 *       │       ├── 01.jpg → 04.jpg
 *       ├── about/
 *       │   ├── hero.jpg
 *       │   ├── story.jpg
 *       │   └── owner.jpg
 *       ├── services/
 *       │   ├── hero.jpg
 *       │   └── residential.jpg → custom.jpg
 *       └── gallery/
 *           └── 01.jpg → 12.jpg
 * ─────────────────────────────────────────────────────────
 */

/* ── HOME ──────────────────────────────────────────────── */
export const HOME_IMAGES = {
  // 4 hero slides — auto-rotating background
  heroSlides: [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
  ],

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
  owner: "/images/about/owner.jpg",
} as const

/* ── SERVICES ──────────────────────────────────────────── */
export const SERVICES_IMAGES = {
  hero: "/images/services/hero.jpg",
  rows: {
    residential: "/images/services/residential.jpg",
    commercial: "/images/services/commercial.jpg",
    retractable: "/images/services/retractable.jpg",
    custom: "/images/services/custom.jpg",
  },
} as const

/* ── GALLERY ───────────────────────────────────────────── */
export const GALLERY_IMAGES = [
  { image: "/images/gallery/01.jpg", location: "Saboli Extension Residence", category: "Residential" as const },
  { image: "/images/gallery/02.jpg", location: "Mandoli Road Café", category: "Commercial" as const },
  { image: "/images/gallery/03.jpg", location: "Nand Nagri Terrace", category: "Retractable" as const },
  { image: "/images/gallery/04.jpg", location: "Shahdara Villa", category: "Custom" as const },
  { image: "/images/gallery/05.jpg", location: "Laxmi Nagar Storefront", category: "Commercial" as const },
  { image: "/images/gallery/06.jpg", location: "Yamuna Vihar Home", category: "Residential" as const },
  { image: "/images/gallery/07.jpg", location: "Dilshad Garden", category: "Retractable" as const },
  { image: "/images/gallery/08.jpg", location: "Preet Vihar Retreat", category: "Custom" as const },
  { image: "/images/gallery/09.jpg", location: "Ashok Nagar Home", category: "Residential" as const },
  { image: "/images/gallery/10.jpg", location: "Karol Bagh Restaurant", category: "Commercial" as const },
  { image: "/images/gallery/11.jpg", location: "Karkardooma Apartment", category: "Retractable" as const },
  { image: "/images/gallery/12.jpg", location: "Seelampur Villa", category: "Custom" as const },
] as const

/* ── LOGO ──────────────────────────────────────────────── */
export const LOGO = "/logo.svg"