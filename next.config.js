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
      {
        protocol: "https",
        hostname: "ndlsearch.ndl.go.jp",
        pathname: "/thumbnail/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "www.kinokuniya.co.jp",
      },
      {
        protocol: "https",
        hostname: "tshop.r10s.jp",
      },
      // ▼▼▼ 今回追加する設定 ▼▼▼
      {
        protocol: "http",
        hostname: "books.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
