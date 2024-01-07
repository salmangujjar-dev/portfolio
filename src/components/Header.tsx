"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { NAVBAR_OPTIONS } from "@utils/constants";

const Header = () => {
  return (
    <header className="flex items-center top-0 sticky px-2 py-4 md:px-32 lg:px-48 justify-between rounded-2xl bg-[rgba(123,74,226,0.05)]">
      <motion.h1
        className="tracking-wider rounded-full border p-2 hover:border-indigo-500 cursor-pointer select-none"
        initial={{ x: -500, opacity: 0.5, scale: 0 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeIn" }}
      >
        SA
      </motion.h1>
      <motion.nav
        className="gap-x-6 inline-flex"
        initial={{ x: 500, opacity: 0.5, scale: 0 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
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
