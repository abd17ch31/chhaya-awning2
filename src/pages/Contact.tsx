import { useState, type FormEvent } from "react"
import { motion, type Variants } from "framer-motion"
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  MessageCircle,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"
import PageHero from "@/components/layout/PageHero"
import { cn } from "@/lib/utils"
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

/* ── Data ─────────────────────────────────────────────── */

const CONTACTS = [
  {
    icon: Phone,
    label: "Call us",
    value: SITE.contact.phone,
    href: SITE.contact.phoneHref,
    note: "Mon–Sat, 10am–7pm",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: SITE.contact.whatsapp,
    href: SITE.contact.whatsappHref,
    note: "Fastest reply",
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.contact.email,
    href: SITE.contact.emailHref,
    note: "Replies within hours",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: `${SITE.address.city} ${SITE.address.pincode}`,
    href: SITE.address.mapsHref,
    note: "Workshop & showroom",
  },
]

const HOURS = SITE.hours.list

const SERVICES = [
  "Residential Awnings",
  "Commercial Canopies",
  "Retractable Systems",
  "Custom Shades",
  "Not sure yet",
]

/* ── Page ─────────────────────────────────────────────── */

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            Let's talk{" "}
            <span className="italic text-clay">shade.</span>
          </>
        }
        intro="Tell us about your space — dimensions, vision, or just a rough idea. We'll reply with suggestions, a rough estimate, and a free consultation slot."
      />

      <ContactSection />
      <MapSection />
      <ClosingNote />
    </>
  )
}

/* ── 1. Contact cards + form ─────────────────────────── */

function ContactSection() {
  return (
    <section className="bg-cream pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* ── Left: contact methods ─────────────── */}
          <motion.div variants={fade} className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-clay" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-clay font-medium">
                Reach us directly
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05] tracking-tight text-ink mb-8 text-balance">
              Four ways to{" "}
              <span className="italic text-clay">reach us.</span>
            </h2>

            <div className="space-y-3">
              {CONTACTS.map((c) => {
                const Icon = c.icon
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="group flex items-center gap-4 rounded-2xl border border-ink/8 bg-cream-deep/40 p-5 hover:border-clay/30 hover:bg-cream-deep/70 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay group-hover:bg-clay group-hover:text-cream transition-colors duration-300">
                      <Icon size={17} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-1">
                        {c.label}
                      </span>
                      <span className="block text-sm lg:text-[15px] text-ink font-medium truncate">
                        {c.value}
                      </span>
                      <span className="block text-xs text-ink/45 mt-0.5">
                        {c.note}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-ink/30 group-hover:text-clay group-hover:translate-x-1 transition-all duration-300"
                    />
                  </a>
                )
              })}
            </div>

            {/* Hours card */}
            <div className="mt-8 rounded-2xl border border-ink/8 bg-cream-deep/40 p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay/10 text-clay">
                  <Clock size={15} />
                </span>
                <p className="font-display text-lg text-ink tracking-tight">
                  Workshop hours
                </p>
              </div>
              <ul className="space-y-2.5 text-sm">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-ink/60">{h.day}</span>
                    <span
                      className={cn(
                        "font-medium",
                        h.time === "Closed" ? "text-ink/35" : "text-ink"
                      )}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Right: form ──────────────────────── */}
          <motion.div variants={fade} className="lg:col-span-7">
            <FormCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Form card ────────────────────────────────────────── */

function FormCard() {
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
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setError("")
    try {
      await submitAwningEnquiry(e.currentTarget, "Contact page")
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
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-cream-deep/60 border border-ink/8",
        "shadow-[0_1px_0_rgba(26,22,20,0.04)]",
        "p-6 lg:p-10"
      )}
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-clay/10 blur-3xl pointer-events-none"
      />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex flex-col items-center text-center py-16 lg:py-24"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay text-cream mb-6">
            <Check size={24} strokeWidth={2.5} />
          </span>
          <h3 className="font-display text-2xl lg:text-3xl text-ink tracking-tight">
            Thanks, {form.name.split(" ")[0] || "friend"}.
          </h3>
          <p className="mt-3 text-sm text-ink/55 max-w-sm leading-relaxed">
            We've received your message and will get back to you within a few
            hours. In the meantime, feel free to call or WhatsApp us directly.
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
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-display text-2xl text-ink tracking-tight">
                Get a free quote
              </p>
              <p className="text-xs text-ink/45 mt-1">
                No spam. No sales pressure. Just a considered reply.
              </p>
            </div>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.22em] text-ink/40">
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
              rows={5}
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
        </form>
      )}
    </div>
  )
}

/* ── Text field ──────────────────────────────────────── */

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

/* ── 2. Map ──────────────────────────────────────────── */

function MapSection() {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
                Visit the workshop
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-cream text-balance">
              Come see the fabric{" "}
              <span className="italic text-amber">in person.</span>
            </h2>
          </div>
          <a
            href={SITE.address.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-cream transition-colors self-start md:self-auto"
          >
            Open in Google Maps
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Map */}
          <div className="lg:col-span-8 relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden ring-1 ring-cream/10 bg-ink-soft">
            <iframe
              title="Chhaya Awning Workshop"
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d28181.318118734936!2d77.29280563187716!3d28.69326314819161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x390cfbc45cf6aaab%3A0x8b112a3624e0bb81!2sChhaya%20Enterprises%2C%202%2C%20Mandoli%20Rd%2C%20Mandoli%20Chungi%2C%20Mandoli%20Extension%2C%20Mandoli%2C%20Delhi%2C%20110093!3m2!1d28.7011623!2d77.3060304!4m5!1s0x390cfbc45cf6aaab%3A0x8b112a3624e0bb81!2sChhaya%20Enterprises%2C%202%2C%20Mandoli%20Rd%2C%20Mandoli%20Chungi%2C%20Mandoli%20Extension%2C%20Mandoli%2C%20Delhi%2C%20110093!3m2!1d28.7011623!2d77.3060304!5e1!3m2!1sen!2sin!4v1789973163533!5m2!1sen!2sin"
              className="absolute inset-0 h-full w-full grayscale-[0.35] contrast-110"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Address details */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="rounded-3xl border border-cream/10 bg-ink-soft/60 p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 text-amber">
                  <MapPin size={15} />
                </span>
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber">
                  Address
                </p>
              </div>
              <p className="font-display text-xl lg:text-2xl text-cream leading-tight mb-3">
                Chhaya Awning Workshop
              </p>
              <p className="text-sm text-cream/60 leading-relaxed">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
                <br />
                {SITE.address.city} {SITE.address.pincode}
              </p>
            </div>

            <div className="rounded-3xl border border-cream/10 bg-ink-soft/60 p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 text-amber">
                  <MessageCircle size={15} />
                </span>
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber">
                  Before you visit
                </p>
              </div>
              <p className="text-sm text-cream/60 leading-relaxed">
                Drop us a WhatsApp message before coming — we'll keep the
                fabric you're interested in ready to touch and see in person.
              </p>
              <a
                href={SITE.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-cream transition-colors"
              >
                Message on WhatsApp
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 3. Closing note ─────────────────────────────────── */

function ClosingNote() {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-clay mb-4">
            One last thing
          </p>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-ink text-balance">
            Every project starts with a conversation.
            <span className="italic text-clay"> We're good listeners.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
