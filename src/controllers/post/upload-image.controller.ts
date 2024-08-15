'use server';
import { z } from 'zod';
import fileService from '@/services/file-service';
import { auth } from '@/lib/auth';

const sizeImageLimit = 5 * 1024 ** 2; // 5 MB

const uploadImagePayload = z.object({
  size: z.number(),
  type: z.string(),
});

export async function uploadImage(props: unknown) {
  const payload = uploadImagePayload.parse(props);
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    throw 'Unauthorised';
  }
  if (payload.size > sizeImageLimit) {
    throw new Error('Size limit');
  }
  const { presignedUrl, fileId } = await fileService.getPresignedUploadURL({
    size: payload.size,
    type: payload.type,
  });

  return { presignedUrl, fileId };
}
