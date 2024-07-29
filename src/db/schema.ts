import { relations, sql } from 'drizzle-orm';
import {
  text,
  sqliteTable,
  integer,
} from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';

export const postTable = sqliteTable('post', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title', { length: 200 }),
  subTitle: text('subtitle'),
  metaTitle: text('meta_title').unique(),
  fullStory: text('full_story'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  category: integer('category_id')
    .notNull()
    .references(() => categoryTable.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const postRelations = relations(postTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [postTable.category],
    references: [categoryTable.id]
  }),
}));

export const categoryTable = sqliteTable('category', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  metaName: text('meta_name').notNull().unique(),
  keyword: text('keyword'),
});


export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull()
});

// export const categoryRelations = relations(categoryTable, ({ many }) => ({
//   postToCategories: many(postToCategoryTable),
// }));
//
// export const postToCategoryTable = sqliteTable(
//   'post_to_category',
//   {
//     postId: integer('post_id')
//       .notNull()
//       .references(() => postTable.id),
//     categoryId: integer('category_id')
//       .notNull()
//       .references(() => categoryTable.id),
//   },
//   t => ({
//     pk: primaryKey({ columns: [t.postId, t.categoryId] }),
//   })
// );

// export const postToCategoryRelations = relations(
//   postToCategoryTable,
//   ({ one }) => ({
//     post: one(postTable, {
//       fields: [postToCategoryTable.postId],
//       references: [postTable.id],
//     }),
//     category: one(categoryTable, {
//       fields: [postToCategoryTable.categoryId],
//       references: [categoryTable.id],
//     }),
//   })
// );

export const tagTable = sqliteTable('tag', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  metaName: text('meta_name').notNull().unique(),
});

export const selectPostSchema = createSelectSchema(postTable);
export const selectCategorySchema = createSelectSchema(categoryTable);
export const selectUserSchema = createSelectSchema(userTable);
