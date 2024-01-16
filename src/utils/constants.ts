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
    imageSrc: "/zombie_apocalypse.png",
    title: "Zombie Apocalyse Survival",
    url: "https://zombie-apocalypse-front.vercel.app/",
    stack: "MERN",
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
    stack: "MERN",
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
