import { Metadata } from "next";

import ProjectsScreen from "@screen/projects";
import TransitionEffect from "@components/TransitionEffect";

export const metadata: Metadata = {
  title: "Salman Ahmed - Projects",
  description: "Projects",
};

const Projects = () => {
  return (
    <>
      <TransitionEffect />
      <ProjectsScreen />
    </>
  );
};

export default Projects;
