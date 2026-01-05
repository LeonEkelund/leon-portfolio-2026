import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Projects />
      <Footer />
    </main>
  )
}