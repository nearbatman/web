import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 is for the skidanov screenshot, where 75 smears the post text
    qualities: [75, 90],
  },
  turbopack: {
    // a stray package-lock.json in the home folder would otherwise be picked as root
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
