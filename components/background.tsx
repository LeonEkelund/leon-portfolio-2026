"use client";

export function Background() {
  return (
    <div
      className="absolute left-0 right-0 -z-10 pointer-events-none"
      style={{
        top: "-50px",
        height: "calc(40vh + 50px)",
        background: "radial-gradient(ellipse 120% 60% at 50% 50px, rgba(255,255,255,0.12) 0%, transparent 100%)",
        filter: "blur(20px)",
      }}
    />
  );
}
