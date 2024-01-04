export const NAVBAR = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
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

export const EMAIL = "mailto:isalmandev@gmail.com";

export const defaultProps = {
  motion: {
    initial: { x: -500, opacity: 0.5, scale: 0.5 },
    animate: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 1 },
  },
};
