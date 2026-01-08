import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Projects />
      <Footer />
    </main>
  )
}