"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@lib/utils";

type Props = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

const ProjectFilterPills = ({ options, value, onChange }: Props) => {
  const reduced = useReducedMotion();

  return (
    <div
      className="flex max-w-full flex-wrap gap-1.5 rounded-2xl border border-border/60 bg-muted/20 p-1.5"
      role="group"
      aria-label="Filter projects by technology"
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && !reduced && (
              <motion.span
                layoutId="projectFilterPill"
                className="absolute inset-0 -z-10 rounded-xl border border-accent/50 bg-accent/15 shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            {active && reduced && (
              <span className="absolute inset-0 -z-10 rounded-xl border border-accent/50 bg-accent/15" />
            )}
            <span className="relative z-10 whitespace-nowrap">{opt}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilterPills;
