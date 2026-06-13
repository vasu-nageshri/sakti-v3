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

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export for GitHub Pages
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true }, // no Image Optimization server on Pages
  trailingSlash: true, // Pages-friendly directory URLs
};

export default nextConfig;
