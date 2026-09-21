import { Link } from "react-router-dom"
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"

const LINKS = {
  company: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ],
  services: [
    { label: "Residential Awnings", to: "/services" },
    { label: "Commercial Canopies", to: "/services" },
    { label: "Retractable Systems", to: "/services" },
    { label: "Custom Shades", to: "/services" },
  ],
}

const SOCIALS = [
  { icon: FaInstagram, label: "Instagram", href: SITE.socials.instagram },
  { icon: FaFacebookF, label: "Facebook", href: SITE.socials.facebook },
  { icon: FaLinkedinIn, label: "LinkedIn", href: SITE.socials.linkedin },
  { icon: FaWhatsapp, label: "WhatsApp", href: SITE.contact.whatsappHref },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-ink text-cream snap-align-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        {/* ── Top band ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-14 lg:pb-20 border-b border-cream/10">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link to="/" className="group inline-flex items-center gap-3 mb-6">
              <img
                src="/logo.svg"
                alt={SITE.name}
                className="h-11 w-11 transition-transform duration-500 group-hover:rotate-[8deg]"
              />
              <span className="font-display text-2xl tracking-tight text-cream">
                Chhaya <span className="text-amber italic">Awning</span>
              </span>
            </Link>

            <p className="text-sm text-cream/55 leading-relaxed max-w-sm mb-8">
              Bespoke awnings, canopies, and shade systems — handcrafted since
              2014 for homes, cafés, and storefronts that refuse to blend in.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      "border border-cream/15 text-cream/70",
                      "hover:border-amber hover:text-amber hover:-translate-y-0.5",
                      "transition-all duration-300"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-4 lg:col-start-7 grid grid-cols-2 gap-8">
            <FooterColumn title="Company" links={LINKS.company} />
            <FooterColumn title="Services" links={LINKS.services} />
          </div>

          {/* Contact block */}
          <div className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.28em] text-amber mb-5">
              Get in Touch
            </p>
            <a
              href={SITE.contact.emailHref}
              className="group block font-display text-lg text-cream leading-tight mb-4 hover:text-amber transition-colors break-all"
            >
              {SITE.contact.email}
              <ArrowUpRight
                size={16}
                className="inline ml-1 -mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={SITE.contact.phoneHref}
              className="block text-sm text-cream/60 hover:text-cream transition-colors mb-6"
            >
              {SITE.contact.phone}
            </a>
            <p className="text-xs text-cream/40 leading-relaxed">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.city} {SITE.address.pincode}
            </p>
          </div>
        </div>

        {/* ── Bottom band ─────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/35">
            © {year} {SITE.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-cream/35">
            <Link to="/privacy" className="hover:text-cream/60 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-cream/60 transition-colors">
              Terms
            </Link>
            <span className="hidden sm:inline">Crafted in Delhi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; to: string }[]
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-amber mb-5">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="group inline-flex items-center text-sm text-cream/60 hover:text-cream transition-colors"
            >
              <span className="relative">
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}