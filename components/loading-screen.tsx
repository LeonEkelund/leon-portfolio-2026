"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const duration = 1200 // 1.2 seconds
    const interval = 20 // Update every 20ms
    const steps = duration / interval
    const increment = 100 / steps

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setIsExiting(true)
          setTimeout(onLoadingComplete, 500) // Wait for exit animation
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-semibold tracking-tight text-foreground tabular-nums"
            >
              {Math.round(progress)}
            </motion.span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">
              100
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
