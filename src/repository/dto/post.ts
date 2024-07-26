import { z } from 'zod';
import { selectPostSchema } from '@/db/schema';

export const PostDto = selectPostSchema;

export type PostDto = z.infer<typeof PostDto>;
