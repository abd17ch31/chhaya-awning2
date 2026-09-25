import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion"
import {
  Home,
  Store,
  RefreshCw,
  Ruler,
  ArrowRight,
  Check,
  Plus,
} from "lucide-react"
import PageHero from "@/components/layout/PageHero"
import { cn } from "@/lib/utils"
import { SERVICES_IMAGES } from "@/lib/images"

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/* ── Content ─────────────────────────────────────────── */

interface Service {
  id: string
  number: string
  eyebrow: string
  title: string
  description: string
  features: string[]
  icon: typeof Home
  image: string
  alt: string
}

const SERVICES: Service[] = [
  {
    id: "residential",
    number: "01",
    eyebrow: "For homes",
    title: "Residential Awnings",
    description:
      "Made-to-measure shade for balconies, patios, and windows — measured on-site, stitched in-house, and built to fit your space and your style.",
    features: [
      "Custom sizes to the millimetre",
      "40+ fabric colours and patterns",
      "5-year structural warranty",
    ],
    icon: Home,
    image: SERVICES_IMAGES.rows.residential,
    alt: "Residential awning over a home",
  },
  {
    id: "commercial",
    number: "02",
    eyebrow: "For businesses",
    title: "Commercial Canopies",
    description:
      "Storefront awnings and café canopies that protect your guests and carry your brand — printed, branded, and installed to survive monsoon and salt air.",
    features: [
      "Custom branding and printing",
      "Marine-grade fabric rated for 10+ years",
      "Installation outside business hours",
    ],
    icon: Store,
    image: SERVICES_IMAGES.rows.commercial,
    alt: "Café storefront with canopy",
  },
  {
    id: "retractable",
    number: "03",
    eyebrow: "Adapt to the sun",
    title: "Retractable Systems",
    description:
      "Motorised or manual retractable awnings that shift with the sun. Open them in the morning, close them by evening — from a remote, a switch, or your phone.",
    features: [
      "Remote and smartphone control",
      "Wind and rain sensors available",
      "Powder-coated aluminium frame",
    ],
    icon: RefreshCw,
    image: SERVICES_IMAGES.rows.retractable,
    alt: "Retractable awning on a patio",
  },
  {
    id: "custom",
    number: "04",
    eyebrow: "Built to your vision",
    title: "Custom Shades",
    description:
      "Pergolas, sun screens, and bespoke shade structures designed around your space — not a catalogue. Bring a sketch, a photo, or just an idea.",
    features: [
      "Free on-site design consultation",
      "Structural engineering available",
      "Fully bespoke fabrication",
    ],
    icon: Ruler,
    image: SERVICES_IMAGES.rows.custom,
    alt: "Custom pergola shade structure",
  },
]

const MATERIALS = [
  {
    name: "Ivory",
    swatch: "#F1E8D6",
    note: "Classic warm cream",
  },
  {
    name: "Terracotta",
    swatch: "#B8623A",
    note: "Our signature clay",
  },
  {
    name: "Amber",
    swatch: "#E8A54B",
    note: "Sun-washed gold",
  },
  {
    name: "Olive",
    swatch: "#5A6B4A",
    note: "Deep garden green",
  },
  {
    name: "Slate",
    swatch: "#2A2420",
    note: "Modern near-black",
  },
  {
    name: "Sky",
    swatch: "#8FA9B8",
    note: "Cool coastal blue",
  },
]

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most residential projects go from consultation to install in 3–4 weeks. Commercial and fully custom builds take 4–6 weeks depending on fabric and site.",
  },
  {
    q: "Do you handle installation?",
    a: "Yes — measurement, fabrication, and installation are all done by our own team. No third parties, no surprises on install day.",
  },
  {
    q: "What's covered under the warranty?",
    a: "Frame, stitching, and hardware for 5 years. Fabric fade and weather resistance for 3 years under normal use.",
  },
  {
    q: "Can I choose my own colours?",
    a: "Absolutely. We bring physical swatches to your consultation so you can see them in your own light before deciding.",
  },
]

/* ── Page ────────────────────────────────────────────── */

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Craft"
        title={
          <>
            Services that shape{" "}
            <span className="italic text-clay">the light.</span>
          </>
        }
        intro="From a single window awning to a full café canopy — every service starts with a conversation, gets measured on-site, and is stitched in-house."
        image={SERVICES_IMAGES.hero}
        imageAlt="Awning over a storefront"
        caption={{ label: "", value: "" }}
        stats={[
          { value: "04", label: "Core services" },
          { value: "3–6", label: "Week turnaround" },
          { value: "100%", label: "In-house" },
        ]}
      />

      <ServicesList />
      <MaterialsBand />
      <FAQStrip />
      <ClosingSection />
    </>
  )
}

