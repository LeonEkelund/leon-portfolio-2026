"use client"

import { motion } from "framer-motion"
import { Pill } from "@/components/ui/pill"
import { Linkedin, Github } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="flex min-h-screen flex-col items-center
     justify-center px-4 gap-2">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
        }}
      >
        <Pill>
          <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
          Available for work
        </Pill>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
          delay: 0.08,
        }}
        className="text-6xl font-semibold tracking-tight text-foreground"
      >
        Hi, I'm Leon.
      </motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.60,
          ease: "easeInOut",
          delay: 0.16,
        }}
        className="text-5xl tracking-tight text-foreground/70 text-center font-light"
      >
        A <span className="opacity-70">creative</span> front-end developer.
      </motion.p>

      <div className="flex gap-4 mt-6">
        {[
          { icon: Linkedin, href: "https://www.linkedin.com/in/leon-ekelund-50050720a/" },
          { icon: Github, href: "https://github.com/LeonEkelund" },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.60,
              ease: "easeInOut",
              delay: 0.24 + i * 0.08,
            }}
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            <social.icon className="h-5 w-5" />
          </motion.a>
        ))}
      </div>

    </section>
  )
}