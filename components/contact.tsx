"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { CtaCard } from "@/components/bento-tiles/cta-card"

export function Contact() {
  return (
    <section id="contact" className="relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <SectionHeading title="Let's Work Together" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center text-foreground/60 max-w-md mb-8 -mt-4"
      >
        Have a project in mind or just want to chat? I'd love to hear from you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative w-full max-w-md"
      >
        {/* CTA Card container */}
        <div className="relative h-16 rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl overflow-hidden shadow-lg">
          <CtaCard />
        </div>

        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-foreground/20 rounded-tl-2xl" />
        <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-foreground/20 rounded-tr-2xl" />
        <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-foreground/20 rounded-bl-2xl" />
        <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-foreground/20 rounded-br-2xl" />
      </motion.div>
    </section>
  )
}
