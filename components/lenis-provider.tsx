"use client"

import { useEffect, useState } from "react"
import Lenis from "lenis"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for mobile/touch device
    const checkMobile = window.matchMedia("(pointer: coarse)").matches ||
                        window.matchMedia("(max-width: 768px)").matches ||
                        'ontouchstart' in window
    setIsMobile(checkMobile)

    if (checkMobile) return // Skip Lenis on mobile

    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
