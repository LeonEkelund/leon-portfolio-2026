"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  mobileUnderlineImage?: string
  underlinePosition?: string
}

export function SectionHeading({ title, subtitle, className, mobileUnderlineImage, underlinePosition = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("text-center mb-6 sm:mb-12", className)}
    >
      <h2 className="text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {mobileUnderlineImage && (
        <div
          className="sm:hidden relative w-40 h-1 mx-auto mt-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
          }}
        >
          <Image
            src={mobileUnderlineImage}
            alt=""
            fill
            className="object-cover contrast-110 brightness-90"
            style={{ objectPosition: underlinePosition }}
          />
        </div>
      )}
      {subtitle && (
        <p className="mt-2 text-lg text-foreground/60">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
