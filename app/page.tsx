import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about"

import Image from "next/image";
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
    </main>
  )
}