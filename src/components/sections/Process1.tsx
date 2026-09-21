import { useRef, type ElementType } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { MessageSquare, Ruler, Scissors, Wrench, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import SectionContainer from "@/components/layout/SectionContainer"
import { HOME_IMAGES } from "@/lib/images"

interface Step {
  number: string
  title: string
  description: string
  icon: ElementType
  image: string
  alt: string
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Consult",
    description:
      "We visit your space, listen to how you want to use it, and sketch the options that fit.",
    icon: MessageSquare,
    image: HOME_IMAGES.process.consult,
    alt: "Consultation with client",
  },
  {
    number: "02",
    title: "Measure",
    description:
      "Precise on-site measurements — every millimetre accounted for, every angle considered.",
    icon: Ruler,
    image: HOME_IMAGES.process.measure,
    alt: "Taking measurements",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Hand-cut, stitched, and finished in our workshop using marine-grade fabrics and frames.",
    icon: Scissors,
    image: HOME_IMAGES.process.craft,
    alt: "Craftsman working on awning",
  },
  {
    number: "04",
    title: "Install",
    description:
      "Our team fits everything on-site — clean, quick, and walk-through ready the same day.",
    icon: Wrench,
    image: HOME_IMAGES.process.install,
    alt: "Installing awning",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}
const stepVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Process1() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <SectionContainer id="process" className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-10 pt-24 lg:pt-28 pb-12 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 lg:mb-16 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-amber" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
                How It Works
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream max-w-2xl text-balance">
              From first call to{" "}
              <span className="italic text-amber">final stitch.</span>
            </h2>
          </div>
          <p className="text-sm text-cream/60 max-w-sm self-start md:self-auto">
            Four considered steps. No surprises, no shortcuts — just shade that fits
            the way it should.
          </p>
        </div>

        {/* Steps row */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 lg:gap-x-10"
        >
          {/* Timeline connector (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[90px] left-[12.5%] right-[12.5%] h-px bg-cream/15"
          />

          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="shrink-0 pt-10 lg:pt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-cream/10">
          <p className="text-sm text-cream/50">
            Ready to start? Most projects go from first call to install in 3–4 weeks.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-amber text-ink px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-cream transition-colors duration-300"
          >
            Start Your Project
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </SectionContainer>
  )
}

function StepCard({ step }: { step: Step }) {
  const Icon = step.icon
  return (
    <motion.div
      variants={stepVariant}
      className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      {/* Circular image */}
      <div className="relative">
        <div className="relative h-[160px] w-[160px] lg:h-[180px] lg:w-[180px] rounded-full overflow-hidden ring-1 ring-cream/15 bg-ink-soft">
          <img
            src={step.image}
            alt={step.alt}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out hover:scale-105"
          />
          {/* Warm overlay to unify different photos */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Number badge */}
        <span
          className={cn(
            "absolute -bottom-2 -right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full",
            "bg-amber text-ink font-mono text-[11px] tracking-[0.15em] font-medium",
            "ring-4 ring-ink"
          )}
        >
          {step.number}
        </span>
      </div>

      {/* Body */}
      <div className="mt-7 lg:mt-8 max-w-[240px] lg:max-w-none">
        <Icon
          className="hidden lg:block h-5 w-5 text-amber mb-3"
          strokeWidth={1.8}
        />
        <h3 className="font-display text-xl lg:text-2xl leading-tight tracking-tight text-cream mb-2.5">
          {step.title}
        </h3>
        <p className="text-sm text-cream/55 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}