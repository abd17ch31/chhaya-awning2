import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion"
import { Plus, MessageCircleQuestion, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import SectionContainer from "@/components/layout/SectionContainer"

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most residential projects go from first consultation to installed awning in 3–4 weeks. Commercial or custom builds may take 4–6 weeks depending on fabric availability and site complexity.",
  },
  {
    question: "Do you install outside the city?",
    answer:
      "Yes — we regularly install across the state and take on select out-of-state projects. Travel and installation costs are quoted transparently upfront, so there are never surprise charges.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We work with marine-grade acrylic and solution-dyed fabrics that hold colour for years, mounted on powder-coated aluminium or galvanised steel frames. Everything is chosen to survive monsoon, salt air, and years of direct sun.",
  },
  {
    question: "Is there a warranty?",
    answer:
      "Every awning we build comes with a 5-year structural warranty covering the frame, stitching, and hardware. Fabric fade and weather-resistance are guaranteed for 3 years under normal use.",
  },
  {
    question: "Can I customise colours, patterns, and sizes?",
    answer:
      "Completely. Colours, stripes, patterns, valance styles, and dimensions are all made to order. We bring fabric swatches to your consultation so you can see them in your own light before deciding.",
  },
  {
    question: "Do you offer motorised or retractable options?",
    answer:
      "Yes — we install both manual and motorised retractable systems, including remote-controlled and smartphone-integrated options. Perfect for patios, cafés, and spaces where sun exposure shifts through the day.",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const row: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function FAQ1() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (i: number) => setOpen((v) => (v === i ? null : i))

  return (
    <SectionContainer id="faq" className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-10 pt-24 lg:pt-28 pb-12 flex flex-col">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 flex-1 min-h-0">
          {/* ── Left column — heading + CTA ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
                Questions
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream max-w-md text-balance">
              Answers before you{" "}
              <span className="italic text-amber">ask.</span>
            </h2>

            <p className="mt-6 text-sm lg:text-base text-cream/55 leading-relaxed max-w-md">
              Everything you need to know about working with Chhaya Awning —
              timelines, materials, warranty, and what happens after you reach out.
            </p>

            {/* Contact prompt — pinned to bottom on desktop */}
            <div className="mt-10 lg:mt-auto pt-8 border-t border-cream/10">
              <div className="flex items-start gap-3 mb-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/5 ring-1 ring-cream/15">
                  <MessageCircleQuestion size={16} className="text-amber" />
                </span>
                <div>
                  <p className="font-display text-lg text-cream leading-tight">
                    Still have a question?
                  </p>
                  <p className="text-xs text-cream/50 mt-1">
                    We usually reply within a few hours.
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-amber text-ink px-6 py-3 text-sm font-medium tracking-wide hover:bg-cream transition-colors duration-300"
              >
                Get in Touch
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* ── Right column — accordion ─────────────────── */}
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="divide-y divide-cream/10 border-y border-cream/10">
              {FAQS.map((item, i) => (
                <FaqRow
                  key={i}
                  item={item}
                  isOpen={open === i}
                  onToggle={() => toggle(i)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  )
}

function FaqRow({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div variants={row} className="group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-4 lg:gap-6 py-5 lg:py-6 text-left cursor-pointer"
      >
        {/* Number */}
        <span className="mt-1 font-mono text-[10px] tracking-[0.22em] text-amber/70 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          className={cn(
            "flex-1 font-display text-lg lg:text-xl leading-snug tracking-tight transition-colors duration-300",
            isOpen ? "text-amber" : "text-cream group-hover:text-cream/80"
          )}
        >
          {item.question}
        </span>

        {/* Icon */}
        <span
          className={cn(
            "relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "bg-amber border-amber text-ink rotate-45"
              : "border-cream/20 text-cream/70 group-hover:border-cream/40"
          )}
        >
          <Plus size={14} strokeWidth={2.2} />
        </span>
      </button>

      {/* Answer — animated height */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pl-10 lg:pl-14 pr-12 pb-6 lg:pb-7">
              <p className="text-sm lg:text-[15px] text-cream/60 leading-relaxed max-w-2xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}