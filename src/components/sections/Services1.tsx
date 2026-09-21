import { useRef, type ElementType } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { Home, Store, RefreshCw, Ruler, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import SectionContainer from "@/components/layout/SectionContainer"
import { HOME_IMAGES } from "@/lib/images"

interface Service {
  number: string
  title: string
  description: string
  icon: ElementType
  image: string
  alt: string
}

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Residential Awnings",
    description: "Made-to-measure shade for homes, patios, and balconies.",
    icon: Home,
    image: HOME_IMAGES.services.residential,
    alt: "Residential home with awning",
  },
  {
    number: "02",
    title: "Commercial Canopies",
    description: "Storefront awnings and café canopies that elevate your brand.",
    icon: Store,
    image: HOME_IMAGES.services.commercial,
    alt: "Café storefront with canopy",
  },
  {
    number: "03",
    title: "Retractable Systems",
    description: "Motorised or manual awnings that adapt to sun and season.",
    icon: RefreshCw,
    image: HOME_IMAGES.services.retractable,
    alt: "Retractable awning on a patio",
  },
  {
    number: "04",
    title: "Custom Shades",
    description: "Pergolas, sun screens, and bespoke structures built to your vision.",
    icon: Ruler,
    image: HOME_IMAGES.services.custom,
    alt: "Custom pergola shade structure",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Services1() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <SectionContainer id="services" className="bg-cream">
      <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-10 pt-24 lg:pt-28 pb-12 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 lg:mb-10 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                What We Craft
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink max-w-2xl text-balance">
              Services that shape <span className="italic text-clay">the light.</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-clay transition-colors self-start md:self-auto shrink-0"
          >
            All services
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 flex-1 min-h-0"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon

  return (
    <motion.article
      variants={cardVariant}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl",
        "bg-cream-deep/60 border border-ink/8",
        "shadow-[0_1px_0_rgba(26,22,20,0.04)]",
        "hover:-translate-y-1 hover:shadow-lg transition-all duration-500",
        "lg:h-full"
      )}
    >
      {/* Image — fixed height on mobile, elastic on desktop */}
      <div className="relative h-56 sm:h-64 lg:h-auto lg:flex-1 lg:min-h-0 overflow-hidden">
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Number overlay */}
        <span className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-[0.22em] text-cream/90 drop-shadow-sm">
          ( {service.number} )
        </span>

        {/* Top gradient for readability */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink/40 to-transparent pointer-events-none" />

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight size={13} className="text-ink" />
        </div>
      </div>

      {/* Body */}
      <div className="shrink-0 flex flex-col gap-3 p-5 lg:p-6">
        <Icon
          className="h-7 w-7 text-clay transition-transform duration-500 group-hover:-translate-y-0.5"
          strokeWidth={1.6}
        />
        <div>
          <h3 className="font-display text-lg lg:text-xl leading-tight text-ink tracking-tight mb-1.5">
            {service.title}
          </h3>
          <p className="text-xs lg:text-sm text-ink/60 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}