"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { CtaCard } from "@/components/bento-tiles/cta-card"
import { Frame } from "@/components/ui/frame"

export function Contact() {
  return (
    <section id="contact" className="relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <SectionHeading title="Let's Work Together" mobileUnderlineImage="/images/frames/bgimage3.png" underlinePosition="center 80%" />

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
        <Frame src="/images/frames/bgimage3.png" padding={20} objectPosition="20% 20%" hideOnMobile>
          {/* CTA Card container */}
          <div className="relative h-16 rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl overflow-hidden shadow-lg">
            {/* Mobile-only background */}
            <div className="sm:hidden absolute inset-0">
              <Image
                src="/images/frames/bgimage3.png"
                alt=""
                fill
                className="object-cover contrast-110 brightness-90"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            <CtaCard />
          </div>
        </Frame>
      </motion.div>
    </section>
  )
}
