import { db } from '@/server'
import { Posts } from '@/server/schema'
import { eq } from 'drizzle-orm'
import { FC } from 'react'
import PostCard from './PostCard'

export const UserPosts: FC<{ userId: string }> = async ({ userId }) => {
  const userPosts = await db.query.Posts.findMany({
    where: eq(Posts.authorId, userId),
    with: { users: true },
  })

  return (
    <section className="mx-3 mb-10 grid max-w-5xl grid-cols-1 gap-4 sm:mx-auto sm:w-full sm:grid-cols-2">
      {userPosts && userPosts.map(post => <PostCard key={post.id} post={post} isAdminPage />)}
    </section>
  )
}
