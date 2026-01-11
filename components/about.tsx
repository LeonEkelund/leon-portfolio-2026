"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { StockholmMap } from "@/components/bento-tiles/stockholm-map"
import { Pill } from "@/components/ui/pill"

const primarySkills = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "MongoDB",
  "UI/UX", "Figma", "Responsive Design", "Accessibility", "Design Prototyping",
  "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "Blender"
]

const moreSkills = [
  "InDesign", "Lightroom", "DaVinci Resolve",
  "Sound Design", "Music Production", "Audio Mixing", "Cubase", "FL Studio", "Pro Tools", "Ableton",
  "3D Modeling", "3D Rendering", "Video Editing",
  "Notion", "Jira"
]

export function About() {
  const [showMore, setShowMore] = useState(false)

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
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mt-8 flex flex-wrap justify-center gap-2"
      >
        {primarySkills.map((skill) => (
          <Pill key={skill}>{skill}</Pill>
        ))}

        <AnimatePresence>
          {showMore && moreSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Pill>{skill}</Pill>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-500 hover:border-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </motion.div>
    </section>
  )
}
