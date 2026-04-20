import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  // Standalone output is useful for Docker images but can bloat Vercel upload size
  // and slow down deployment finalization. Keep Vercel on default output.
  ...(isVercel ? {} : { output: "standalone" }),
  serverExternalPackages: ["ffmpeg-static", "ffprobe-static"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
