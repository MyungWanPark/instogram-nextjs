/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
    experimental: {
        forceSwcTransforms: true,
    },
};

export default nextConfig;
