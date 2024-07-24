import { z } from 'zod';
import { selectPostSchema } from '@/db/schema';

export const PostDto = selectPostSchema.transform(
  ({ created_at, meta_title, ...data }) => ({
    ...data,
    createdAt: created_at,
    metaTitle: meta_title,
  })
);

export type PostDto = z.infer<typeof PostDto>;
