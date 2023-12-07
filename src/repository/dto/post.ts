import { type toZod } from 'tozod';

import { z } from 'zod';

export const CategorySchema: toZod<CategoryTable> = z.object({
  id: z.number(),
  keyword: z.string().nullable(),
  meta_name: z.string(),
  name: z.string(),
});

export const PostSchema: toZod<PostTable> = z.object({
  author: z.string(),
  category: CategorySchema,
  created_at: z.string(),
  full_story: z.string().nullable(),
  id: z.number(),
  meta_title: z.string(),
  published: z.boolean(),
  short_id: z.string(),
  subtitle: z.string().nullable(),
  title: z.string(),
});

export const CategoryDto = (data: CategoryTable) =>
  CategorySchema.transform((data) => ({
    id: data.id,
    name: data.name,
    metaName: data.meta_name,
  })).parse(data);

export const PostDto = PostSchema.transform((data) => ({
  id: data.id,
  title: data.title,
  subTitle: data.subtitle,
  metaTitle: data.meta_title,
  createdAt: data.created_at,
  fullStory: data.full_story,
  shortId: data.short_id,
  category: CategoryDto(data.category),
}));

export type PostDto = z.infer<typeof PostDto>;
