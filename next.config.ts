import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "pa11y",
    "puppeteer-core",
    "@sparticuz/chromium-min",
  ],
};

export default nextConfig;
