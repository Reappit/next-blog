'use server';

import { S3Client } from '@aws-sdk/client-s3';
import { env } from '@/env';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: env.R2_S3_URL,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadImage() {}
