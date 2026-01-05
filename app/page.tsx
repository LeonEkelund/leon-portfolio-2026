import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about"
import { Projects } from "@/components/projects"

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Projects />
    </main>
  )
}