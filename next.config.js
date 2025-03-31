/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, path: false }
        return config
    },
    images: {
       // domains: ["*"],
        //formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
    },
};
