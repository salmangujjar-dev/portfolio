import {
  Aws,
  Django,
  Docker,
  ExpressJs,
  GoogleCloud,
  GoogleKubernetes,
  HeadlessUi,
  MaterialUi,
  MongoDb,
  NextJs,
  NodeJs,
  NuxtJs,
  Postgresql,
  Python,
  ReactJs,
  StorybookJs,
  Swagger,
  Tailwind,
  TurboRepo,
  Webpack,
} from "@assets/index";
import { TTechnologies } from "./types";

export const TECHNOLOGIES: Record<string, TTechnologies> = {
  NEXT: {
    label: "Next Js",
    icon: NextJs,
  },
  REACT: {
    label: "React Js",
    icon: ReactJs,
  },
  NODE: {
    label: "Node Js",
    icon: NodeJs,
  },
  EXPRESS: {
    label: "Express Js",
    icon: ExpressJs,
  },
  TURBO: {
    label: "Turbo Js",
    icon: TurboRepo,
  },
  STORYBOOK: {
    label: "Storybook Js",
    icon: StorybookJs,
  },
  HEADLESS_UI: {
    label: "Headless UI",
    icon: HeadlessUi,
  },
  NUXT: {
    label: "Nuxt Js",
    icon: NuxtJs,
  },
  PYTHON: {
    label: "Python",
    icon: Python,
  },
  MATERIAL_UI: {
    label: "Material UI",
    icon: MaterialUi,
  },
  DJANGO: {
    label: "Django",
    icon: Django,
  },
  TAILWIND: {
    label: "Tailwind CSS",
    icon: Tailwind,
  },
  SWAGGER: {
    label: "Swagger",
    icon: Swagger,
  },
  WEBPACK: {
    label: "Webpack",
    icon: Webpack,
  },
  AWS: {
    label: "Amazon AWS",
    icon: Aws,
  },
  DOCKER: {
    label: "Docker",
    icon: Docker,
  },
  KUBERNETES: {
    label: "Kubernetes",
    icon: GoogleKubernetes,
  },
  GCP: {
    label: "Google Cloud Platform",
    icon: GoogleCloud,
  },
  POSTGRESQL: {
    label: "PostgreSQL",
    icon: Postgresql,
  },
  MONGO_DB: {
    label: "Mongo DB",
    icon: MongoDb,
  },
};
