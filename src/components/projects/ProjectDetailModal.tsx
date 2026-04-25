"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";

import Badge from "@components/kit/Badge";
import { slugify } from "@lib/slugify";
import { TProjects } from "@utils/types";

type Props = {
  project: TProjects;
  onExited: () => void;
};

const ProjectDetailModal = ({ project, onExited }: Props) => {
  const id = useId();
  const [visible, setVisible] = useState(true);
  const layoutId = `project-hero-${slugify(project.title)}`;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const requestClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onKey = useCallback(
    (e: KeyboardEvent) => e.key === "Escape" && requestClose(),
    [requestClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        onExited();
      }}
    >
      {visible && (
        <motion.div
          key={project.title}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={requestClose}
            className="fixed inset-0 z-0 cursor-default bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby={`${id}-title`}
            className="relative z-10 my-auto w-full max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl">
              <div className="relative aspect-[16/10] w-full">
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 h-full w-full"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40rem"
                    priority
                  />
                </motion.div>
                <button
                  type="button"
                  onClick={requestClose}
                  className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <div className="flex flex-col gap-2">
                  <h2
                    id={`${id}-title`}
                    className="font-display text-2xl font-semibold tracking-editorial"
                  >
                    {project.title}
                  </h2>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    View site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((f, i) => (
                      <Badge key={i}>{f}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Technology
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((t, i) => (
                      <div
                        key={i}
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/30"
                        title={t.label}
                      >
                        <t.icon className="h-7 w-7" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
