"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { StockholmMap } from "@/components/bento-tiles/stockholm-map"
import { TechStack } from "@/components/bento-tiles/tech-stack"

export function About() {
  return (
    <section id="about" className="relative flex flex-col items-center justify-center px-4 py-20">
      <SectionHeading title="About" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text - shows first on mobile, first on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="order-1 flex flex-col justify-start"
        >
          <p className="text-lg text-foreground/70 leading-relaxed">
            I'm a front-end developer based in Stockholm with a passion for creating
            beautiful, interactive web experiences.
          </p>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            I've always been someone who needs to create. Whether it's building
            websites, producing music, or diving into 3D modelling - I'm happiest
            when I'm making something from nothing.
          </p>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            That creative drive is what drew me to front-end development. It's the
            perfect blend of logic and artistry - solving problems while crafting
            experiences that people actually enjoy using.
          </p>
        </motion.div>

        {/* Tiles - shows second on mobile, second on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="order-2 flex flex-col gap-4"
        >
          {/* Stockholm Map Tile */}
          <div className="relative h-48 md:h-64 rounded-2xl border border-stone-200 overflow-hidden shadow-lg">
            <StockholmMap />
          </div>

          {/* Tech Stack Tile */}
          <div className="relative h-20 rounded-2xl border border-stone-200 bg-transparent overflow-hidden shadow-lg">
            <TechStack />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
