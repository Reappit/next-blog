import { relations, sql } from 'drizzle-orm';
import {
  text,
  sqliteTable,
  integer,
  primaryKey
} from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import type { AdapterAccount } from 'next-auth/adapters';

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


export const userTable = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: text('email_verified').default(sql`(CURRENT_TIMESTAMP)`),
  image: text('image'),
});


export const accountTable = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessionTable = sqliteTable("session", {
  sessionToken: text('session_token').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  expires: text('expires').default(sql`(CURRENT_TIMESTAMP)`),
});

export const verificationTokenTable = sqliteTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: text('expires').default(sql`(CURRENT_TIMESTAMP)`),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

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
