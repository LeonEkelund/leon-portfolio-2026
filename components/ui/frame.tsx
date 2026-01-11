"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FrameProps {
  children: ReactNode
  src: string
  alt?: string
  className?: string
  frameClassName?: string
  padding?: number // how much the frame extends beyond content (in pixels)
  objectPosition?: string // CSS object-position value (e.g., "center top", "50% 20%")
  hideOnMobile?: boolean // hide frame image on mobile devices
}

export function Frame({
  children,
  src,
  alt = "Decorative frame",
  className,
  frameClassName,
  padding = 60,
  objectPosition = "center",
  hideOnMobile = false,
}: FrameProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Frame image - extends beyond content */}
      <div
        className={cn(
          "absolute pointer-events-none rounded-[2rem] overflow-hidden",
          hideOnMobile && "hidden sm:block",
          frameClassName
        )}
        style={{
          top: -padding,
          left: -padding,
          right: -padding,
          bottom: -padding,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover contrast-110 brightness-90"
          style={{ objectPosition }}
        />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
