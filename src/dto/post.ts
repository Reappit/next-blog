import { z } from 'zod';
import {
  insertPostSchema,
  selectCategorySchema,
  selectPostSchema,
} from '@/db/schema';

export const PostDto = selectPostSchema.extend({
  category: selectCategorySchema.optional(),
});

export const PostInsertDto = insertPostSchema;

export type PostDto = z.infer<typeof PostDto>;
export type PostInsertDto = z.infer<typeof PostInsertDto>;
