import { withPlausibleProxy } from 'next-plausible';

import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ['@node-rs/argon2', '@aws-sdk/client-s3'],
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
