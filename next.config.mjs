/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        webVitalsAttribution: ["CLS", "LCP"],
        instrumentationHook: true,
    },
};

export default nextConfig;
