import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// create table
// public.post (
//   category bigint not null,
//   author uuid not null,
//   created_at timestamp without time zone not null default now(),
//   constraint article_pkey primary key (id),
//   constraint article_meta_title_key unique (meta_title),
//   constraint post_author_fkey foreign key (author) references "user" (id),
//   constraint post_category_fkey foreign key (category) references category (id),


export const categoryTable = sqliteTable('category', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
})

export const postTable = sqliteTable('post', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title', { length: 200 }),
  subtitle: text('subtitle'),
  meta_title: text('meta_title').unique(),
  full_story: text('full_story'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  created_at: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const selectPostSchema = createSelectSchema(postTable);

export const fooTable = sqliteTable('foo', {
  bar: text('bar').notNull().default('Hey!'),
});
