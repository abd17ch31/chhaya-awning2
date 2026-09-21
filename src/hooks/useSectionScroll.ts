import { useCallback, useEffect, useRef, useState } from "react"

/* ─────────────────────────────────────────────────────────
   Custom scroll animation — bypasses browser "smooth" quirks.
   ~1.1s ease-in-out-expo: gentle start, confident middle,
   gentle stop. Feels premium, not snappy.
   ───────────────────────────────────────────────────────── */
const easeInOutExpo = (t: number): number => {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2
}

function animateScrollTo(
  targetY: number,
  duration = 1100,
  onDone?: () => void
) {
  const startY = window.scrollY
  const delta = targetY - startY
  if (Math.abs(delta) < 1) {
    onDone?.()
    return
  }

  const start = performance.now()
  const root = document.documentElement

  const tick = (now: number) => {
    const elapsed = now - start
    const t = Math.min(1, elapsed / duration)
    const eased = easeInOutExpo(t)
    root.scrollTop = startY + delta * eased
    if (t < 1) requestAnimationFrame(tick)
    else onDone?.()
  }

  requestAnimationFrame(tick)
}

/* ─────────────────────────────────────────────────────────
   Hook
   ───────────────────────────────────────────────────────── */
interface Options {
  durationMs?: number
  lockBufferMs?: number
  wheelThreshold?: number
  selector?: string
  /** Extra px beyond the last section's top before we consider the user "past" it */
  pastThreshold?: number
}

