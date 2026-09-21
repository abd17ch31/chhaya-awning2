import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView, type Variants } from "framer-motion"
import {
  Hammer,
  Ruler,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Scissors,
  Leaf,
} from "lucide-react"
import PageHero from "@/components/layout/PageHero"

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

const VALUES = [
  {
    icon: Hammer,
    title: "Handcrafted",
    description:
      "Every awning is cut, stitched, and finished in our Delhi workshop. No third-party factories, no shortcuts.",
  },
  {
    icon: Ruler,
    title: "Made to Measure",
    description:
      "We measure on-site, to the millimetre. Your shade fits your space — not a catalogue template.",
  },
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    description:
      "Frame, stitching, and hardware backed for five years. Fabric fade guaranteed for three.",
  },
]

const NUMBERS = [
  { value: "12+", label: "Years under the sun" },
  { value: "800+", label: "Awnings installed" },
  { value: "5.0★", label: "Average client rating" },
  { value: "100%", label: "Made in-house" },
]

const OWNER = {
  name: "Gopal Nayak",
  role: "Founder & Lead Craftsman",
  image: "/images/about/team/01.jpg",
  quote:
    "I've been cutting fabric since I was nineteen. Every awning that leaves this workshop gets checked by me personally — because my name is on it.",
  facts: [
    { icon: Scissors, label: "Cutting fabric since 2005" },
    { icon: MapPin, label: "Delhi workshop, since 2014" },
  ],
}

/* ── Page ────────────────────────────────────────────── */

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            Two decades under{" "}
            <span className="italic text-clay">the sun.</span>
          </>
        }
        intro="Founded in 2014, Chhaya Awning began as a two-person workshop with one belief: shade should feel as considered as the space it covers."
        image="/images/about/hero.jpg"
        imageAlt="Chhaya Awning workshop"
        caption={{ label: "Est. 2014", value: "Delhi, India" }}
        stats={[
          { value: "12+", label: "Years" },
          { value: "800+", label: "Installs" },
          { value: "5.0★", label: "Rating" },
        ]}
      />

      <StorySection />
      <ValuesSection />
      <NumbersSection />
      <OwnerSection />
      <ClosingSection />
    </>
  )
}

/* ── 1. Story ────────────────────────────────────────── */

function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Image */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden bg-cream-deep/60">
              <img
                src="/images/about/story.jpg"
                alt="Chhaya Awning workshop"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-cream/95 backdrop-blur px-5 py-4 max-w-[220px]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-clay mb-1">
                  Est. 2014
                </p>
                <p className="font-display text-base text-ink leading-tight">
                  Saboli Extension,
                  <br />
                  Delhi
                </p>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                How it began
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink mb-6 text-balance">
              We started with one{" "}
              <span className="italic text-clay">café awning.</span>
            </h2>

            <div className="space-y-4 text-base text-ink/65 leading-relaxed max-w-lg">
              <p>
                It began with one stubborn request — a café owner who wanted an
                awning that could survive a Delhi monsoon and still look good
                ten years later.
              </p>
              <p>
                We delivered. That one project turned into a workshop, a small
                team, and over eight hundred installations across the city.
              </p>
              <p>
                We still work the same way: on-site measurements, in-house
                stitching, and no shortcuts on materials. Every awning that
                leaves our workshop is signed off by hand.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-ink/60">
                <Scissors size={14} className="text-clay" />
                <span>In-house stitching</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink/60">
                <Leaf size={14} className="text-clay" />
                <span>Marine-grade fabrics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink/60">
                <MapPin size={14} className="text-clay" />
                <span>Delhi born</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── 2. Values ───────────────────────────────────────── */

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-clay" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
              What we stand for
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
            Three things we{" "}
            <span className="italic text-clay">never compromise.</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {VALUES.map((v) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                variants={fade}
                className="group rounded-3xl border border-ink/8 bg-cream-deep/40 p-7 lg:p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-500"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-clay mb-6 group-hover:bg-clay group-hover:text-cream transition-colors duration-500">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="font-display text-xl lg:text-2xl leading-tight text-ink tracking-tight mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ── 3. Numbers (dark band) ──────────────────────────── */

function NumbersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-amber" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
              By the numbers
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream text-balance">
            Quietly built.{" "}
            <span className="italic text-amber">Numbers prove it.</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6"
        >
          {NUMBERS.map((n) => (
            <motion.div key={n.label} variants={fade}>
              <p className="font-display text-5xl lg:text-6xl text-cream leading-none mb-3">
                {n.value}
              </p>
              <p className="text-xs lg:text-sm text-cream/50 leading-relaxed max-w-[180px]">
                {n.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── 4. Owner spotlight ──────────────────────────────── */

function OwnerSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Portrait */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-deep/60">
              <img
                src={OWNER.image}
                alt={OWNER.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

              {/* Name plate overlay */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-cream/95 backdrop-blur px-5 py-4">
                <p className="font-display text-xl text-ink leading-tight">
                  {OWNER.name}
                </p>
                <p className="text-xs text-ink/55 mt-0.5">{OWNER.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                The hands behind it
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink mb-8 text-balance">
              One workshop.{" "}
              <span className="italic text-clay">One signature.</span>
            </h2>

            {/* Quote */}
            <blockquote className="relative pl-6 lg:pl-8 border-l-2 border-clay/40 mb-8">
              <p className="font-display text-xl md:text-2xl lg:text-[1.75rem] leading-snug tracking-tight text-ink/85 italic">
                "{OWNER.quote}"
              </p>
            </blockquote>

            {/* Facts */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {OWNER.facts.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 text-sm text-ink/60"
                  >
                    <Icon size={14} className="text-clay" />
                    <span>{f.label}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── 5. Closing CTA ──────────────────────────────────── */

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
              Ready to see your space{" "}
              <span className="italic">in a new light?</span>
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