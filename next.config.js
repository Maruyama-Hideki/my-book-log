/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.j-14.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    domains: ["m.media-amazon.com", "www.kinokuniya.co.jp", "tshop.r10s.jp"],
  },
};

module.exports = nextConfig;
