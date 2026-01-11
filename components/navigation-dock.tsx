"use client"

import { Dock, DockIcon } from "@/components/ui/dock"
import Link from "next/link"
import { Mail, FileDown } from "lucide-react"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useLightbox } from "@/components/lightbox-context"

export function NavigationDock() {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { isLightboxOpen } = useLightbox()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight

      // Add threshold to prevent jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return

      // Ignore scroll events during iOS overscroll bounce at bottom
      const isNearBottom = currentScrollY >= maxScrollY - 50
      if (isNearBottom && currentScrollY < lastScrollY.current) {
        lastScrollY.current = currentScrollY
        return
      }

      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }}
      className="fixed bottom-10 left-0 right-0 z-50"
    >
      <Dock
        className={`transition-transform duration-300 ease-in-out ${
          hidden || isLightboxOpen ? "translate-y-[calc(100%+40px)]" : "translate-y-0"
        }`}
        iconMagnification={60}
        iconDistance={80}
      >
        <DockIcon tooltip="GitHub">
          <Link href="https://github.com/LeonEkelund" target="_blank" className="size-full">
            <SiGithub className="size-full" />
          </Link>
        </DockIcon>
        <DockIcon tooltip="LinkedIn">
          <Link href="https://www.linkedin.com/in/leon-ekelund-50050720a/" target="_blank" className="size-full">
            <SiLinkedin className="size-full" />
          </Link>
        </DockIcon>
        <DockIcon tooltip="Email">
          <Link href="mailto:leongudmundssonekelund@gmail.com" className="size-full">
            <Mail className="size-full" />
          </Link>
        </DockIcon>
        <DockIcon tooltip="Resume">
          <a href="/leon-ekelund-resume.pdf" download className="size-full">
            <FileDown className="size-full" />
          </a>
        </DockIcon>
      </Dock>
    </motion.div>
  )
}
