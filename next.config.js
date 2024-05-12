/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
    reactStrictMode: false,
    compiler: {
        removeConsole: process.env.APP_ENV === 'production' ? true : false,
    },
}

module.exports = nextConfig
