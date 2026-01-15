/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
    reactStrictMode: false,
    compiler: {
        removeConsole: process.env.APP_ENV === 'production' ? true : false,
    },
    experimental: {
        optimizePackageImports: [
            'react-icons',
            '@nextui-org/react',
            'framer-motion'
        ],
    },
}

module.exports = nextConfig
