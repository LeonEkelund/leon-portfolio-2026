"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { LoadingScreen } from "./loading-screen"
import { motion } from "framer-motion"

interface LoadingContextType {
  isLoaded: boolean
}

const LoadingContext = createContext<LoadingContextType>({ isLoaded: false })

export function useLoading() {
  return useContext(LoadingContext)
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Small delay before triggering animations
    setTimeout(() => setIsLoaded(true), 100)
  }

  return (
    <LoadingContext.Provider value={{ isLoaded }}>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  )
}
