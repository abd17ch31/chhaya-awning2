import { useRef, useState, type FormEvent } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { ArrowRight, Phone, Mail, MapPin, Clock, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import SectionContainer from "@/components/layout/SectionContainer"
import { SITE } from "@/lib/site"
import { submitAwningEnquiry } from "@/lib/web3forms"

const EASE = [0.22, 1, 0.36, 1] as const
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}



const CONTACTS = [
  {
    icon: Phone,
    label: "Call us",
    value: SITE.contact.phone,
    href: SITE.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email us",
    value: SITE.contact.email,
    href: SITE.contact.emailHref,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: `${SITE.address.city} ${SITE.address.pincode}`,
    href: SITE.address.mapsHref,
  },
  {
    icon: Clock,
    label: "Hours",
    value: SITE.hours.weekdays,
    href: null,
  },
]

const SERVICES = [
  "Residential Awnings",
  "Commercial Canopies",
  "Retractable Systems",
  "Custom Shades",
  "Not sure yet",
]

export default function CTA1() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle")
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  })

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setError("")
    try {
      await submitAwningEnquiry(e.currentTarget, "Homepage quote form")
      setStatus("idle")
      setSubmitted(true)
    } catch (submissionError) {
      setStatus("error")
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn't send your enquiry. Please try again."
      )
    }
  }

  return (
    <SectionContainer id="contact" className="bg-cream">
      <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-10 pt-24 lg:pt-28 pb-12 flex flex-col">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 flex-1 min-h-0"
        >
          {/* ── Left column — pitch + contact info ─────── */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div variants={fade}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-clay" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                  Let's Build
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] tracking-tight text-ink text-balance">
                Shade, made for{" "}
                <span className="italic text-clay">your space.</span>
              </h2>

              <p className="mt-6 text-base lg:text-lg text-ink/60 leading-relaxed max-w-md">
                Tell us about your project — dimensions, vision, whatever you have.
                We'll reply with ideas, a rough estimate, and a free consultation slot.
              </p>
            </motion.div>

            {/* Contact rows — pinned bottom on desktop */}
            <motion.div
              variants={fade}
              className="mt-10 lg:mt-auto pt-8 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
            >
              {CONTACTS.map((c) => {
                const Icon = c.icon
                const Content = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 ring-1 ring-ink/10 text-clay">
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-0.5">
                        {c.label}
                      </span>
                      <span className="block text-sm text-ink font-medium">
                        {c.value}
                      </span>
                    </span>
                  </>
                )

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-3 group"
                  >
                    {Content}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-center gap-3">
                    {Content}
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* ── Right column — form card ──────────────── */}
          <motion.div variants={fade} className="lg:col-span-7">
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-cream-deep/60 border border-ink/8",
                "shadow-[0_1px_0_rgba(26,22,20,0.04)]",
                "p-6 lg:p-10"
              )}
            >
              {/* Decorative corner accent */}
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-clay/10 blur-3xl pointer-events-none"
              />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex flex-col items-center text-center py-16 lg:py-20"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay text-cream mb-6">
                    <Check size={24} strokeWidth={2.5} />
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl text-ink tracking-tight">
                    Thanks, {form.name.split(" ")[0] || "friend"}.
                  </h3>
                  <p className="mt-3 text-sm text-ink/55 max-w-sm leading-relaxed">
                    We've received your message and will get back to you within a few
                    hours. In the meantime, feel free to call us directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        service: "",
                        location: "",
                        message: "",
                      })
                    }}
                    className="mt-8 text-sm font-medium text-clay hover:text-clay-dark transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="relative space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-display text-xl text-ink tracking-tight">
                      Get a free quote
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-ink/40">
                      Takes ~30s
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Your name"
                      id="name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Ananya Sharma"
                      required
                    />
                    <Field
                      label="Phone"
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 …"
                      required
                    />
                  </div>

                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    required
                  />

                  <Field
                    label="Project location"
                    id="location"
                    value={form.location}
                    onChange={update("location")}
                    placeholder="Area, city or PIN code"
                    required
                  />

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-2"
                    >
                      Service interest
                    </label>
                    <select
                      id="service"
                      name="service_interest"
                      value={form.service}
                      onChange={update("service")}
                      required
                      className={cn(
                        "w-full rounded-xl border border-ink/10 bg-cream/70",
                        "px-4 py-3.5 text-sm text-ink",
                        "outline-none focus:border-clay focus:bg-cream",
                        "transition-colors appearance-none cursor-pointer",
                        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231A1614%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_1rem_center]"
                      )}
                    >
                      <option value="" disabled>
                        Choose a service…
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-2"
                    >
                      Tell us about your project{" "}
                      <span className="text-ink/25 normal-case tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="project_details"
                      value={form.message}
                      onChange={update("message")}
                      rows={3}
                      placeholder="Approx. size, where it's going, any inspiration…"
                      className={cn(
                        "w-full rounded-xl border border-ink/10 bg-cream/70",
                        "px-4 py-3.5 text-sm text-ink placeholder:text-ink/30",
                        "outline-none focus:border-clay focus:bg-cream",
                        "transition-colors resize-none"
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm font-medium tracking-wide shadow-md hover:bg-clay hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                  >
                    {status === "sending" ? "Sending enquiry…" : "Send enquiry"}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                  {status === "error" && (
                    <p role="alert" className="text-center text-xs text-red-700">
                      {error}
                    </p>
                  )}

                  <p className="text-[11px] text-ink/40 text-center leading-relaxed pt-1">
                    We reply within a few hours. No spam, no sales pressure.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}

/* ── Small reusable text field ──────────────────────── */
function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full rounded-xl border border-ink/10 bg-cream/70",
          "px-4 py-3.5 text-sm text-ink placeholder:text-ink/30",
          "outline-none focus:border-clay focus:bg-cream",
          "transition-colors"
        )}
      />
    </div>
  )
}
