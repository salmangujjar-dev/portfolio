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
const FEATURED_TITLE = "OneStream Live";

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
    const main =
      filtered.find((p) => p.title === FEATURED_TITLE) ?? filtered[0];
    return [main, ...filtered.filter((p) => p !== main)];
  }, [filtered]);

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
            <div className="max-w-3xl">
              <ProjectFilterPills
                options={options}
                value={filter}
                onChange={setFilter}
              />
            </div>
          </div>

          {ordered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No projects match that stack. Try &quot;{FILTER_ALL}&quot; to see
              everything.
            </p>
          ) : (
            <ul
              className="grid w-full list-none grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-5"
            >
              {ordered.map((p, i) => {
                const isFeatured = i === 0 && ordered.length > 1;
                return (
                  <li
                    key={p.title}
                    className={cn(
                      isFeatured && "md:col-span-2"
                    )}
                  >
                    <BentoProjectCard
                      project={p}
                      isOpen={viewing?.title === p.title}
                      isFeatured={isFeatured}
                      onSelect={setViewing}
                    />
                  </li>
                );
              })}
            </ul>
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
