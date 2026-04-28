"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { slugify } from "@lib/slugify";
import { cn } from "@lib/utils";
import { TProjects } from "@utils/types";

type Props = {
  project: TProjects;
  isOpen: boolean;
  isFeatured: boolean;
  isHighlighted?: boolean;
  onSelect: (p: TProjects) => void;
};

const TILT = 6;

const BentoProjectCard = ({
  project,
  isOpen,
  isFeatured,
  isHighlighted = false,
  onSelect,
}: Props) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const layoutId = `project-hero-${slugify(project.title)}`;

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * TILT, y: px * TILT });
  };

  const onPointerLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="h-full"
      style={{ perspective: reduced ? "none" : "1000px" }}
    >
      <div
        className="h-full"
        style={
          reduced
            ? undefined
            : {
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d" as const,
                transition: "transform 120ms ease-out",
                willChange: "transform",
              }
        }
      >
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="group relative block w-full h-full text-left"
        >
          <div
            className={cn(
              "h-full overflow-hidden rounded-2xl border border-border/70 bg-card/30 shadow-sm flex flex-col",
              isHighlighted && "border-accent/50 shadow-glow",
              "transition-shadow duration-300",
              "group-hover:border-accent/40 group-hover:shadow-glow"
            )}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {!isOpen ? (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 h-full w-full"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110 bento-img-parallax"
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 30vw"}
                    priority={isFeatured}
                  />
                </motion.div>
              ) : (
                <div
                  className="aspect-[16/10] w-full"
                  aria-hidden
                />
              )}
            </div>
            <div className="flex flex-col gap-2 p-4 sm:p-5 my-auto">
              {isHighlighted && (
                <span className="inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Highlight
                </span>
              )}
              <h3
                className={cn(
                  "font-display font-semibold tracking-editorial",
                  isFeatured ? "text-fluid-base md:text-lg" : "text-sm md:text-base"
                )}
              >
                {project.title}
              </h3>
              <p
                className={cn(
                  "line-clamp-2 text-sm text-muted-foreground",
                  isFeatured && "line-clamp-3"
                )}
              >
                {project.description}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5 transition-[gap] duration-300 will-change-transform group-hover:gap-2.5">
                {project.technologies.map((t, i) => (
                  <motion.span
                    key={`${t.label}-${i}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background/50"
                    title={t.label}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: 0.04 * i,
                      type: "spring",
                      stiffness: 380,
                      damping: 26,
                    }}
                  >
                    <t.icon className="h-4 w-4" />
                  </motion.span>
                ))}
              </div>
              <span className="pt-1 text-xs font-medium uppercase tracking-[0.2em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Open
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BentoProjectCard;
