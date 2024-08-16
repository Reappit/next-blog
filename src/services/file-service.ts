import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from '@/env';
import { v4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: env.R2_S3_URL,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

const fileService = {
  async getPresignedUploadURL({ size, type }: { size: number; type: string }) {
    const fileId = v4();
    const cmd = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: fileId,
      ContentLength: size,
      ContentType: type,
    });
    const presignedUrl = await getSignedUrl(s3Client, cmd, { expiresIn: 3600 });
    return { presignedUrl, fileId };
  },
};

export default fileService;
