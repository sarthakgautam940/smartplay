import type { NextConfig } from "next";

// Standalone output is only useful for self-hosted Docker images. Vercel does
// its own file tracing, and standalone mode on Vercel adds ~60–90s of upload
// finalisation without benefit. Opt in via STANDALONE_BUILD=1 for Docker.
const standalone = process.env.STANDALONE_BUILD === "1";

const nextConfig: NextConfig = {
  ...(standalone ? { output: "standalone" as const } : {}),
  serverExternalPackages: ["ffmpeg-static", "ffprobe-static"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
