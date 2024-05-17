import { SVGProps } from "react";

export type TSocialIcons = {
  label: string;
  url: string;
};

export type TTechnologies = {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
};

export type TContactForm = {
  fullName: string;
  email: string;
  subject: string;
  body: string;
};

export type TProjects = {
  imageSrc: string;
  title: string;
  url: string;
  technologies: TTechnologies[];
  description: string;
  features: string[];
};

export type TCareer = {
  role: String;
  company: String;
  companyLink: String;
  duration: String;
  details: String;
};
