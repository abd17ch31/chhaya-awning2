import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"

const Home = lazy(() => import("@/pages/Home"))
const About = lazy(() => import("@/pages/About"))
const Services = lazy(() => import("@/pages/Services"))
const Gallery = lazy(() => import("@/pages/Gallery"))
const Contact = lazy(() => import("@/pages/Contact"))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}