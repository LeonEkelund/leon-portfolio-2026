"use client"

import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { StockholmMap } from "@/components/bento-tiles/stockholm-map"
import { WpmStats } from "@/components/bento-tiles/wpm-stats"
import { TechStack } from "@/components/bento-tiles/tech-stack"
import { PokemonViewer } from "@/components/bento-tiles/pokemon-viewer"
import { GithubContributions } from "@/components/bento-tiles/github-contributions"
import { CtaCard } from "@/components/bento-tiles/cta-card"
import { MapPin, Keyboard, Layers, Star, ArrowRight } from "lucide-react"
import { useState } from "react"

function ViewProjectsButton() {
  const [isHovered, setIsHovered] = useState(false)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToProjects}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center justify-center gap-1.5 h-full w-full text-muted-foreground hover:text-foreground transition-colors duration-300"
    >
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">View Projects</span>
        <ArrowRight
          className={`h-5 w-5 transition-transform duration-300 ${
            isHovered ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`h-[1px] bg-current transition-all duration-300 origin-center ${
          isHovered ? "w-[7.5rem]" : "w-0"
        }`}
      />
    </button>
  )
}

export function AboutMe() {
  return (
    <section className="px-6 py-12">
      <BentoGrid className="max-w-5xl mx-auto">

        {/* 1. Location */}
        <BentoCard label={<MapPin className="h-4 w-4" />} className="col-span-4 md:col-span-4 lg:col-span-4 row-span-2">
          <StockholmMap />
        </BentoCard>

        {/* 2. Sandshrew */}
        <BentoCard label={<Star className="h-4 w-4" />} className="hidden md:flex col-span-4 md:col-span-4 lg:col-span-4 row-span-2">
          <PokemonViewer />
        </BentoCard>

        {/* 3. View Projects */}
        <BentoCard className="col-span-4 md:col-span-4 lg:col-span-4 row-span-1">
          <ViewProjectsButton />
        </BentoCard>

        {/* 5. WPM */}
        <BentoCard label={<Keyboard className="h-4 w-4" />} className="hidden md:flex col-span-4 md:col-span-4 lg:col-span-4 row-span-1">
          <WpmStats />
        </BentoCard>

        {/* 6. Tech Stack */}
        <BentoCard label={<Layers className="h-4 w-4" />} className="col-span-4 md:col-span-8 lg:col-span-6 row-span-1">
          <TechStack />
        </BentoCard>

        {/* 7. GitHub Contributions */}
        <BentoCard className="col-span-4 md:col-span-4 lg:col-span-6 row-span-2">
          <GithubContributions />
        </BentoCard>

        {/* CTA */}
        <BentoCard className="col-span-4 md:col-span-4 lg:col-span-6 row-span-1">
          <CtaCard />
        </BentoCard>


      </BentoGrid>
    </section>
  )
}