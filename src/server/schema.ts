import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  avatarUrl: text('avatar_url'),
})

export const Posts = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    content: text('content'),
    slicedContent: text('sliced_content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    authorId: text('author_id')
      .references(() => users.id)
      .notNull(),
    tags: varchar('tags', { length: 256 }).array(),
    imageUrl: text('image_url'),
  },
  table => {
    return {
      authorIdIdx: index('author_id_idx').on(table.authorId),
    }
  },
)

export const postsRelations = relations(Posts, ({ one }) => ({
  users: one(users, {
    fields: [Posts.authorId],
    references: [users.id],
  }),
}))
