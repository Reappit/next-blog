import { z } from 'zod';
import {
  insertPostSchema,
  selectCategorySchema,
  selectPostSchema,
  selectUserSchema,
} from '@/db/schema';

export const PostDto = selectPostSchema.extend({
  category: selectCategorySchema.optional(),
  author: selectUserSchema.pick({ name: true }),
});

export const PostInsertDto = insertPostSchema;

export type PostDto = z.infer<typeof PostDto>;
export type PostInsertDto = z.infer<typeof PostInsertDto>;
