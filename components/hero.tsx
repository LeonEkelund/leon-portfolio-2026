"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pill } from "@/components/ui/pill"
import { ChevronDown } from "lucide-react"
import { useLoading } from "@/components/loading-context"

export function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const { isLoaded } = useLoading()

  useEffect(() => {
    if (!isLoaded) return

    const timer = setTimeout(() => setShowScrollIndicator(true), 1300)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isLoaded])

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center
     justify-center px-4 gap-4">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
        }}
      >
        <Pill>
          <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
          Available for work
        </Pill>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
          delay: 0.08,
        }}
        className="text-6xl font-semibold tracking-tight text-foreground"
      >
        Hi, I'm Leon.
      </motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
          delay: 0.16,
        }}
        className="text-5xl tracking-normal text-foreground/60 text-center font-light"
      >
        A <span className="italic text-foreground/80">creative</span> front-end developer.
      </motion.p>

      <div className="mt-16 h-6">
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  y: [0, 6, 0],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="text-foreground"
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}