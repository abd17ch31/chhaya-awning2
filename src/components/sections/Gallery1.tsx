import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import SectionContainer from "@/components/layout/SectionContainer"
import { HOME_IMAGES } from "@/lib/images"

interface Shot {
  image: string
  alt: string
  location: string
  tag: string
  /** grid class for desktop + mobile layout */
  span: string
}

const SHOTS: Shot[] = [
  {
    image: HOME_IMAGES.gallery[0],
    alt: "Feature awning install",
    location: "Bandra Residence",
    tag: "Residential",
    span: "col-span-2 aspect-[4/3] lg:aspect-auto lg:col-span-2 lg:row-span-4",
  },
  {
    image: HOME_IMAGES.gallery[1],
    alt: "Café canopy",
    location: "Kala Ghoda Café",
    tag: "Commercial",
    span: "col-span-2 aspect-[16/10] lg:aspect-auto lg:col-span-2 lg:row-span-2",
  },
  {
    image: HOME_IMAGES.gallery[2],
    alt: "Retractable awning",
    location: "Juhu Terrace",
    tag: "Retractable",
    span: "col-span-1 aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-2",
  },
  {
    image: HOME_IMAGES.gallery[3],
    alt: "Custom pergola",
    location: "Alibaug Villa",
    tag: "Custom",
    span: "col-span-1 aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-2",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const tile: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export default function Gallery1() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <SectionContainer id="gallery" className="bg-cream">
      <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-10 pt-24 lg:pt-28 pb-12 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 lg:mb-10 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                Recent Work
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink max-w-2xl text-balance">
              Space that speaks{" "}
              <span className="italic text-clay">for itself.</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-clay transition-colors self-start md:self-auto shrink-0"
          >
            Full gallery
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bento grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-3 lg:gap-4 lg:flex-1 lg:min-h-0"
        >
          {SHOTS.map((shot, i) => (
            <GalleryTile key={i} shot={shot} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}

function GalleryTile({ shot, index }: { shot: Shot; index: number }) {
  return (
    <motion.article
      variants={tile}
      className={cn(
        "group relative overflow-hidden rounded-2xl lg:rounded-3xl",
        "bg-cream-deep/60 border border-ink/8",
        "cursor-pointer",
        shot.span
      )}
    >
      <img
        src={shot.image}
        alt={shot.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      {/* Base gradient for caption readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Tag — top-left */}
      <span className="absolute top-4 left-4 z-10 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-ink">
        {shot.tag}
      </span>

      {/* Arrow — top-right, reveals on hover */}
      <div className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <ArrowRight size={13} className="text-ink" />
      </div>

      {/* Caption — bottom-left */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-4 lg:p-5">
        <div className="flex items-center gap-1.5 text-cream/70 mb-1">
          <MapPin size={11} strokeWidth={2} />
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Install #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="font-display text-base lg:text-lg text-cream leading-tight">
          {shot.location}
        </p>
      </div>
    </motion.article>
  )
}