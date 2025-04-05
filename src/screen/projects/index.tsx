"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ModalKit from "@components/kit/Modal/Project";
import { PROJECTS } from "@utils/constants";
import { EScreenType, useMediaQuery } from "../../hooks/useMediaQuery";
import useMounted from "../../hooks/useMounted";

import { FaChevronRight as ChevronRightIcon } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

const ProjectsScreen = () => {
  const [isOpen, setIsOpen] = useState<number | undefined>(undefined);

  const handleToggle = (index: number) => {
    setIsOpen(isOpen === undefined ? index : undefined);
  };

  const isMd = useMediaQuery(EScreenType.md);
  const mounted = useMounted();

  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0.5 }}
      animate={{ scale: [0.4, 1.2, 1], opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-full md:px-8 px-2 lg:px-32 xl:px-48 py-6 flex flex-col items-center gap-y-10 justify-center"
    >
      <RoughNotation
        show
        type={"highlight"}
        animationDelay={1200}
        animationDuration={1000}
        color="#818cf8"
      >
        <h1 className="font-montserrat text-2xl md:text-5xl text-center tracking-[0.1rem] md:tracking-[0.2rem] font-bold text-white uppercase">
          Projects
        </h1>
      </RoughNotation>
      <motion.div
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0.5 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className="container grid gap-6 px-4 md:grid-cols-2 md:gap-8 lg:gap-10 xl:grid-cols-3 xl:max-w-6xl xl:mx-auto overflow-hidden"
      >
        {mounted &&
          PROJECTS.map((item, index) => (
            <Fragment key={index}>
              <motion.div
                initial={{
                  x: isMd ? 500 : 0,
                  y: isMd ? 0 : 500,
                  opacity: 0.5,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                exit={{ x: 500, opacity: 0.5 }}
                transition={{
                  delay: (index + 1) / PROJECTS.length,
                  duration: 1,
                  ease: "backInOut",
                  type: "spring",
                }}
                className="relative group cursor-pointer text-white"
                onClick={() => handleToggle(index)}
              >
                <Image
                  alt="Project"
                  className="rounded-lg blur-[1px] object-cover w-full aspect-[16/10] group-hover:brightness-75 transition-all"
                  height="400"
                  width="600"
                  src={item.imageSrc}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-black/40 rounded-lg group-hover:opacity-0 transition-opacity">
                  <h3 className="text-2xl font-bold tracking-widest">
                    {item.title}
                  </h3>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center opacity-0 rounded-lg group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium select-none line-clamp-4">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center underline hover:text-indigo-600 cursor-pointer">
                    View Project
                    <ChevronRightIcon className="w-4 h-4 ml-1 inline-block text-indigo-600" />
                  </div>
                </div>
              </motion.div>
              <ModalKit
                key={`modal-${index}`}
                onClose={() => handleToggle(index)}
                isOpen={isOpen === index}
                data={item}
              />
            </Fragment>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectsScreen;
