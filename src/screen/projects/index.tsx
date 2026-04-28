"use client";

import { useMemo, useState } from "react";
import { LayoutGroup } from "motion/react";

import BentoProjectCard from "@components/projects/BentoProjectCard";
import ProjectDetailModal from "@components/projects/ProjectDetailModal";
import ProjectFilterPills from "@components/projects/ProjectFilterPills";
import SectionHeader from "@components/SectionHeader";

import { PROJECTS } from "@utils/constants";
import { TProjects } from "@utils/types";
import { cn } from "@lib/utils";

const FILTER_ALL = "All";
const PRIMARY_HIGHLIGHTS = ["OneStream Live", "RemoteReps"] as const;

// 8 hero slots only — row 5 ("Anything Anything Anything") is remainderTiles
const getHeroTileClass = (index: number) => {
  switch (index) {
    case 0: return "lg:[grid-area:one]";
    case 1: return "lg:[grid-area:top]";
    case 2: return "lg:[grid-area:mid]";
    case 3: return "lg:[grid-area:left]";
    case 4: return "lg:[grid-area:remote]";
    default: return "";
  }
};

const buildHeroPattern = (projects: TProjects[]) => {
  const pool = [...projects];

  const take = (title?: string): TProjects | undefined => {
    if (!title) return pool.shift();
    const idx = pool.findIndex((p) => p.title === title);
    if (idx >= 0) return pool.splice(idx, 1)[0];
    return pool.shift();
  };

  return {
    heroTiles: [
      take("OneStream Live"), // 0 → one    (rows 1-2, cols 1-2)
      take(),                 // 1 → top    (row 1, col 3)
      take(),                 // 2 → mid    (row 2, col 3)
      take(),                 // 3 → left   (rows 3-4, col 1)
      take("RemoteReps"),     // 4 → remote (rows 3-4, cols 2-3)
    ].filter((p): p is TProjects => Boolean(p)),
    remainderTiles: pool,     // everything else → plain 3-col grid below
  };
};

const buildFilterOptions = () => {
  const labels = new Set<string>();
  PROJECTS.forEach((p) => p.technologies.forEach((t) => labels.add(t.label)));
  return [FILTER_ALL, ...Array.from(labels).sort((a, b) => a.localeCompare(b))];
};

const ProjectsScreen = () => {
  const [filter, setFilter] = useState(FILTER_ALL);
  const [viewing, setViewing] = useState<TProjects | null>(null);

  const options = useMemo(() => buildFilterOptions(), []);

  const filtered = useMemo(() => {
    if (filter === FILTER_ALL) return PROJECTS;
    return PROJECTS.filter((p) =>
      p.technologies.some((t) => t.label === filter)
    );
  }, [filter]);

  const ordered = useMemo(() => {
    if (filtered.length === 0) return [];
    const highlighted = PRIMARY_HIGHLIGHTS.map((title) =>
      filtered.find((p) => p.title === title)
    ).filter((p): p is TProjects => Boolean(p));
    const remainder = filtered.filter((p) => !highlighted.includes(p));
    return [...highlighted, ...remainder];
  }, [filtered]);

  const { heroTiles, remainderTiles } = useMemo(
    () => buildHeroPattern(ordered),
    [ordered]
  );

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-24 xl:px-40"
    >
      <LayoutGroup>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-10 md:gap-14">
          <div className="flex flex-col gap-8">
            <SectionHeader
              align="left"
              eyebrow="Work"
              title={
                <>
                  Projects & <span className="text-accent">builds</span>
                </>
              }
              description="A mix of product work, platforms, and experiments — with emphasis on the stack that made each one real."
            />
            <div className="">
              <ProjectFilterPills
                options={options}
                value={filter}
                onChange={setFilter}
              />
            </div>
          </div>

          {ordered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No projects match that stack. Try &quot;{FILTER_ALL}&quot; to see everything.
            </p>
          ) : (
            <div className="flex flex-col gap-5">

              {/* ── Mobile / tablet: single responsive grid, no bento ── */}
              <ul className="grid w-full list-none grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
                {ordered.map((p) => (
                  <li key={p.title} className="h-full">
                    <BentoProjectCard
                      project={p}
                      isOpen={viewing?.title === p.title}
                      isFeatured={PRIMARY_HIGHLIGHTS.includes(p.title as typeof PRIMARY_HIGHLIGHTS[number])}
                      isHighlighted={PRIMARY_HIGHLIGHTS.includes(p.title as typeof PRIMARY_HIGHLIGHTS[number])}
                      onSelect={setViewing}
                    />
                  </li>
                ))}
              </ul>

              {/* ── Desktop bento grid ──
                  Grid areas:
                    one    one    top
                    one    one    mid
                    left   remote remote
                    left   remote remote
                  Row 5+ overflow → remainderTiles grid below
              */}
              {heroTiles.length > 0 && (
               <ul
               className="hidden w-full list-none lg:grid lg:grid-cols-3 lg:gap-5"
               style={{
                 gridTemplateAreas: `
                   "one one top"
                   "one one mid"
                   "left remote remote"
                   "left remote remote"
                 `,
                 gridTemplateRows: "repeat(4, auto)",
                 alignItems: "stretch",
               }}
             >
               {heroTiles.map((p, index) => {
                 const isHighlighted = PRIMARY_HIGHLIGHTS.includes(
                   p.title as typeof PRIMARY_HIGHLIGHTS[number]
                 );
                 const isFeatured = index === 0 || index === 4;
                 return (
                   <li
                     key={p.title}
                     className={cn("min-h-0 min-w-0 h-full", getHeroTileClass(index))}  // ← h-full here
                   >
                     <BentoProjectCard
                       project={p}
                       isOpen={viewing?.title === p.title}
                       isFeatured={isFeatured}
                       isHighlighted={isHighlighted}
                       onSelect={setViewing}
                     />
                   </li>
                 );
               })}
             </ul>
              )}

              {/* ── Overflow + remainder tiles (row 5 and beyond) ── */}
              {remainderTiles.length > 0 && (
                <ul className="grid w-full list-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {remainderTiles.map((p) => (
                    <li key={p.title} className="h-full">
                      <BentoProjectCard
                        project={p}
                        isOpen={viewing?.title === p.title}
                        isFeatured={false}
                        isHighlighted={false}
                        onSelect={setViewing}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {viewing && (
            <ProjectDetailModal
              key={viewing.title}
              project={viewing}
              onExited={() => setViewing(null)}
            />
          )}
        </div>
      </LayoutGroup>
    </section>
  );
};

export default ProjectsScreen;