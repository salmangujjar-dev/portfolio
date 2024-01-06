"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { FaArrowRightLong } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";

import { EMAIL, SOCIALS, defaultProps } from "@utils/constants";

const Hero = () => {
  
  return (
    <div className="h-screen w-screen justify-between md:px-8 px-2 lg:px-32 flex flex-col gap-y-5 md:gap-y-0 md:flex-row items-center">
      <div className="flex flex-col gap-y-1 order-2 md:order-1 items-center md:items-start">
        <div className="flex gap-x-6 items-center">
          <div className="w-[1rem] h-[0.1rem] bg-white" />
          <h5 className="uppercase text-cinder-light text-sm md:text-base font-medium tracking-[0.5rem]">
            <Typewriter
              words={["My name is", "Mi nombre es", "Ismee", "Ich heiße"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h5>
        </div>
        <motion.div
          {...defaultProps.motion}
          className="text-3xl text-wrap md:text-5xl font-bold font-['Plus Jakarta Sans'] space-x-2"
        >
          <span className="text-zinc-100">Salman</span>
          <span className="text-indigo-400">Ahmed.</span>
        </motion.div>
        <div className="mt-6 flex flex-col gap-y-8">
          <motion.span
            {...defaultProps.motion}
            transition={{ duration: 1.2 }}
            className="block text-center md:text-start max-w-[30rem] text-base font-normal leading-5 text-cinder-light"
          >
            Full-stack developer with more than 2+ years of experience in
            enterprise companies and startups. Proficient in JavaScript,
            TypeScript, React, Next.js, and Tailwind CSS.
          </motion.span>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2">
            {SOCIALS.map((item, index) => (
              <SocialIcon
                key={index}
                url={item.href}
                target="_blank"
                fgColor="gray"
                bgColor="transparent"
                className="hover:scale-125"
              />
            ))}
            <SocialIcon
              network="email"
              target="_blank"
              href={EMAIL}
              fgColor="gray"
              bgColor="transparent"
              className="cursor-pointer hover:scale-125"
            />
            <motion.a
            target="_blank"
            href="Salman-Ahmed-Resume.pdf"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ ease: "easeIn", duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
              type="button"
              className="flex items-center gap-x-2 py-2.5 hover:text-indigo-400 hover:border-indigo-400 px-4 ml-3 border border-white rounded-md"
            >
              Resume <FaArrowRightLong />
            </motion.a>
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2 relative ">
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 10, opacity: 1, scale: [0.5, 1.3, 1] }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="w-full h-full hidden md:flex absolute bg-indigo-400 -z-10 rounded-lg"
        />
        <motion.div
          initial={{ opacity: 0.5, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "backOut", duration: 1.2 }}
        >
          <Image
            src="/hero_avatar.png"
            alt="hero_avatar"
            width={500}
            height={500}
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;