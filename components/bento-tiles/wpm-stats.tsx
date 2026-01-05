"use client";

import { useEffect, useState } from "react";
import { DotPattern } from "@/components/ui/dot-pattern";

export function WpmStats() {
  const [wpm, setWpm] = useState<number | null>(null);
  const [acc, setAcc] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWpm() {
      try {
        const res = await fetch("https://api.monkeytype.com/users/personalBests?mode=time", {
          headers: {
            "Authorization": `ApeKey ${process.env.NEXT_PUBLIC_MONKEYTYPE_APE_KEY}`,
          },
        });

        const data = await res.json();
        console.log("Monkeytype response:", data);

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        // API returns { data: { "15": [{ wpm, acc, ... }] } } when mode=time
        const best = data.data?.["15"]?.[0];

        if (best?.wpm) {
          setWpm(Math.round(best.wpm));
          setAcc(Math.round(best.acc));
        }
      } catch (error) {
        console.error("Error fetching WPM:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWpm();
  }, []);

  return (
    <a
      href="https://monkeytype.com/profile/leonofcourse"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center justify-center h-full gap-3 p-4 overflow-hidden cursor-pointer"
    >
      {/* Default state - fades out on hover */}
      <DotPattern className="transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_50%,black_60%,transparent_100%)]" />
      {/* Hover state - fades in on hover */}
      <DotPattern className="transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black_30%,black_70%,transparent_100%)]" />
      {loading ? (
        <span className="text-muted-foreground animate-pulse">Loading...</span>
      ) : wpm ? (
        <>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-foreground">{wpm}</span>
            <span className="text-lg text-muted-foreground">wpm</span>
          </div>
          {acc && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{acc}%</span>
              <span>accuracy</span>
            </div>
          )}
        </>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </a>
  );
}
