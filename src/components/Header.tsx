'use client';

import React, { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

import { EScreenType, useMediaQuery } from '@hooks/useMediaQuery';
import useMounted from '@hooks/useMounted';

import { SCharacter } from '@assets/index';
import { NAVBAR_OPTIONS } from '@utils/constants';
import { getLenis, scrollToSection } from '@lib/lenis';
import { cn } from '@lib/utils';

import { MdMenuOpen } from 'react-icons/md';
import { ThemeSwitcher } from './ThemeSwitcher';
import SubMenu from './SubMenu';

const ANCHOR_IDS = NAVBAR_OPTIONS.map((o) => o.href.replace('/#', ''));

const Header = () => {
  const pathname = usePathname();
  const isMd = useMediaQuery(EScreenType.md);
  const mounted = useMounted();

  const [activeId, setActiveId] = useState<string>('hero');
  

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const getSections = () =>
      ANCHOR_IDS.map((id) => document.getElementById(id)).filter(
        (el): el is HTMLElement => Boolean(el)
      );
  
    let lastScrollY = 0; // ← here
  
    const onScroll = ({ scroll }: { scroll: number }) => {
      const sections = getSections();
      if (!sections.length) return;
  
      const scrollingUp = scroll < lastScrollY;
      lastScrollY = scroll; // ← updated each frame
  
      const triggerY = scrollingUp
        ? window.innerHeight * 0.8
        : window.innerHeight * 0.35;
  
      const passed = sections.filter(
        (s) => s.getBoundingClientRect().top <= triggerY
      );
  
      const active = passed.length > 0 ? passed[passed.length - 1] : sections[0];
      setActiveId(active.id);
    };
  
    const lenis = getLenis();
  
    if (lenis) {
      lastScrollY = lenis.scroll;
      lenis.on("scroll", onScroll);
      onScroll({ scroll: lenis.scroll });
      return () => lenis.off("scroll", onScroll);
    }
  
    window.addEventListener("scroll", onScroll as any, { passive: true });
    onScroll({ scroll: window.scrollY });
    return () => window.removeEventListener("scroll", onScroll as any);
  }, [mounted]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== '/') return;

    e.preventDefault();
    const hash = href.slice(1);
    scrollToSection(hash);
    window.history.replaceState(null, '', href);
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
          onClick={(e) => handleNavClick(e, '/#hero')}
          className="flex items-center gap-1 rounded-full px-2 py-1 tracking-wide"
          aria-label="Home"
        >
          <SCharacter className="h-7 w-auto" />
          <span className="text-sm font-medium">alman Ahmed</span>
        </Link>

        {mounted && isMd && (
          <nav className="flex items-center gap-1">
            {NAVBAR_OPTIONS.map((item) => {
              const id = item.href.replace('/#', '');
              const isActive = activeId === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium tracking-wide transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{
                        type: 'spring',
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
