import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useSectionScroll } from "@/hooks/useSectionScroll"

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  // On Home we hijack scroll for the full-page section experience.
  // On sub-pages we point at a selector that matches nothing → hook is inert.
  useSectionScroll({ selector: isHome ? "[data-section]" : "[data-no-section]" })

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}