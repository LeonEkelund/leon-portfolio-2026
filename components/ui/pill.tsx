interface PillProps {
  children: React.ReactNode
}

export function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-stone-200/50 bg-background/50 backdrop-blur-xl px-3 py-1 text-sm text-stone-900">
      {children}
    </span>
  )
}
