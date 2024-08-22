import { withPlausibleProxy } from 'next-plausible';

import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  serverExternalPackages: ['@node-rs/argon2', '@aws-sdk/client-s3'],
  transpilePackages: ['next-mdx-remote'],
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGE_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const nextIntlPlugin = createNextIntlPlugin();

const withNextIntl = nextIntlPlugin(nextConfig);

const withPlausible = withPlausibleProxy({
  subdirectory: '',
  scriptName: 'scriptName',
  customDomain: 'https://in.andrnet.com',
})(withNextIntl);

export default withPlausible;
