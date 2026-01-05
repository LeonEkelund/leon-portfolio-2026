"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const levelColors = [
  "bg-white/[0.03] hover:bg-white/[0.08]",
  "bg-white/[0.15] hover:bg-white/[0.25]",
  "bg-white/[0.30] hover:bg-white/[0.45]",
  "bg-white/[0.50] hover:bg-white/[0.65]",
  "bg-white/[0.70] hover:bg-white/[0.85]",
];

export function GithubContributions() {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/leonekelund?y=last")
      .then((res) => res.json())
      .then((data) => {
        if (data.contributions) {
          const allDays: ContributionDay[] = data.contributions;
          const lastDays = allDays.slice(-63);

          const groupedWeeks: ContributionDay[][] = [];
          for (let i = 0; i < lastDays.length; i += 7) {
            groupedWeeks.push(lastDays.slice(i, i + 7));
          }

          const total = lastDays.reduce((sum, day) => sum + day.count, 0);

          setWeeks(groupedWeeks);
          setTotalContributions(total);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading...
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-between h-full px-8 py-4">
      {/* Left side - Stats */}
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-semibold text-foreground">
          {hoveredDay ? hoveredDay.count : totalContributions}
        </p>
        <p className="text-sm text-muted-foreground">
          {hoveredDay ? (
            <>contribution{hoveredDay.count !== 1 ? 's' : ''} on {formatDate(hoveredDay.date)}</>
          ) : (
            <>contributions in the last 2 months</>
          )}
        </p>
      </div>

      {/* Right side - Grid */}
      <div
        className="flex gap-[6px]"
        onMouseLeave={() => setHoveredDay(null)}
      >
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[6px]">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-5 h-5 rounded-md ${levelColors[day.level]} transition-all duration-200 cursor-pointer hover:scale-125 hover:z-10`}
                onMouseEnter={() => setHoveredDay(day)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