/* ── 1. Services list (alternating rows) ─────────────── */

function ServicesList() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-20 lg:space-y-32">
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const reverse = index % 2 === 1
  const Icon = service.icon

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
    >
      {/* Image */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className={cn(
          "lg:col-span-6",
          reverse ? "lg:order-2" : "lg:order-1"
        )}
      >
        <div className="relative aspect-[5/6] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-cream-deep/60">
          <img
            src={service.image}
            alt={service.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />

          {/* Number badge */}
          <span className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.22em] text-cream/90 drop-shadow-sm">
            ( {service.number} )
          </span>
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className={cn(
          "lg:col-span-6",
          reverse ? "lg:order-1" : "lg:order-2"
        )}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-clay" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
            {service.eyebrow}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay/10 text-clay">
            <Icon size={18} strokeWidth={1.8} />
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
            {service.title}
          </h2>
        </div>

        <p className="text-base lg:text-lg text-ink/65 leading-relaxed max-w-lg mb-8">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-sm lg:text-[15px] text-ink/75"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay">
                <Check size={12} strokeWidth={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-clay-dark transition-colors"
        >
          Get a quote for this
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  )
}

/* ── 2. Materials band (dark, swatch grid) ───────────── */

function MaterialsBand() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
                Materials
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream text-balance">
              Marine-grade fabric.{" "}
              <span className="italic text-amber">Six signature shades.</span>
            </h2>
          </div>
          <p className="text-sm text-cream/55 max-w-sm">
            Solution-dyed acrylic rated to hold colour for 10+ years. Built for
            monsoon, salt air, and years of direct sun.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5"
        >
          {MATERIALS.map((m) => (
            <motion.div
              key={m.name}
              variants={fade}
              className="group"
            >
              <div
                className="aspect-square rounded-2xl ring-1 ring-cream/10 transition-transform duration-500 group-hover:-translate-y-1"
                style={{ backgroundColor: m.swatch }}
              />
              <p className="mt-4 font-display text-base text-cream leading-tight">
                {m.name}
              </p>
              <p className="text-xs text-cream/45 mt-1">{m.note}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-cream/50 max-w-md">
            We bring physical swatches to every consultation so you can see them
            in your own light before deciding.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-cream transition-colors"
          >
            Request a swatch pack
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── 3. FAQ strip ────────────────────────────────────── */

function FAQStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (i: number) => setOpen((v) => (v === i ? null : i))

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                Common questions
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
              Everything you need{" "}
              <span className="italic text-clay">to know.</span>
            </h2>
            <p className="mt-6 text-sm lg:text-base text-ink/55 leading-relaxed max-w-md">
              Quick answers about timelines, warranty, and what happens after
              you reach out.
            </p>

            <Link
              to="/contact"
              className="mt-8 group inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-clay-dark transition-colors"
            >
              Still have questions? Talk to us
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right — accordion */}
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-7"
          >
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {FAQS.map((item, i) => (
                <motion.div key={i} variants={fade} className="group">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={open === i}
                    className="w-full flex items-start gap-4 lg:gap-6 py-5 lg:py-6 text-left cursor-pointer"
                  >
                    <span className="mt-1 font-mono text-[10px] tracking-[0.22em] text-clay/70 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-lg lg:text-xl leading-snug tracking-tight transition-colors duration-300",
                        open === i
                          ? "text-clay"
                          : "text-ink group-hover:text-ink/70"
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        open === i
                          ? "bg-clay border-clay text-cream rotate-45"
                          : "border-ink/15 text-ink/70 group-hover:border-ink/30"
                      )}
                    >
                      <Plus size={14} strokeWidth={2.2} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pl-10 lg:pl-14 pr-12 pb-6 lg:pb-7">
                          <p className="text-sm lg:text-[15px] text-ink/60 leading-relaxed max-w-2xl">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── 4. Closing CTA ──────────────────────────────────── */

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
                Let's talk
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream mb-6 text-balance">
              Not sure which service{" "}
              <span className="italic">fits your space?</span>
            </h2>
            <p className="text-cream/75 text-base leading-relaxed mb-8 max-w-md">
              Tell us about your project — we'll suggest the right option and
              send a free estimate.
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