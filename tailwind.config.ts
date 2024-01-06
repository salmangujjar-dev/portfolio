import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screen/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        cinder: {
          light: "#656D72",
        },
      },
    },
  },
  plugins: [],
};
export default config;