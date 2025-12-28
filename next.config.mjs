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

 webpack(config, { dev }) {
  // ✅ Only enable rocket/dhiwise component tagging in development
  if (dev) {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      exclude: [/node_modules/],
      use: [{ loader: "@dhiwise/component-tagger/nextLoader" }],
    });
  }

  return config;
},

  /**
   * ✅ For server-side PDF export on Vercel (Next 14 supports this)
   */
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },
};

export default nextConfig;
