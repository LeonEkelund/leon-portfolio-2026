"use client"

import { Dock, DockIcon } from "@/components/ui/dock"
import Link from "next/link"
import { Mail } from "lucide-react"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { useState, useEffect, useRef } from "react"

export function NavigationDock() {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add threshold to prevent jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return

      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Dock
      className={`fixed bottom-10 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        hidden ? "translate-y-[calc(100%+40px)]" : "translate-y-0"
      }`}
      iconMagnification={60}
      iconDistance={80}
    >
      <DockIcon>
        <Link href="https://github.com/LeonEkelund" target="_blank" className="block size-full">
          <SiGithub className="size-full" />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="https://www.linkedin.com/in/leon-ekelund-50050720a/" target="_blank" className="block size-full">
          <SiLinkedin className="size-full" />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="mailto:leongudmundssonekelund@gmail.com" className="block size-full">
          <Mail className="size-full" />
        </Link>
      </DockIcon>
    </Dock>
  )
}
