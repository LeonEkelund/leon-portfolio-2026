"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pill } from "@/components/ui/pill"
import { ChevronDown } from "lucide-react"
import { useLoading } from "@/components/loading-context"
import Image from "next/image"

export function Hero() {
  const [showTagline, setShowTagline] = useState(true)
  const [showArrow, setShowArrow] = useState(false)
  const { isLoaded } = useLoading()

  useEffect(() => {
    if (!isLoaded) return

    // After 5 seconds, melt tagline into arrow
    const meltTimer = setTimeout(() => {
      setShowTagline(false)
      setTimeout(() => setShowArrow(true), 600)
    }, 5000)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(meltTimer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isLoaded])

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center
     justify-center px-4 gap-2">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
        }}
        className="mb-4"
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
        className="text-6xl font-semibold tracking-tight text-foreground flex items-center"
      >
        Hi, I'm Le
        <span className="relative w-8 h-8 rounded-full overflow-hidden shadow-lg inline-block ml-1 mr-0.5 translate-y-1.5">
          <Image
            src="/images/avatar/leonimage.jpg"
            alt="Leon"
            fill
            className="object-cover scale-125"
            style={{ objectPosition: "40% center" }}
            priority
          />
          {/* Light vignette */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: "inset 0 0 4px 1px rgba(0,0,0,0.2)" }}
          />
        </span>
        n.
      </motion.h1>


      <div className="h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showTagline && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              exit={{
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
                transition: { duration: 0.6, ease: "easeIn" }
              }}
              transition={{
                duration: 0.60,
                ease: "easeInOut",
                delay: 0.16,
              }}
              className="text-5xl tracking-normal text-foreground/60 text-center font-light"
            >
              A <span className="italic text-foreground/80">creative</span> front-end developer.
            </motion.p>
          )}

          {showArrow && (
            <motion.button
              key="arrow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                const projects = document.getElementById("projects")
                if (projects) {
                  const yOffset = 75
                  const y = projects.getBoundingClientRect().top + window.pageYOffset + yOffset
                  window.scrollTo({ top: y, behavior: "smooth" })
                }
              }}
              className="cursor-pointer"
            >
              <motion.div
                animate={{
                  y: [0, 18, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.5, 1],
                }}
                className="text-foreground/50 hover:text-foreground/70 transition-colors"
              >
                <ChevronDown className="h-8 w-8" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}