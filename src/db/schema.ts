import { relations, sql } from 'drizzle-orm';
import {
  text,
  sqliteTable,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { AdapterAccountType } from 'next-auth/adapters';
import { v4 } from 'uuid';

export const userTable = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  role: text('role', { enum: ['user', 'admin'] }).default('user'),
  email: text('email').unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  login: text('login')
    .notNull()
    .unique()
    .$defaultFn(() => v4()),
});

export const accountTable = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessionTable = sqliteTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokenTable = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  verificationToken => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticatorTable = sqliteTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: integer('credentialBackedUp', {
      mode: 'boolean',
    }).notNull(),
    transports: text('transports'),
  },
  authenticator => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

////////////////////////////////////////////////////

export const postTable = sqliteTable('post', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title', { length: 200 }),
  subTitle: text('subtitle'),
  metaTitle: text('meta_title').unique(),
  fullStory: text('full_story'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  author: text('author')
    .notNull()
    .references(() => userTable.id),
  category: integer('category_id')
    .notNull()
    .references(() => categoryTable.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  posterId: text('poster_id'),
});

export const postRelations = relations(postTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [postTable.category],
    references: [categoryTable.id],
  }),
  author: one(userTable, {
    fields: [postTable.author],
    references: [userTable.id],
  }),
}));

export const categoryTable = sqliteTable('category', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  metaName: text('meta_name').notNull().unique(),
  keyword: text('keyword'),
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
export const insertPostSchema = createInsertSchema(postTable);
export const selectCategorySchema = createSelectSchema(categoryTable);
export const selectUserSchema = createSelectSchema(userTable);
