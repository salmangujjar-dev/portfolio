"use client";

import React from "react";
import { motion } from "framer-motion";

import Stepper from "@components/kit/Stepper";
import { CAREER } from "@utils/constants";

const CareerScreen = () => {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0.5 }}
      animate={{ scale: [0.4, 1.2, 1], opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-full md:px-8 px-2 lg:px-32 xl:px-48 py-6 flex flex-col items-center gap-y-10 justify-center"
    >
      <h1 className="text-3xl md:text-5xl text-center font-sans mb-8 tracking-[0.4rem] md:tracking-[0.5rem] font-extrabold text-stroke-sm shadow-indigo-400">
        Career
      </h1>
      <div className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div className="absolute left-9 top-0 w-[4px] h-full bg-white origin-top md:w-[2px] md:left-[30px] xs:left-[20px] " />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          {CAREER.map((item, index) => (
            <Stepper
              key={index}
              title={item.role}
              hash={item.company}
              hashLink={item.companyLink}
              duration={item.duration}
              details={item.details}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CareerScreen;
