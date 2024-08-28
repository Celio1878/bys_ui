/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beyourstories.s3.sa-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "bysbookscover.s3.sa-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "khzp4cg919.execute-api.sa-east-1.amazonaws.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
    instrumentationHook: true,
  },
};

export default nextConfig;
