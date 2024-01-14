import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screen/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        cinder: {
          light: "#656D72",
        },
      },
      textShadow: {
        sm: "-1px -1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color), -1px 1px 0 var(--tw-shadow-color), 1px 1px 0 var(--tw-shadow-color)",
        DEFAULT:
          "-2px -2px 0 var(--tw-shadow-color), 2px -2px 0 var(--tw-shadow-color), -2px 2px 0 var(--tw-shadow-color), 2px 2px 0 var(--tw-shadow-color)",
        lg: "-3px -3px 0 var(--tw-shadow-color), 3px -3px 0 var(--tw-shadow-color), -3px 3px 0 var(--tw-shadow-color), 3px 3px 0 var(--tw-shadow-color)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          "text-stroke": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
