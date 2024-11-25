import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const Post = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    authorId: uuid('author_id').references(() => users.id),
  },
  table => {
    return {
      authorIdIdx: index('author_id_idx').on(table.authorId),
    }
  },
)
