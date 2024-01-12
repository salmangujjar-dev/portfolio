"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { EScreenType, useMediaQuery } from "../hooks/useMediaQuery";
import useMounted from "../hooks/useMounted";

import { NAVBAR_OPTIONS } from "@utils/constants";
import { clsxm } from "@utils/clsxm";

import { MdMenuOpen } from "react-icons/md";

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    display: "flex",
    pointerEvents: "none",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    transitionEnd: {
      pointerEvents: "auto",
    },
  },
  closed: {
    y: "-100%",
    opacity: 0,
    pointerEvents: "none",
    transition: {
      y: { stiffness: 1000 },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const Header = () => {
  const [menu, setMenu] = useState<boolean | undefined>(true);

  const isMd = useMediaQuery(EScreenType.md);
  const mounted = useMounted();

  const toggleMenu = () => setMenu(!menu);

  useEffect(() => {
    setMenu(isMd ? true : undefined);
  }, [isMd]);

  return (
    <header
      className={clsxm(
        "md:flex md:items-center top-0 relative px-3 py-2 lg:px-4 xl:px-6 lg:py-2 xl:py-3 md:mt-6 md:mx-10 lg:mx-20 xl:mx-32 md:justify-between rounded-b-md md:rounded-full bg-indigo-800"
      )}
    >
      <motion.div
        initial={{ x: 50, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex justify-between w-full"
      >
        <motion.h1
          className="tracking-wider rounded-full border p-2 hover:border-indigo-500 cursor-pointer select-none"
          initial={{ x: -500, opacity: 0.5, scale: 0 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeIn" }}
        >
          SA
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="focus-visible: outline-none"
        >
          <MdMenuOpen
            className={clsxm("md:hidden block h-10 w-10 cursor-pointer", {
              ["-scale-x-100"]: menu,
            })}
            onClick={toggleMenu}
          />
        </motion.div>
      </motion.div>
      {mounted && (
        <AnimatePresence
          key={isMd.toString()}
          initial={true}
        >
          <motion.nav
            className={clsxm(
              "md:gap-x-6 md:inline-flex gap-y-2 text-center hidden flex-col md:flex-row"
            )}
            initial={{ display: "none" }}
            animate={
              !isMd && typeof menu !== "undefined"
                ? menu
                  ? "open"
                  : "closed"
                : undefined
            }
            {...(isMd && {
              initial: { x: 500, opacity: 0.5, display: "flex" },
              animate: { x: 0, opacity: 1 },
              transition: { duration: 1, ease: "easeInOut" },
            })}
            variants={variants}
          >
            {NAVBAR_OPTIONS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative px-2 py-1.5 rounded-md cursor-pointer hover:scale-125 ease-in-out duration-300 font-medium tracking-wide group"
              >
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-indigo-400 group-hover:w-full" />
              </Link>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </header>
  );
};

export default Header;
