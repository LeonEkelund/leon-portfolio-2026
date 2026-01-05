import Link from "next/link"
import { BarChart2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/40">
        <p>© 2025 Leon Ekelund</p>
        <Link
          href="https://cloud.umami.is/share/Gp9EGEX0AMkYYMj1"
          target="_blank"
          className="flex items-center gap-1.5 hover:text-foreground/60 transition-colors"
        >
          <BarChart2 className="w-4 h-4" />
          Analytics
        </Link>
      </div>
    </footer>
  )
}
