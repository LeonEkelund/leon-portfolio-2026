"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface LightboxContextType {
  isLightboxOpen: boolean
  setIsLightboxOpen: (open: boolean) => void
}

const LightboxContext = createContext<LightboxContextType | null>(null)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <LightboxContext.Provider value={{ isLightboxOpen, setIsLightboxOpen }}>
      {children}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider")
  }
  return context
}
