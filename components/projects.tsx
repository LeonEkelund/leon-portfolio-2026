"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Folder, FileDown, Link2, ChevronRight, ExternalLink, FileText, FileCode, MapPin, Keyboard, Star, Layers, User } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { StockholmMap } from "@/components/bento-tiles/stockholm-map"
import { WpmStats } from "@/components/bento-tiles/wpm-stats"
import { TechStack } from "@/components/bento-tiles/tech-stack"
import { PokemonViewer } from "@/components/bento-tiles/pokemon-viewer"
import { GithubContributions } from "@/components/bento-tiles/github-contributions"

type SidebarItem = "projects" | "about" | "resume" | "links"

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
  { id: "about" as const, label: "About", icon: User },
  { id: "resume" as const, label: "Resume", icon: FileDown },
  { id: "links" as const, label: "Links", icon: Link2 },
]

export function Projects() {
  const [activeItem, setActiveItem] = useState<SidebarItem>("projects")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  return (
    <section id="projects" className="relative flex items-start justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative w-full max-w-6xl" style={{ zIndex: 10 }}
      >
        {/* Finder Window */}
        <div
          className="rounded-xl border border-white/20 bg-black/90 backdrop-blur-xl overflow-hidden"
          style={{
            boxShadow: '0 0 100px rgba(255, 255, 255, 0.15), 0 20px 60px rgba(0, 0, 0, 0.8)'
          }}
        >
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
              <span className="text-base text-foreground/50 font-medium">
                ~/Leon/{activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
              </span>
            </div>
            <div className="w-14" /> {/* Spacer for centering */}
          </div>

          <div className={`flex transition-all duration-300 ease-in-out ${
            activeItem === "about"
              ? "min-h-[520px] md:min-h-[1400px]"
              : "min-h-[520px] sm:min-h-[650px]"
          }`}>
            {/* Sidebar */}
            <div className="w-16 sm:w-56 border-r border-white/10 bg-white/[0.02] p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-foreground/40 font-medium px-2 sm:px-3 py-1 sm:py-1.5 mb-1">
                Favorites
              </div>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-2 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                    activeItem === item.id
                      ? "bg-white/10 text-foreground"
                      : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden sm:block truncate">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 sm:p-8">
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
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-base hover:bg-white/5 transition-colors group touch-manipulation"
                        >
                          <ChevronRight
                            className={`w-5 h-5 text-foreground/40 transition-transform ${
                              expandedProject === project.name ? "rotate-90" : ""
                            }`}
                          />
                          <Folder className="w-5 h-5 text-blue-400" />
                          <span className="text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                            {project.name}
                          </span>
                        </button>

                        <AnimatePresence>
                          {expandedProject === project.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="ml-10 py-2 space-y-1"
                          >
                                {/* README file */}
                                <div className="px-3 py-2 rounded-md text-base">
                                  <div className="flex items-center gap-2.5">
                                    <FileText className="w-5 h-5 text-foreground/40" />
                                    <span className="text-foreground/70">README.md</span>
                                  </div>
                                  <p className="text-foreground/60 text-base mt-1.5 ml-7 leading-relaxed">
                                    {project.description}
                                  </p>
                                </div>

                                {/* Website link */}
                                {project.website && (
                                  <a
                                    href={project.website}
                                    target="_blank"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-md text-base hover:bg-white/5 transition-colors"
                                  >
                                    <ExternalLink className="w-5 h-5 text-blue-400/60" />
                                    <span className="text-foreground/60 hover:text-foreground">live-site.url</span>
                                  </a>
                                )}

                                {/* GitHub link */}
                                {project.github && (
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-md text-base hover:bg-white/5 transition-colors"
                                  >
                                    <SiGithub className="w-5 h-5 text-foreground/40" />
                                    <span className="text-foreground/60 hover:text-foreground">source.git</span>
                                  </a>
                                )}

                                {/* Tech stack folder */}
                                <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-base">
                                  <Folder className="w-5 h-5 text-blue-400/60" />
                                  <span className="text-foreground/60">stack/</span>
                                </div>
                                {project.tech.map((t) => (
                                  <div
                                    key={t}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-md text-base ml-6"
                                  >
                                    <FileCode className="w-5 h-5 text-green-400/60" />
                                    <span className="text-foreground/60">{t.toLowerCase().replace(/\s+/g, "-")}.config</span>
                                  </div>
                                ))}
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
                      className="flex items-center gap-4 px-4 py-4 rounded-md hover:bg-white/5 transition-colors group"
                    >
                      <FileDown className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
                      <div>
                        <div className="text-base text-foreground/80 group-hover:text-foreground">
                          Leon_Ekelund_Resume.pdf
                        </div>
                        <div className="text-sm text-foreground/40">
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
                        className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-white/5 transition-colors group"
                      >
                        <link.icon className="w-6 h-6 text-foreground/40 group-hover:text-foreground/60" />
                        <span className="text-base text-foreground/80 group-hover:text-foreground">
                          {link.name}
                        </span>
                        <ExternalLink className="w-4 h-4 text-foreground/30 ml-auto" />
                      </a>
                    ))}
                  </motion.div>
                )}

                {activeItem === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-8"
                  >
                    {/* Intro Text */}
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        About Me
                      </h3>
                      <p className="text-base text-foreground/70 leading-relaxed">
                        I'm a 31-year-old front-end developer in Stockholm with a deep creative background.
                        20 years of music production, combined with 3D work in Blender and design chops
                        from the Adobe suite, gives me a different perspective on web development. I believe
                        the best interfaces feel effortless—where thoughtful motion, visual hierarchy, and
                        attention to detail create experiences that just work.
                      </p>
                    </div>

                    {/* Bento Grid Layout - Hidden on mobile */}
                    <div className="hidden md:grid w-full auto-rows-[7.5rem] md:auto-rows-[9.5rem] grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
                      {/* Location - Square */}
                      <div className="relative col-span-4 row-span-2 flex flex-col overflow-hidden rounded-2xl bg-white/[0.01] border border-white/10">
                        <div className="hidden md:block absolute top-4 left-4 z-10">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <MapPin className="h-3 w-3 text-foreground/60" />
                          </div>
                        </div>
                        <StockholmMap />
                      </div>

                      {/* Pokemon - Square */}
                      <div className="hidden md:flex relative col-span-4 row-span-2 flex-col overflow-hidden rounded-2xl bg-white/[0.01] border border-white/10">
                        <div className="hidden md:block absolute top-4 left-4 z-10">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <Star className="h-3 w-3 text-foreground/60" />
                          </div>
                        </div>
                        <PokemonViewer />
                      </div>

                      {/* WPM - Half height */}
                      <div className="hidden md:flex relative col-span-4 row-span-1 flex-col overflow-hidden rounded-2xl bg-white/[0.01] border border-white/10">
                        <div className="hidden md:block absolute top-4 left-4 z-10">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <Keyboard className="h-3 w-3 text-foreground/60" />
                          </div>
                        </div>
                        <WpmStats />
                      </div>

                      {/* Tech Stack - Half height */}
                      <div className="relative col-span-4 row-span-1 flex flex-col overflow-hidden rounded-2xl bg-white/[0.01] border border-white/10">
                        <div className="hidden md:block absolute top-4 left-4 z-10">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <Layers className="h-3 w-3 text-foreground/60" />
                          </div>
                        </div>
                        <TechStack />
                      </div>

                      {/* GitHub Contributions - Full Width */}
                      <div className="relative col-span-4 md:col-span-8 row-span-2 flex flex-col overflow-hidden rounded-2xl bg-white/[0.01] border border-white/10">
                        <GithubContributions />
                      </div>
                    </div>
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
