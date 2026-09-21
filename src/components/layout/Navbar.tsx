import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { LOGO } from "@/lib/images"

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Detect scroll for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cream/85 backdrop-blur-xl border-b border-border py-3"
            : "bg-transparent py-5",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="Chhaya Awning"
              className="h-10 w-10 md:h-11 md:w-11 transition-transform duration-500 group-hover:rotate-[8deg]"
            />
            <span className="font-display text-xl md:text-2xl tracking-tight text-ink">
              Chhaya <span className="text-clay italic">Awning</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="group relative inline-block text-sm font-medium tracking-wide text-ink/75 hover:text-ink transition-colors">
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? "text-ink" : ""}>
                        {link.label}
                      </span>
                      <span
                        className={[
                          "absolute left-0 -bottom-1 h-px bg-clay transition-all duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        ].join(" ")}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium tracking-wide shadow-soft hover:bg-clay hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream/70 backdrop-blur text-ink hover:bg-cream transition"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-cream shadow-lg flex flex-col p-8 pt-28"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        [
                          "block font-display text-3xl py-3 tracking-tight transition-colors",
                          isActive ? "text-clay" : "text-ink hover:text-clay",
                        ].join(" ")
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  to="/contact"
                  className="flex items-center justify-center rounded-full bg-clay text-primary-foreground px-6 py-4 text-sm font-medium shadow-md hover:bg-clay-dark transition-colors"
                >
                  Get a Quote
                </Link>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/50">
                  Crafted shade, since 2014
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}