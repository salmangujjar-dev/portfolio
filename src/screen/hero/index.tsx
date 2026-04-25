"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { SocialIcon } from "react-social-icons";
import { ArrowRight, Mail } from "lucide-react";

import TextReveal from "@components/hero/TextReveal";
import MagneticButton from "@components/hero/MagneticButton";
import ScrollHint from "@components/hero/ScrollHint";
import TechMarquee from "@components/hero/TechMarquee";
import { Button } from "@components/ui/button";

import { EMAIL, SOCIALS } from "@utils/constants";
import { scrollToSection } from "@lib/lenis";

const NoiseField = dynamic(() => import("@components/hero/NoiseField"), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100vh-5rem)] w-full flex-col overflow-hidden"
    >
      <NoiseField />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/10 to-background" />

      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity }}
        className="relative z-10 flex flex-grow flex-col items-center justify-center gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-16 md:px-12 lg:px-24 xl:px-40"
      >
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="block h-px w-8 bg-muted-foreground/60" />
            Full-Stack Developer
          </motion.div>

          <h1 className="font-display text-fluid-4xl font-semibold leading-[1.02] tracking-tightest text-balance md:text-fluid-5xl">
            <TextReveal text="Salman" delay={0.15} />
            <br />
            <TextReveal
              text="Ahmed."
              delay={0.5}
              charClassName="text-accent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-fluid-base leading-relaxed text-muted-foreground text-pretty"
          >
            Full-stack developer with{" "}
            <span className="text-foreground">4+ years</span> across enterprise
            and startups. I build polished products with{" "}
            <span className="text-foreground">
              React, Next.js, Node, Nest, Python
            </span>{" "}
            and ship them on{" "}
            <span className="text-foreground">microservice & monolith</span>{" "}
            architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 md:gap-4"
          >
            <MagneticButton
              onClick={() => scrollToSection("#projects")}
              className="bg-accent/10 hover:bg-accent/15"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full uppercase tracking-[0.18em] text-xs"
            >
              <a
                href="/Salman-Ahmed-Resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
              >
                Resume
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex items-center gap-3 pt-2"
          >
            {SOCIALS.map((item) => (
              <SocialIcon
                key={item.label}
                url={item.href}
                target="_blank"
                bgColor="transparent"
                fgColor="currentColor"
                className="text-muted-foreground transition-colors hover:!text-accent"
                style={{ height: 36, width: 36 }}
              />
            ))}
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          style={reduced ? undefined : { y: avatarY, scale: avatarScale }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-first md:order-last"
        >
          <BlobAvatar />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mt-auto pb-2">
        <TechMarquee />
      </div>

      <ScrollHint />
    </section>
  );
};

const BlobAvatar = () => {
  return (
    <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <clipPath id="blob-mask" clipPathUnits="objectBoundingBox">
            <path d="M0.82,0.55 C0.86,0.7 0.72,0.86 0.55,0.9 C0.38,0.94 0.18,0.86 0.1,0.7 C0.02,0.54 0.05,0.32 0.18,0.18 C0.32,0.04 0.56,-0.02 0.7,0.08 C0.84,0.18 0.78,0.4 0.82,0.55 Z" />
          </clipPath>
          <linearGradient id="blob-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
            <stop
              offset="100%"
              stopColor="hsl(var(--accent))"
              stopOpacity="0.05"
            />
          </linearGradient>
        </defs>
        <path
          d="M328 220 C344 280 288 344 220 360 C152 376 72 344 40 280 C8 216 20 128 72 72 C128 16 224 -8 280 32 C336 72 312 160 328 220 Z"
          fill="none"
          stroke="url(#blob-stroke)"
          strokeWidth="1"
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#blob-mask)" }}
      >
        <Image
          src="/hero_avatar.png"
          alt="Salman Ahmed"
          fill
          priority
          sizes="(min-width: 768px) 24rem, 16rem"
          className="object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          clipPath: "url(#blob-mask)",
          background:
            "radial-gradient(circle at 30% 20%, hsl(var(--accent) / 0.45), transparent 60%)",
        }}
      />
    </div>
  );
};

export default Hero;
