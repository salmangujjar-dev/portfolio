"use client";

import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@lib/utils";
import { NAVBAR_OPTIONS } from "@utils/constants";
import { EScreenType, useMediaQuery } from "@hooks/useMediaQuery";

type TSubMenu = PropsWithChildren<{
  className: string;
  activeId?: string;
  onNavClick?: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}>;

const SubMenu = ({ children, className, activeId, onNavClick }: TSubMenu) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isMd = useMediaQuery(EScreenType.md);

  const toggle = () => setIsOpen((v) => !v);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMd) setIsOpen(false);
  }, [isMd]);

  return (
    <div className="relative" ref={ref}>
      {React.cloneElement(children as ReactElement, {
        onClick: toggle,
        className: cn(className, isOpen && "-scale-x-100"),
      })}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-3 flex min-w-[12rem] flex-col overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-glow"
          >
            {NAVBAR_OPTIONS.map((item) => {
              const id = item.href.replace("/#", "");
              const isActive = activeId === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    onNavClick?.(e, item.href);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubMenu;
