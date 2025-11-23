"use client";

import React from "react";
import { motion } from "framer-motion";

import Stepper from "@components/kit/Stepper";
import { CAREER } from "@utils/constants";
import { RoughNotation } from "react-rough-notation";

const CareerScreen = () => {
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
          Career
        </h1>
      </RoughNotation>
      <div className="w-[75%] mx-auto relative lg:w-[90%] md:w-full mt-8">
        <motion.div className="absolute left-9 top-1 w-[4px] h-full bg-black dark:bg-white origin-top md:w-[2px] md:left-[30px] xs:left-[20px] " />
        <ul className="w-full flex flex-col items-start justify-start ml-20">
          {CAREER.map((item, index) => (
            <Stepper
              key={index}
              title={item.role}
              hash={item.company}
              hashLink={item.companyLink}
              duration={item.duration}
              details={item.details}
              isNoLink={item.isNoLink}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CareerScreen;
