import { z } from 'zod';
import { selectCategorySchema, selectPostSchema } from '@/db/schema';

export const PostDto = selectPostSchema.extend({
  category: selectCategorySchema.optional(),
});

export type PostDto = z.infer<typeof PostDto>;
