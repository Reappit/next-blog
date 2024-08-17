import { withPlausibleProxy } from 'next-plausible';
import createNextIntlPlugin from 'next-intl/plugin';

const nextIntlPlugin = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ['@node-rs/argon2', '@aws-sdk/client-s3'],
  },
};

const withNextIntlPlugin = nextIntlPlugin(nextConfig)

const withPlausible = withPlausibleProxy({
  subdirectory: '',
  scriptName: 'scriptName',
  customDomain: 'https://in.andrnet.com',
})(withNextIntlPlugin);


export default withPlausible;
