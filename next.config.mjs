/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   ppr: true,
  // },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"]
  }
};

export default nextConfig;
