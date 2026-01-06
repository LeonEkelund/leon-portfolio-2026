"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable Lenis on touch devices - it causes lag
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice) return

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
