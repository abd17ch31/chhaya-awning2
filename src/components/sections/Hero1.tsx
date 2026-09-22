import { useEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowDown } from "lucide-react"
import SectionContainer from "@/components/layout/SectionContainer"
import { HOME_IMAGES } from "@/lib/images"

const EASE = [0.22, 1, 0.36, 1] as const

/* How long each slide stays on screen (ms) */
const SLIDE_INTERVAL = 1500
/* Crossfade duration (ms) */
const CROSSFADE = 900

const SLIDES = HOME_IMAGES.heroSlides

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE },
  }),
}

const STATS = [
  { value: "12+", label: "Years Crafting" },
  { value: "800+", label: "Installations" },
  { value: "5.0★", label: "Client Rating" },
]

export default function Hero1() {
  const [index, setIndex] = useState(0)

  /* Auto-advance the slider */
  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, SLIDE_INTERVAL)
    return () => window.clearInterval(t)
  }, [])

  return (
    <SectionContainer id="home">
      {/* ── Background slider ───────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={index}
            src={SLIDES[index]}
            alt="Awning over a sunlit space"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: CROSSFADE / 1000, ease: "easeInOut" },
              scale: {
                duration: (SLIDE_INTERVAL + CROSSFADE) / 1000,
                ease: "linear",
              },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Warm cream wash — keeps text readable & on-brand */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/75 to-cream/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/85 via-transparent to-transparent" />

        {/* Slide progress indicators */}
        <div className="absolute bottom-8 right-8 lg:right-12 z-20 hidden md:flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="group relative h-1 w-8 rounded-full bg-ink/15 overflow-hidden"
            >
              {i === index && (
                <motion.span
                  key={index}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: SLIDE_INTERVAL / 1000,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 bg-clay"
                />
              )}
              {i !== index && (
                <span className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full h-full px-6 lg:px-10 pt-32 pb-24 flex items-center">
        <div className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-clay" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
              Custom Awnings · Since 2014
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-ink text-balance"
          >
            Shade,
            <br />
            <span className="italic text-clay">refined.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 text-lg md:text-xl text-ink/70 leading-relaxed max-w-xl text-pretty"
          >
            Bespoke awnings, canopies, and shade systems — handcrafted for homes,
            cafés, and storefronts that refuse to blend in.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm font-medium tracking-wide shadow-md hover:bg-clay hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              Get a Free Quote
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink/80 hover:text-clay transition-colors"
            >
              View Our Work
              <span className="inline-block h-px w-8 bg-ink/40 transition-all duration-300 group-hover:w-12 group-hover:bg-clay" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-14 flex items-center gap-6 sm:gap-10"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && <span className="h-8 w-px bg-ink/15" />}
                <div>
                  <p className="font-display text-2xl md:text-3xl text-ink">
                    {s.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink/50 mt-1">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-ink/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </SectionContainer>
  )
}