"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
  gap?: string;
}

export function Marquee({
  children,
  className,
  reverse = false,
  duration = 20,
  gap = "2rem",
}: MarqueeProps) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
        style={{
          animationDuration: `${duration}s`,
          gap,
          paddingRight: gap,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
        style={{
          animationDuration: `${duration}s`,
          gap,
          paddingRight: gap,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
