import { Slide, ToastOptions } from "react-toastify";

export const NAVBAR_OPTIONS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "#",
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
