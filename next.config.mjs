/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "postcards.makenakong.com",
      },
      {
        protocol: "https",
        hostname: "qmozhgmeyjeufopvkhzf.supabase.co",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
