"use client";

import { TECHNOLOGIES } from "@utils/technology-const";
import { cn } from "@lib/utils";

const TECH_LIST = [
  TECHNOLOGIES.NEXT,
  TECHNOLOGIES.REACT,
  TECHNOLOGIES.NODE,
  TECHNOLOGIES.NEST,
  TECHNOLOGIES.EXPRESS,
  TECHNOLOGIES.TAILWIND,
  TECHNOLOGIES.PYTHON,
  TECHNOLOGIES.DOCKER,
  TECHNOLOGIES.KUBERNETES,
  TECHNOLOGIES.POSTGRESQL,
  TECHNOLOGIES.MONGO_DB,
  TECHNOLOGIES.AWS,
  TECHNOLOGIES.GCP,
  TECHNOLOGIES.REDIS,
  TECHNOLOGIES.STRAPI,
  TECHNOLOGIES.TURBO,
];

type Props = {
  className?: string;
};

const TechMarquee = ({ className }: Props) => {
  const items = [...TECH_LIST, ...TECH_LIST];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden mask-fade-x",
        className
      )}
      aria-label="Technologies"
    >
      <div className="flex w-max items-center gap-12 py-6 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none will-change-transform">
        {items.map((tech, idx) => (
          <div
            key={`${tech.label}-${idx}`}
            className="flex shrink-0 items-center gap-3 opacity-50 transition-opacity duration-300 hover:opacity-100"
          >
            <tech.icon className="h-7 w-7" />
            <span className="text-sm font-medium tracking-wide text-muted-foreground">
              {tech.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
