/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    experimental: {
        reactCompiler: true,
    },
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
