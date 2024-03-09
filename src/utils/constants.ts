import { Slide, ToastOptions } from "react-toastify";
import { TProjects } from "./types";

export const NAVBAR_OPTIONS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const SOCIALS = [
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/salmangujjar-dev",
  },
  {
    label: "github",
    href: "https://www.github.com/salmangujjar-dev",
  },
];

export const EMAIL = "isalmandev@gmail.com";

export const defaultProps = {
  motion: {
    initial: { x: -500, opacity: 0.5, scale: 0.5 },
    animate: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 1 },
  },
};

export const snackbarOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  theme: "dark",
  transition: Slide,
};

export const PROJECTS: TProjects[] = [
  {
    imageSrc: "/remotereps.png",
    title: "RemoteReps",
    url: "https://app.remotereps.com/",
    technologies: [
      "NextJs",
      "ReactJs",
      "TurboJs",
      "Tailwind CSS",
      "Swagger",
      "Webpack",
      "AWS S3",
    ],
    description:
      "RemoteReps is a freelancing platform that facilitates connections between businesses and independent professionals and agencies worldwide. Companies can post job opportunities and hire top talents globally. Conversely, talented individuals can apply to various top companies and secure employment opportunities.",
    features: [
      "Talent Hiring",
      "Multiple Panels",
      "Monorepository",
      "Microservices Architecture",
    ],
  },
  {
    imageSrc: "/react-flavor.png",
    title: "React Flavor",
    url: "https://react-flavor.vercel.app/",
    technologies: [
      "ReactJs",
      "StorybookJs",
      "Bundler",
      "Webpack",
      "Headless UI",
      "Tailwind CSS",
    ],
    description:
      "React Flavor is a React component library that includes over 30+ input, and design components, each offering numerous props to achieve the desired functionality or appearance. The library seamlessly integrates with Tailwind CSS and allows for full customization according to specific needs.",
    features: [
      "SSR (Server Side Rendering)",
      "TypeScript based",
      "Focus Interactions",
      "Accessible Components",
      "Override Components Tags",
    ],
  },
  {
    imageSrc: "/lokafy.png",
    title: "Lokafy",
    url: "https://lokafy.com/",
    technologies: [
      "NuxtJs",
      "Python",
      "Django",
      "Docker",
      "PostgrSQL",
      "GCP (Google Cloud Platform)",
      "GKE (Google Kubernetes Engine)",
    ],
    description:
      "Lokafy is a traveling platform that revolutionizes the way we experience travel. With a core belief that the essence of travel lies in the people we meet, rather than just the places we visit, Lokafy fosters meaningful connections between travelers and locals worldwide.",
    features: [
      "Booking Tours",
      "Managing Tours",
      "Rate & Reviews",
      "Global Locations",
    ],
  },
  {
    imageSrc: "/zombie_apocalypse.png",
    title: "Zombie Apocalyse Survival",
    url: "https://zombie-apocalypse-front.vercel.app/",
    technologies: ["ReactJs", "NodeJs", "ExpressJs", "MongoDB", "Docker"],
    description:
      "In a zombie-infested world, the last coding-savvy survivor creates a vital system. It connects humans, detects infections, and facilitates resource sharing. Key features: survivor database, location updates, infection flagging, and strict rules for infected survivors. Inventory management enables trade as the only means of updating belongings. The system includes a search feature, trade mechanism with a point system, and comprehensive trade history. Reports offer crucial statistics. Roles are defined, restricting functionalities for administrators and survivors.",
    features: [
      "Inventory Management",
      "Update Survivor Location",
      "Flag Survivor as Infected",
      "Trade Functionality",
      "Trade History",
      "Roles",
    ],
  },
  {
    imageSrc: "/quora_concept.png",
    title: "Quora Concept",
    url: "https://project-quora-clone-front.vercel.app/",
    technologies: ["ReactJs", "NodeJs", "ExpressJs", "MongoDB", "Docker"],
    description:
      "Quora Concept Clone is a question-and-answer project where users can ask questions on various topics and receive answers from other users. Build in React.JS and headless extended components were made instead of using UI libraries.",
    features: [
      "Add, Update, Delete Question",
      "Add, Update, Delete Comment",
      "Topics",
      "Reactions",
      "Pagination",
    ],
  },
];
