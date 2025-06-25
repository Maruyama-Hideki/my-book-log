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
      {
        protocol: "http",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "ytfihqaxqmmiwkxwilvs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
      },
    ],
  },
};

module.exports = nextConfig;