export function useSectionScroll({
  durationMs = 1100,
  lockBufferMs = 200,
  wheelThreshold = 8,
  selector = "[data-section]",
  pastThreshold = 20,
}: Options = {}) {
  const lockedRef = useRef(false)
  const lastWheelRef = useRef(0)
  const currentRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getSections = useCallback(
    () => Array.from(document.querySelectorAll<HTMLElement>(selector)),
    [selector]
  )

  const isTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return false
    return (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    )
  }, [])

  /** Returns true if the viewport is scrolled past the bottom of the last section */
  const isPastLastSection = useCallback(() => {
    const sections = getSections()
    if (!sections.length) return false
    const last = sections[sections.length - 1]
    const lastTop = last.getBoundingClientRect().top + window.scrollY
    return window.scrollY > lastTop + pastThreshold
  }, [getSections, pastThreshold])

  const goToIndex = useCallback(
    (index: number) => {
      const sections = getSections()
      if (!sections.length) return

      const clamped = Math.max(0, Math.min(sections.length - 1, index))
      const el = sections[clamped]
      const top = el.getBoundingClientRect().top + window.scrollY

      currentRef.current = clamped
      setCurrentIndex(clamped)

      lockedRef.current = true
      animateScrollTo(top, durationMs, () => {
        window.setTimeout(() => {
          lockedRef.current = false
        }, lockBufferMs)
      })
    },
    [getSections, durationMs, lockBufferMs]
  )

  const goNext = useCallback(() => goToIndex(currentRef.current + 1), [goToIndex])
  const goPrev = useCallback(() => goToIndex(currentRef.current - 1), [goToIndex])

  /* ── Track current section on manual scroll ───────────── */
  useEffect(() => {
    const sync = () => {
      if (lockedRef.current) return
      const sections = getSections()
      if (!sections.length) return
      const y = window.scrollY
      let best = 0
      let bestDist = Infinity
      sections.forEach((el, i) => {
        const top = el.getBoundingClientRect().top + y
        const dist = Math.abs(top - y)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      if (best !== currentRef.current) {
        currentRef.current = best
        setCurrentIndex(best)
      }
    }
    sync()
    window.addEventListener("scroll", sync, { passive: true })
    return () => window.removeEventListener("scroll", sync)
  }, [getSections])

  /* ── Wheel (desktop only) ─────────────────────────────── */
  useEffect(() => {
    if (isTouchDevice()) return

    const onWheel = (e: WheelEvent) => {
      // No sections on this page → hands off entirely (sub-pages)
      const sections = getSections()
      if (!sections.length) return

      // Nested scrollable element can consume this — hands off
      if (canNestedScroll(e.target, e.deltaY)) return

      const current = sections[currentRef.current]

      // Current section is taller than viewport → natural scroll inside
      if (current && current.offsetHeight > window.innerHeight + 4) return

      /* ── Past the last section (footer zone) ─────────────── */
      if (isPastLastSection()) {
        if (e.deltaY < 0) {
          // Scroll up → return to the last section
          e.preventDefault()
          if (lockedRef.current) return
          const now = performance.now()
          if (now - lastWheelRef.current < 150) return
          lastWheelRef.current = now
          goToIndex(sections.length - 1)
        }
        // Scroll down → let the footer scroll naturally
        return
      }

      /* ── At the last section, scrolling down → enter footer ── */
      const isLast = currentRef.current === sections.length - 1
      if (isLast && e.deltaY > 0) return

      /* ── At the first section, scrolling up → nothing above ── */
      const isFirst = currentRef.current === 0
      if (isFirst && e.deltaY < 0) {
        e.preventDefault()
        return
      }

      /* ── Normal gesture threshold ────────────────────────── */
      if (Math.abs(e.deltaY) < wheelThreshold) {
        if (lockedRef.current) e.preventDefault()
        return
      }

      e.preventDefault()
      if (lockedRef.current) return

      const now = performance.now()
      if (now - lastWheelRef.current < 150) return
      lastWheelRef.current = now

      if (e.deltaY > 0) goNext()
      else goPrev()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [
    getSections,
    goNext,
    goPrev,
    goToIndex,
    isTouchDevice,
    wheelThreshold,
    isPastLastSection,
  ])

  /* ── Keyboard ─────────────────────────────────────────── */
  useEffect(() => {
    if (isTouchDevice()) return

    const onKey = (e: KeyboardEvent) => {
      // No sections on this page → hands off entirely
      const sections = getSections()
      if (!sections.length) return

      const t = e.target as HTMLElement | null
      if (t) {
        const tag = t.tagName
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          t.isContentEditable
        ) {
          return
        }
      }
      if (lockedRef.current) return

      /* Past the last section (footer zone) */
      if (isPastLastSection()) {
        if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault()
          goToIndex(sections.length - 1)
        }
        return
      }

      /* At last section, scrolling down → let it enter the footer */
      const isLast = currentRef.current === sections.length - 1
      if (isLast && (e.key === "ArrowDown" || e.key === "PageDown")) return

      /* At first section, scrolling up → nothing above */
      const isFirst = currentRef.current === 0
      if (isFirst && (e.key === "ArrowUp" || e.key === "PageUp")) {
        e.preventDefault()
        return
      }

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault()
          goNext()
          break
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          goPrev()
          break
        case "Home":
          e.preventDefault()
          goToIndex(0)
          break
        case "End":
          e.preventDefault()
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "auto",
          })
          break
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [
    getSections,
    goNext,
    goPrev,
    goToIndex,
    isTouchDevice,
    isPastLastSection,
  ])

  /* ── Hash on mount ────────────────────────────────────── */
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "")
    if (!hash) return
    const sections = getSections()
    if (!sections.length) return
    const idx = sections.findIndex((s) => s.id === hash)
    if (idx >= 0) {
      requestAnimationFrame(() => goToIndex(idx))
    }
  }, [getSections, goToIndex])

  return {
    currentIndex,
    total: getSections().length,
    goToIndex,
    goNext,
    goPrev,
  }
}

/* ── Nested scroll helper ───────────────────────────────── */
function canNestedScroll(target: EventTarget | null, deltaY: number): boolean {
  if (!(target instanceof HTMLElement)) return false
  let el: HTMLElement | null = target
  while (el && el !== document.documentElement) {
    const style = window.getComputedStyle(el)
    const oy = style.overflowY
    if (
      (oy === "auto" || oy === "scroll") &&
      el.scrollHeight > el.clientHeight + 1
    ) {
      const atTop = el.scrollTop <= 1
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if (deltaY > 0 && !atBottom) return true
      if (deltaY < 0 && !atTop) return true
    }
    el = el.parentElement
  }
  return false
}