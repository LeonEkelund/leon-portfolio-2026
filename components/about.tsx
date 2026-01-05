import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { StockholmMap } from "@/components/bento-tiles/stockholm-map"
import { WpmStats } from "@/components/bento-tiles/wpm-stats"
import { TechStack } from "@/components/bento-tiles/tech-stack"
import { PokemonViewer } from "@/components/bento-tiles/pokemon-viewer"
import { GithubContributions } from "@/components/bento-tiles/github-contributions"
import { CtaCard } from "@/components/bento-tiles/cta-card"
import { MapPin, Keyboard, Github, Layers, Star } from "lucide-react"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
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
        <BentoCard label={<Star className="h-4 w-4" />} className="col-span-4 md:col-span-4 lg:col-span-4 row-span-2">
          <PokemonViewer />
        </BentoCard>

        {/* 3. LinkedIn - small square */}
        <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 row-span-1">
          <a
            href="https://www.linkedin.com/in/leon-ekelund-50050720a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedInIcon className="h-8 w-8" />
          </a>
        </BentoCard>

        {/* 4. GitHub - small square */}
        <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 row-span-1">
          <a
            href="https://github.com/leonekelund"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-8 w-8" />
          </a>
        </BentoCard>

        {/* 5. WPM */}
        <BentoCard label={<Keyboard className="h-4 w-4" />} className="col-span-4 md:col-span-4 lg:col-span-4 row-span-1">
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