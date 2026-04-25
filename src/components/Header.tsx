"use client";

import React, { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { EScreenType, useMediaQuery } from "@hooks/useMediaQuery";
import useMounted from "@hooks/useMounted";

import { SCharacter } from "@assets/index";
import { NAVBAR_OPTIONS } from "@utils/constants";
import { scrollToSection } from "@lib/lenis";
import { cn } from "@lib/utils";

import { MdMenuOpen } from "react-icons/md";
import { ThemeSwitcher } from "./ThemeSwitcher";
import SubMenu from "./SubMenu";

const ANCHOR_IDS = NAVBAR_OPTIONS.map((o) => o.href.replace("/#", ""));

const Header = () => {
  const pathname = usePathname();
  const isMd = useMediaQuery(EScreenType.md);
  const mounted = useMounted();

  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = ANCHOR_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;

    e.preventDefault();
    const hash = href.slice(1);
    scrollToSection(hash);
    window.history.replaceState(null, "", href);
    setActiveId(hash.slice(1));
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 md:px-10 md:py-4 lg:px-16 xl:px-24">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-border/60 bg-background/60 px-3 py-2 backdrop-blur-md md:px-5"
      >
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, "/#hero")}
          className="flex items-center gap-1 rounded-full px-2 py-1 tracking-wide"
          aria-label="Home"
        >
          <SCharacter className="h-7 w-auto" />
          <span className="text-sm font-medium">alman Ahmed</span>
        </Link>

        {mounted && isMd && (
          <nav className="flex items-center gap-1">
            {NAVBAR_OPTIONS.map((item) => {
              const id = item.href.replace("/#", "");
              const isActive = activeId === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium tracking-wide transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-muted"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-1">
          <ThemeSwitcher />
          {mounted && !isMd && (
            <SubMenu
              className="block h-9 w-9 cursor-pointer rounded-full p-1.5 hover:bg-muted"
              onNavClick={handleNavClick}
              activeId={activeId}
            >
              <MdMenuOpen className="h-full w-full" />
            </SubMenu>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
