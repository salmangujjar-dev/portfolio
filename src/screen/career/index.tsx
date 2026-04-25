"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import SectionHeader from "@components/SectionHeader";
import { useCounter } from "@hooks/useCounter";

import { CAREER } from "@utils/constants";
import { TCareer } from "@utils/types";
import { cn } from "@lib/utils";

const extractStartYear = (duration: string) => {
  const match = duration.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
};

const CareerScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="career"
      className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-24 xl:px-40"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <SectionHeader
          eyebrow="Career"
          title={
            <>
              A path through{" "}
              <span className="text-accent">teams that ship.</span>
            </>
          }
          description="Five years across enterprise platforms, fintech, AI startups and creator tooling — full-stack, end to end."
        />

        <div ref={containerRef} className="relative">
          <div className="absolute left-[18px] top-0 h-full w-px md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ height: spineHeight }}
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent via-accent/70 to-accent/0"
            />
          </div>

          <ul className="relative flex flex-col gap-16 md:gap-28">
            {CAREER.map((role, idx) => (
              <RoleRow
                key={`${role.company}-${idx}`}
                role={role}
                index={idx}
                isActive={activeIndex === idx}
                onActivate={() => setActiveIndex(idx)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

type RoleRowProps = {
  role: TCareer;
  index: number;
  isActive: boolean;
  onActivate: () => void;
};

const RoleRow = ({ role, index, isActive, onActivate }: RoleRowProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const enteredRef = useRef(false);
  const isEntered = useInView(ref, {
    once: true,
    margin: "-15% 0px",
  });

  useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  useEffect(() => {
    if (isEntered) enteredRef.current = true;
  }, [isEntered]);

  const isLeft = index % 2 === 0;
  const startYear = extractStartYear(String(role.duration));

  return (
    <li ref={ref} className="relative">
      <YearBadge year={startYear} active={isActive} hasEntered={isEntered} />

      <div
        className={cn(
          "transition-opacity duration-500",
          !isActive && "opacity-40"
        )}
      >
        <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-x-16">
          {isLeft ? (
            <>
              <CardBody
                role={role}
                isActive={isActive}
                align="right"
                index={index}
              />
              <span className="hidden md:block" />
            </>
          ) : (
            <>
              <span className="hidden md:block" />
              <CardBody
                role={role}
                isActive={isActive}
                align="left"
                index={index}
              />
            </>
          )}
        </div>
      </div>
    </li>
  );
};

const YearBadge = ({
  year,
  active,
  hasEntered,
}: {
  year: number;
  active: boolean;
  hasEntered: boolean;
}) => {
  const display = useCounter(year, hasEntered);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-[18px] top-1 z-10 -translate-x-1/2 md:left-1/2"
    >
      <div
        className={cn(
          "flex min-w-[3.25rem] items-center justify-center rounded-full border bg-background px-3 py-1 text-[11px] font-mono font-semibold tabular-nums tracking-wider transition-all duration-300",
          active
            ? "border-accent text-accent shadow-glow"
            : "border-border text-muted-foreground"
        )}
      >
        {display || year}
      </div>
    </motion.div>
  );
};

type CardBodyProps = {
  role: TCareer;
  isActive: boolean;
  align: "left" | "right";
  index: number;
};

const CardBody = ({ role, isActive, align, index }: CardBodyProps) => {
  const isLeftAlign = align === "right";
  return (
    <motion.article
      initial={{ opacity: 0, x: isLeftAlign ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.05,
      }}
      className={cn(
        "relative rounded-xl border bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 md:p-6",
        isLeftAlign ? "md:text-right" : "md:text-left",
        isActive
          ? "border-accent/50 shadow-glow"
          : "border-border hover:border-border/80"
      )}
    >
      <div
        className={cn(
          "mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1",
          isLeftAlign && "md:justify-end"
        )}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {String(role.duration)}
        </span>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-editorial text-foreground md:text-2xl">
        {role.role}
      </h3>

      <CompanyLink
        name={String(role.company)}
        href={String(role.companyLink)}
        disabled={role.isNoLink}
        align={align}
      />

      <p
        className={cn(
          "mt-4 text-sm leading-relaxed text-muted-foreground text-pretty",
          isLeftAlign && "md:text-right"
        )}
      >
        {role.details}
      </p>
    </motion.article>
  );
};

const CompanyLink = ({
  name,
  href,
  disabled,
  align,
}: {
  name: string;
  href: string;
  disabled?: boolean;
  align: "left" | "right";
}) => {
  const className = cn(
    "mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent",
    align === "right" && "md:flex-row-reverse"
  );

  if (disabled) {
    return <span className={cn(className, "opacity-70")}>@{name}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(className, "underline-offset-4 hover:underline")}
    >
      @{name}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
};

export default CareerScreen;
