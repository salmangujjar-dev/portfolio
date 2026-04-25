/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.APP_ENV === "production" ? true : false,
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "motion",
      "lucide-react",
      "@radix-ui/react-dialog",
    ],
  },
  async redirects() {
    return [
      { source: "/career", destination: "/#career", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

module.exports = nextConfig;
