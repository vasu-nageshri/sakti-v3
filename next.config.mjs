/** @type {import('next').NextConfig} */

// GitHub Pages serves a project repo at /<repo>/. Set basePath so assets/links resolve.
// Toggle via env so local `npm run dev` stays at "/".
const isProd = process.env.NODE_ENV === "production";
const repo = "sakti";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export for GitHub Pages
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true }, // no Image Optimization server on Pages
  trailingSlash: true, // Pages-friendly directory URLs
};

export default nextConfig;
