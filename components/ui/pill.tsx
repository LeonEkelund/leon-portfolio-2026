interface PillProps {
  children: React.ReactNode
}

export function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-black/40 px-3 py-1 text-sm text-foreground">
      {children}
    </span>
  )
}
