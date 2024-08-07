import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    TURSO_DATABASE_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    // NEXTAUTH_SECRET: z.string().min(1),
    // STRIPE_API_KEY: z.string().min(1),
    // STRIPE_WEBHOOK_SECRET: z.string().min(1),
    // PRICE_ID: z.string().min(1),
    // HOSTNAME: z.string().min(1),
    PLAUSIBLE_URL: z.string().min(1),
    // MONGODB_URI: z.string().min(1),
    // S3_ENDPOINT: z.string(),
    // S3_PORT: z.string().optional(),
    // S3_ACCESS_KEY: z.string(),
    // S3_SECRET_KEY: z.string(),
    // S3_BUCKET_NAME: z.string(),
    // S3_USE_SSL: z.string().optional(),
    APP_URL: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_STRIPE_KEY: z.string().min(1),
    // NEXT_PUBLIC_PROJECT_PLANNER_ID: z.string().min(1),
    // NEXT_PUBLIC_SKIP_EVENTS: z.string().optional(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    // DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    // STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    // PRICE_ID: process.env.PRICE_ID,
    PLAUSIBLE_URL: process.env.PLAUSIBLE_URL,
    // HOSTNAME: process.env.HOSTNAME,
    // MONGODB_URI: process.env.MONGODB_URI,
    // S3_ENDPOINT: process.env.S3_ENDPOINT,
    // S3_PORT: process.env.S3_PORT,
    // S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    // S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    // S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    // S3_USE_SSL: process.env.S3_USE_SSL,
    APP_URL: process.env.APP_URL,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
