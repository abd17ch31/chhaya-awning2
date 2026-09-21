import { forwardRef, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Props extends HTMLAttributes<HTMLElement> {
  id?: string
  children: ReactNode
  /** Allow the section to exceed viewport height (disables JS hijack for it) */
  allowTall?: boolean
}

const SectionContainer = forwardRef<HTMLElement, Props>(
  ({ id, children, className, allowTall = false, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-section
        className={cn(
          "relative w-full snap-start",
          allowTall
            ? "min-h-screen"
            : "min-h-screen lg:h-screen lg:overflow-hidden",
          className
        )}
        {...rest}
      >
        {children}
      </section>
    )
  }
)

SectionContainer.displayName = "SectionContainer"
export default SectionContainer