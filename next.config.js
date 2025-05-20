/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.j-14.com",
      },
    ],
  },
};

module.exports = nextConfig;
