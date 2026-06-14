/** @type {import('next').NextConfig} */

// GitHub Pages serves a project repo at /<repo>/. Set basePath so assets/links resolve.
// Toggle via env so local `npm run dev` stays at "/".
const isProd = process.env.NODE_ENV === "production";
// Repo/subpath comes from env so the same code deploys to sakti-v1, sakti-v2, etc.
// In CI we derive it from the repository name automatically.
const repo =
  process.env.BASE_PATH ||
  (process.env.GITHUB_REPOSITORY
    ? process.env.GITHUB_REPOSITORY.split("/")[1]
    : "sakti");

const basePath = isProd ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export for GitHub Pages
  basePath,
  assetPrefix: isProd ? `/${repo}/` : "",
  // Expose the resolved basePath to client code (e.g. raw <img>/CSS mask URLs
  // that Next does NOT auto-prefix). Mirrors basePath exactly.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true }, // no Image Optimization server on Pages
  trailingSlash: true, // Pages-friendly directory URLs
  webpack(config) {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/node_modules/**", "**/temp/**"],
    };
    return config;
  },
};

export default nextConfig;
