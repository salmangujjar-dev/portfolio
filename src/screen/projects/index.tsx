"use client";

import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";

import ModalKit from "@components/kit/Modal/Project";

import { PROJECTS } from "@utils/constants";

const ProjectsScreen = () => {
  const [isOpen, setIsOpen] = useState<number | undefined>(undefined);

  const handleToggle = (index: number) => {
    setIsOpen(isOpen === undefined ? index : undefined);
  };

  return (
    <div className="w-full md:px-8 px-2 py-6 lg:px-32 xl:px-48 flex justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0.5 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className="flex flex-col md:flex-row flex-shrink justify-between items-center md:items-start gap-y-4 md:gap-y-0 md:gap-x-5 w-full"
      >
        {PROJECTS.map((item, index) => {
          return (
            <Fragment key={index}>
              <motion.div
                className="flex bg-indigo-700 bg-opacity-50 border-2 border-white items-center justify-center cursor-pointer gap-y-4 rounded-lg p-6 flex-col flex-1 max-w-[30rem]"
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleToggle(index)}
              >
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="shrink-0 rounded-lg max-h-sm md:max-h-full"
                />
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-xl font-sans font-semibold tracking-widest">
                    {item.title}
                  </h1>
                  <p className="break-words text-sm line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </motion.div>
              <ModalKit
                key={index}
                onClose={() => handleToggle(index)}
                isOpen={isOpen === index}
                data={item}
              />
            </Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectsScreen;
