import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[7.5rem] md:auto-rows-[9.5rem] grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  label,
  className,
  children,
}: {
  label?: ReactNode;
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={cn(
      "relative col-span-12 row-span-2 flex flex-col overflow-hidden rounded-2xl",
      "bg-white/[0.02] border border-border",
      className
    )}
  >
    {label && (
      <div className="hidden md:block absolute top-4 left-4 z-10">
        <Pill>{label}</Pill>
      </div>
    )}
    {children}
  </div>
);

export { BentoCard, BentoGrid };
