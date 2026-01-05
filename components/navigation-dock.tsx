"use client"

import { Dock, DockIcon } from "@/components/ui/dock"
import Link from "next/link"
import { Home, User, FolderKanban, Mail } from "lucide-react"

export function NavigationDock() {
  return (
    <Dock className="fixed bottom-10 left-0 right-0" iconMagnification={50}>
      <DockIcon>
        <Link href="#home" className="block size-full">
          <Home className="size-full" />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="/about" className="block size-full">
          <User className="size-full" />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="/projects" className="block size-full">
          <FolderKanban className="size-full" />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="/contact" className="block size-full">
          <Mail className="size-full" />
        </Link>
      </DockIcon>
    </Dock>
  )
}
