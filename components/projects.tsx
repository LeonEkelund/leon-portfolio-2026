"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Folder, ChevronRight, ExternalLink, FileText, FileCode, Palette, Music, Image as ImageIcon } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { SectionHeading } from "@/components/ui/section-heading"
import { Lightbox } from "@/components/ui/lightbox"
import { useLightbox } from "@/components/lightbox-context"
import { Frame } from "@/components/ui/frame"

const images3d = [
  { name: "render-1.png", src: "/images/3d/1.png" },
  { name: "render-2.png", src: "/images/3d/2.png" },
  { name: "render-3.png", src: "/images/3d/3.png" },
  { name: "render-4.png", src: "/images/3d/4.png" },
  { name: "render-5.png", src: "/images/3d/5.png" },
]

const musicTracks = [
  { name: "track-1.mp4", url: "https://youtu.be/asx-vNmSpE0" },
  { name: "track-2.mp4", url: "https://youtu.be/IDlwfUo4GYE" },
]

type SidebarItem = "projects" | "creative"

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

const sidebarItems = [
  { id: "projects" as const, label: "Projects", icon: Folder },
  { id: "creative" as const, label: "Creative", icon: Palette },
]

export function Projects() {
  const [activeItem, setActiveItem] = useState<SidebarItem>("projects")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [expandedCreative, setExpandedCreative] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const { setIsLightboxOpen } = useLightbox()

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setIsLightboxOpen(false)
  }

  return (
    <section id="projects" className="relative flex flex-col items-center justify-center px-4 py-20">
      <SectionHeading title="Work" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative w-full max-w-[1100px] mt-16" style={{ zIndex: 10 }}
      >
        <Frame src="/images/frames/bgimage1.png" padding={50} hideOnMobile>
          {/* Finder Window */}
          <div
            className="rounded-xl border border-stone-200 bg-transparent overflow-hidden shadow-lg"
          >
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-stone-200">
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

          <div className="flex min-h-[470px] sm:min-h-[580px] transition-all duration-300 ease-in-out">
            {/* Sidebar */}
            <div className="w-16 sm:w-56 border-r border-stone-200 bg-stone-50 p-2 sm:p-3">
              <div className="text-[10px] sm:text-sm text-stone-500 font-medium px-2 sm:px-3 py-1 sm:py-1.5 mb-1">
                Favorites
              </div>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-2 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                    activeItem === item.id
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden sm:block truncate">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 sm:p-6 bg-white">
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
                      <motion.div key={project.name} layout transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}>
                        <motion.button
                          layout
                          onClick={() => setExpandedProject(
                            expandedProject === project.name ? null : project.name
                          )}
                          className="w-full flex items-center gap-2.5 py-2.5 rounded-md text-base hover:bg-white/5 group touch-manipulation"
                        >
                          <ChevronRight
                            className={`w-5 h-5 text-foreground/40 ${
                              expandedProject === project.name ? "rotate-90" : ""
                            }`}
                            style={{ transition: 'transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
                          />
                          <Folder className="w-5 h-5 text-blue-400" />
                          <span className="text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                            {project.name}
                          </span>
                        </motion.button>

                        <AnimatePresence initial={false}>
                          {expandedProject === project.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-10 py-2 space-y-1">
                                {/* README file */}
                                <div className="py-2 rounded-md text-base">
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
                                    className="flex items-center gap-2.5 py-2 rounded-md text-base hover:bg-white/5 transition-colors"
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
                                    className="flex items-center gap-2.5 py-2 rounded-md text-base hover:bg-white/5 transition-colors"
                                  >
                                    <SiGithub className="w-5 h-5 text-foreground/40" />
                                    <span className="text-foreground/60 hover:text-foreground">source.git</span>
                                  </a>
                                )}

                                {/* Tech stack folder */}
                                <div className="flex items-center gap-2.5 py-2 rounded-md text-base">
                                  <Folder className="w-5 h-5 text-blue-400/60" />
                                  <span className="text-foreground/60">stack/</span>
                                </div>
                                {project.tech.map((t) => (
                                  <div
                                    key={t}
                                    className="flex items-center gap-2.5 py-2 rounded-md text-base ml-6"
                                  >
                                    <FileCode className="w-5 h-5 text-green-400/60" />
                                    <span className="text-foreground/60">{t.toLowerCase().replace(/\s+/g, "-")}.config</span>
                                  </div>
                                ))}
                            </div>
                          </motion.div>
                        )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeItem === "creative" && (
                  <motion.div
                    key="creative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1"
                  >
                    {/* 3D Folder */}
                    <motion.div layout transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}>
                      <motion.button
                        layout
                        onClick={() => setExpandedCreative(
                          expandedCreative === "3d" ? null : "3d"
                        )}
                        className="w-full flex items-center gap-2.5 py-2.5 rounded-md text-base hover:bg-white/5 group touch-manipulation"
                      >
                        <ChevronRight
                          className={`w-5 h-5 text-foreground/40 ${
                            expandedCreative === "3d" ? "rotate-90" : ""
                          }`}
                          style={{ transition: 'transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
                        />
                        <Folder className="w-5 h-5 text-blue-400" />
                        <span className="text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                          3D
                        </span>
                      </motion.button>

                      <AnimatePresence initial={false}>
                        {expandedCreative === "3d" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-10 py-2 space-y-1">
                              {images3d.map((image, index) => (
                                <button
                                  key={image.name}
                                  onClick={() => openLightbox(index)}
                                  className="flex items-center gap-2.5 py-2 rounded-md text-base hover:bg-white/5 transition-colors outline-none"
                                >
                                  <ImageIcon className="w-5 h-5 text-pink-400/70" />
                                  <span className="text-foreground/60 hover:text-foreground">{image.name}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Music Folder */}
                    <motion.div layout transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}>
                      <motion.button
                        layout
                        onClick={() => setExpandedCreative(
                          expandedCreative === "music" ? null : "music"
                        )}
                        className="w-full flex items-center gap-2.5 py-2.5 rounded-md text-base hover:bg-white/5 group touch-manipulation"
                      >
                        <ChevronRight
                          className={`w-5 h-5 text-foreground/40 ${
                            expandedCreative === "music" ? "rotate-90" : ""
                          }`}
                          style={{ transition: 'transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
                        />
                        <Folder className="w-5 h-5 text-blue-400" />
                        <span className="text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                          Music
                        </span>
                      </motion.button>

                      <AnimatePresence initial={false}>
                        {expandedCreative === "music" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-10 py-2 space-y-1">
                              {musicTracks.map((track) => (
                                <a
                                  key={track.name}
                                  href={track.url}
                                  target="_blank"
                                  className="flex items-center gap-2.5 py-2 rounded-md text-base hover:bg-white/5 transition-colors"
                                >
                                  <Music className="w-5 h-5 text-purple-400/70" />
                                  <span className="text-foreground/60 hover:text-foreground">{track.name}</span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
        </Frame>
      </motion.div>

      <Lightbox
        images={images3d.map((img) => img.src)}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </section>
  )
}
