"use client"

import Image from "next/image"

interface MobileDividerProps {
  src: string
  objectPosition?: string
}

export function MobileDivider({ src, objectPosition = "center" }: MobileDividerProps) {
  return (
    <div className="sm:hidden relative w-full h-12 overflow-hidden">
      <Image
        src={src}
        alt=""
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
  )
}
