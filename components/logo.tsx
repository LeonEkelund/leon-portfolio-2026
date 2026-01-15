"use client"

import Image from "next/image"

export function Logo() {
  return (
    <div className="absolute sm:fixed top-6 left-6 z-50">
      <Image
        src="/logo.png"
        alt="Leon Ekelund"
        width={32}
        height={32}
        className="opacity-100 hover:opacity-70 transition-opacity"
      />
    </div>
  )
}
