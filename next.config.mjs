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
        hostname: "tngvsumbidoybxaolpqa.supabase.co",
      },
    ],
  },
};

export default nextConfig;
