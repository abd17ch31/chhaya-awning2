import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Props {
  eyebrow: string
  title: ReactNode
  intro?: string
  /** Optional right-side visual */
  image?: string
  imageAlt?: string
  /** Small caption strip that sits over the image (bottom-left) */
  caption?: { label: string; value: string }
  /** Extra stats below the intro (up to 3) */
  stats?: { value: string; label: string }[]
}

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  caption,
  stats,
}: Props) {
  const hasVisual = Boolean(image)

  return (
    <section className="relative bg-cream pt-36 lg:pt-44 pb-16 lg:pb-24 overflow-hidden">
      {/* Soft warm blob behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-clay/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={cn(
            "grid gap-12 lg:gap-16 items-center",
            hasVisual ? "lg:grid-cols-12" : "lg:grid-cols-1"
          )}
        >
          {/* Text side */}
          <div className={cn(hasVisual ? "lg:col-span-7" : "max-w-3xl")}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                {eyebrow}
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.02] tracking-tight text-ink text-balance">
              {title}
            </h1>

            {intro && (
              <p className="mt-7 text-lg lg:text-xl text-ink/60 leading-relaxed max-w-2xl text-pretty">
                {intro}
              </p>
            )}

            {stats && stats.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
                {stats.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-10">
                    {i > 0 && <span className="h-10 w-px bg-ink/10" />}
                    <div>
                      <p className="font-display text-3xl lg:text-4xl text-ink leading-none">
                        {s.value}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/45">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visual side */}
          {hasVisual && (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden bg-cream-deep/60 shadow-lg">
                <img
                  src={image}
                  alt={imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Warm gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

                {caption && (
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-cream/70 mb-1">
                        {caption.label}
                      </p>
                      <p className="font-display text-lg text-cream leading-tight">
                        {caption.value}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}