"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

import { EScreenType, useMediaQuery } from "../hooks/useMediaQuery";

import { NAVBAR_OPTIONS } from "@utils/constants";
import { clsxm } from "@utils/clsxm";

import { MdMenuOpen } from "react-icons/md";

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: "-100%",
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Header = () => {
  const [menu, setMenu] = useState(false);

  const isMd = useMediaQuery(EScreenType.md);

  const toggleMenu = () => setMenu(!menu);

  return (
    <header
      className={clsxm(
        "flex items-center top-0 relative px-2 py-4 md:px-20 lg:px-48 justify-between rounded-2xl bg-[rgba(123,74,226,0.05)]",
        { ["flex-col gap-y-2"]: menu }
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
        >
          <MdMenuOpen
            className={clsxm("md:hidden block h-10 w-10 cursor-pointer", {
              ["-scale-x-100"]: menu,
            })}
            onClick={toggleMenu}
          />
        </motion.div>
      </motion.div>
      <motion.nav
        className={clsxm(
          "md:gap-x-6 md:inline-flex gap-y-2 text-center hidden",
          { ["flex flex-col mx-auto"]: menu }
        )}
        animate={!isMd ? (menu ? "open" : "closed") : undefined}
        {...(isMd && {
          initial: { x: 500, opacity: 0.5 },
          animate: { x: 0, opacity: 1 },
          transition: { duration: 1, ease: "easeInOut" },
        })}
        variants={variants}
      >
        {NAVBAR_OPTIONS.map((item, index) => (
          <Link
            key={index}
            href="#"
            className="relative px-2 py-1.5 rounded-md cursor-pointer hover:scale-125 ease-in-out duration-300 font-medium tracking-wide group"
          >
            <span>{item.label}</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-indigo-400 group-hover:w-full" />
          </Link>
        ))}
      </motion.nav>
    </header>
  );
};

export default Header;
