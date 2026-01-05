"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Folder, FileDown, Link2, ChevronRight, ExternalLink, FileText, FileCode } from "lucide-react"
import { SiGithub } from "react-icons/si"

type SidebarItem = "projects" | "resume" | "links"

interface Project {
  name: string
  description: string
  tech: string[]
  website?: string
  github?: string
}

const projects: Project[] = [
  {
    name: "Fatalis-Timer",
    description: "A modern Pomodoro timer available as both a web app and desktop application. Built to help you stay focused and productive.",
    tech: ["React", "Electron", "Tailwind"],
    website: "https://fatalistimer.netlify.app/",
    github: "https://github.com/LeonEkelund/fatalis-timer",
  },
  {
    name: "Band-page",
    description: "A sleek, animated website for a modern band featuring smooth scroll, dynamic visuals, merch store integration, and upcoming tour dates.",
    tech: ["React", "Lenis", "Framer Motion", "Tailwind"],
    website: "https://band-page.netlify.app/",
    github: "https://github.com/LeonEkelund/band-page",
  },
  {
    name: "Accessible-quiz",
    description: "A fully accessible quiz app built in a group setting. Navigate the entire experience using keyboard with full tab and arrow key support.",
    tech: ["TypeScript", "Tailwind", "REST API"],
    website: "https://quizbonanza.netlify.app/",
    github: "https://github.com/gabriellaberko/js-project-accessibility",
  },
]

const links = [
  { name: "GitHub", url: "https://github.com/LeonEkelund", icon: SiGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/leon-ekelund-50050720a/", icon: Link2 },
]

const sidebarItems = [
  { id: "projects" as const, label: "Projects", icon: Folder },
  { id: "resume" as const, label: "Resume", icon: FileDown },
  { id: "links" as const, label: "Links", icon: Link2 },
]

export function Projects() {
  const [activeItem, setActiveItem] = useState<SidebarItem>("projects")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  return (
    <section id="projects" className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* White vignette glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-white/8 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative w-full max-w-5xl"
      >
        {/* Finder Window */}
        <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            {/* Traffic Lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
            </div>
            {/* Path */}
            <div className="flex-1 text-center">
              <span className="text-sm text-foreground/50 font-medium">
                ~/Leon/{activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
              </span>
            </div>
            <div className="w-14" /> {/* Spacer for centering */}
          </div>

          <div className="flex min-h-[350px] sm:min-h-[500px]">
            {/* Sidebar */}
            <div className="w-32 sm:w-48 border-r border-white/10 bg-white/[0.02] p-2">
              <div className="text-xs text-foreground/40 font-medium px-2 py-1 mb-1">
                Favorites
              </div>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    activeItem === item.id
                      ? "bg-white/10 text-foreground"
                      : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4">
              <AnimatePresence mode="wait">
                {activeItem === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1"
                  >
                    {projects.map((project) => (
                      <div key={project.name}>
                        <button
                          onClick={() => setExpandedProject(
                            expandedProject === project.name ? null : project.name
                          )}
                          className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm hover:bg-white/5 transition-colors group"
                        >
                          <ChevronRight
                            className={`w-4 h-4 text-foreground/40 transition-transform ${
                              expandedProject === project.name ? "rotate-90" : ""
                            }`}
                          />
                          <Folder className="w-4 h-4 text-blue-400" />
                          <span className="text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                            {project.name}
                          </span>
                        </button>

                        <AnimatePresence>
                          {expandedProject === project.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-8 py-1 space-y-0.5">
                                {/* README file */}
                                <div className="px-2 py-1.5 rounded-md text-sm">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-foreground/40" />
                                    <span className="text-foreground/60">README.md</span>
                                  </div>
                                  <p className="text-foreground/30 text-xs mt-1 ml-6">
                                    {project.description}
                                  </p>
                                </div>

                                {/* Website link */}
                                {project.website && (
                                  <a
                                    href={project.website}
                                    target="_blank"
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-white/5 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4 text-blue-400/60" />
                                    <span className="text-foreground/60 hover:text-foreground">live-site.url</span>
                                  </a>
                                )}

                                {/* GitHub link */}
                                {project.github && (
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-white/5 transition-colors"
                                  >
                                    <SiGithub className="w-4 h-4 text-foreground/40" />
                                    <span className="text-foreground/60 hover:text-foreground">source.git</span>
                                  </a>
                                )}

                                {/* Tech stack folder */}
                                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm">
                                  <Folder className="w-4 h-4 text-blue-400/60" />
                                  <span className="text-foreground/60">stack/</span>
                                </div>
                                {project.tech.map((t) => (
                                  <div
                                    key={t}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ml-4"
                                  >
                                    <FileCode className="w-4 h-4 text-green-400/60" />
                                    <span className="text-foreground/60">{t.toLowerCase().replace(/\s+/g, "-")}.config</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeItem === "resume" && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    <a
                      href="/resume.pdf"
                      download
                      className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 transition-colors group"
                    >
                      <FileDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                      <div>
                        <div className="text-sm text-foreground/80 group-hover:text-foreground">
                          Leon_Ekelund_Resume.pdf
                        </div>
                        <div className="text-xs text-foreground/40">
                          Click to download
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )}

                {activeItem === "links" && (
                  <motion.div
                    key="links"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1"
                  >
                    {links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors group"
                      >
                        <link.icon className="w-5 h-5 text-foreground/40 group-hover:text-foreground/60" />
                        <span className="text-sm text-foreground/80 group-hover:text-foreground">
                          {link.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-foreground/30 ml-auto" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
