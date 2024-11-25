import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const Post = pgTable('posts', {
  id: uuid('id').primaryKey(),
  title: text('title'),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
  authorId: uuid('author_id').references(() => users.id),
})
