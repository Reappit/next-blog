import { withPlausibleProxy } from 'next-plausible';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ['@node-rs/argon2', '@aws-sdk/client-s3'],
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
};


const withPlausible = withPlausibleProxy({
  subdirectory: '',
  scriptName: 'scriptName',
  customDomain: 'https://in.andrnet.com',
})(nextConfig);

export default withPlausible;
