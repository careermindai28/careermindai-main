/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || ".next",

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.pixabay.com" },
    ],
  },

  async redirects() {
    return [{ source: "/", destination: "/landing-page", permanent: false }];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      exclude: [/node_modules/],
      use: [{ loader: "@dhiwise/component-tagger/nextLoader" }],
    });
    return config;
  },

  /**
   * ✅ CRITICAL for server-side PDF export on Vercel:
   * Ensure puppeteer-core + sparticuz chromium + its bin files are bundled.
   */
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },

  outputFileTracingIncludes: {
    // This key MUST match the route handler bundle path
    "app/api/pdf-export/route": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/**",
    ],
  },
};

export default nextConfig;
