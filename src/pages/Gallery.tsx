import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion"
import { ArrowRight, X, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import PageHero from "@/components/layout/PageHero"
import { cn } from "@/lib/utils"
import { GALLERY_IMAGES } from "@/lib/images"

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const tile: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* ── Content ─────────────────────────────────────────── */

type Category = "Residential" | "Commercial" | "Retractable" | "Custom"

interface Shot {
  id: number
  image: string
  alt: string
  location: string
  category: Category
  /** how much space this tile takes in the grid */
  span: string
}

const SHOTS: Shot[] = [
  {
    id: 1,
    image: GALLERY_IMAGES[0].image,
    alt: "Residential awning install",
    location: "Bandra Residence",
    category: "Residential",
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    image: GALLERY_IMAGES[1].image,
    alt: "Café canopy install",
    location: "Kala Ghoda Café",
    category: "Commercial",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    id: 3,
    image: GALLERY_IMAGES[2].image,
    alt: "Retractable awning",
    location: "Juhu Terrace",
    category: "Retractable",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 4,
    image: GALLERY_IMAGES[3].image,
    alt: "Custom pergola",
    location: "Alibaug Villa",
    category: "Custom",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 5,
    image: GALLERY_IMAGES[4].image,
    alt: "Storefront awning",
    location: "Colaba Storefront",
    category: "Commercial",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    id: 6,
    image: GALLERY_IMAGES[5].image,
    alt: "Home exterior awning",
    location: "Powai Home",
    category: "Residential",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 7,
    image: GALLERY_IMAGES[6].image,
    alt: "Retractable patio awning",
    location: "Worli Sea Face",
    category: "Retractable",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 8,
    image: GALLERY_IMAGES[7].image,
    alt: "Custom shade structure",
    location: "Lonavala Retreat",
    category: "Custom",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    id: 9,
    image: GALLERY_IMAGES[8].image,
    alt: "Residential window awning",
    location: "Pali Hill Home",
    category: "Residential",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 10,
    image: GALLERY_IMAGES[9].image,
    alt: "Restaurant canopy",
    location: "BKC Restaurant",
    category: "Commercial",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 11,
    image: GALLERY_IMAGES[10].image,
    alt: "Retractable awning detail",
    location: "Versova Apartment",
    category: "Retractable",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    id: 12,
    image: GALLERY_IMAGES[11].image,
    alt: "Bespoke shade design",
    location: "Khandala Villa",
    category: "Custom",
    span: "sm:col-span-1 lg:col-span-1",
  },
]

const FILTERS: ("All" | Category)[] = [
  "All",
  "Residential",
  "Commercial",
  "Retractable",
  "Custom",
]

/* ── Page ────────────────────────────────────────────── */

export default function Gallery() {
  const [filter, setFilter] = useState<"All" | Category>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === "All" ? SHOTS : SHOTS.filter((s) => s.category === filter)),
    [filter]
  )

  /* Lightbox keyboard controls */
  useEffect(() => {
    if (lightboxIndex === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length
        )
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, filtered.length])

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Spaces we've{" "}
            <span className="italic text-clay">shaded.</span>
          </>
        }
        intro="A selection of recent installs across homes, cafés, and storefronts. Filter by type, click any photo to see it large."
        stats={[
          { value: "800+", label: "Installations" },
          { value: "12+", label: "Years" },
          { value: "5.0★", label: "Rated" },
        ]}
      />

      {/* ── Filter tabs ─────────────────────────────── */}
      <section className="bg-cream pb-8 lg:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 border-b border-ink/10 pb-5">
            {FILTERS.map((f) => {
              const count =
                f === "All"
                  ? SHOTS.length
                  : SHOTS.filter((s) => s.category === f).length
              const active = filter === f
              return (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f)
                    setLightboxIndex(null)
                  }}
                  className={cn(
                    "group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    active
                      ? "bg-ink text-cream"
                      : "text-ink/60 hover:text-ink hover:bg-ink/5"
                  )}
                >
                  {f}
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-wider",
                      active ? "text-cream/60" : "text-ink/35"
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────── */}
      <section className="bg-cream pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            key={filter}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[220px] lg:auto-rows-[200px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((shot, i) => (
                <motion.button
                  key={shot.id}
                  layout
                  variants={tile}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  onClick={() => setLightboxIndex(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl lg:rounded-3xl",
                    "bg-cream-deep/60 border border-ink/8",
                    "cursor-zoom-in",
                    shot.span
                  )}
                >
                  <img
                    src={shot.image}
                    alt={shot.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category pill */}
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-ink">
                    {shot.category}
                  </span>

                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 z-10 p-4 lg:p-5 text-left">
                    <div className="flex items-center gap-1.5 text-cream/70 mb-1">
                      <MapPin size={11} strokeWidth={2} />
                      <span className="text-[10px] uppercase tracking-[0.2em]">
                        Install #{String(shot.id).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="font-display text-base lg:text-lg text-cream leading-tight">
                      {shot.location}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {current && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-10"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 h-11 w-11 flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(
                    (lightboxIndex - 1 + filtered.length) % filtered.length
                  )
                }}
                aria-label="Previous"
                className="absolute left-3 lg:left-8 z-20 h-11 w-11 lg:h-14 lg:w-14 flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((lightboxIndex + 1) % filtered.length)
                }}
                aria-label="Next"
                className="absolute right-3 lg:right-8 z-20 h-11 w-11 lg:h-14 lg:w-14 flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Image + caption */}
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[88vh] flex flex-col"
            >
              <div className="relative flex-1 min-h-0 rounded-2xl lg:rounded-3xl overflow-hidden bg-ink-soft">
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption strip */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-cream">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cream/50 mb-1">
                    {current.category} · Install #
                    {String(current.id).padStart(2, "0")}
                  </p>
                  <p className="font-display text-xl lg:text-2xl leading-tight">
                    {current.location}
                  </p>
                </div>
                <p className="text-xs text-cream/40 font-mono">
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {String(filtered.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ClosingSection />
    </>
  )
}

/* ── Closing CTA ─────────────────────────────────────── */

function ClosingSection() {
  return (
    <section className="bg-cream pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-clay to-clay-dark px-8 py-14 lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber/30 blur-3xl pointer-events-none"
          />

          <div className="relative max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-cream/60" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-cream/80 font-medium">
                Your turn
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream mb-6 text-balance">
              Let's add your space{" "}
              <span className="italic">to this list.</span>
            </h2>
            <p className="text-cream/75 text-base leading-relaxed mb-8 max-w-md">
              Tell us about your project and we'll send back ideas, a rough
              estimate, and a free consultation slot.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cream text-ink px-8 py-4 text-sm font-medium tracking-wide shadow-md hover:bg-ink hover:text-cream hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Free Quote
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}