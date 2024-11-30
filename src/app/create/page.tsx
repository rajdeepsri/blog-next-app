import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPost } from '@/server/actions'
import { getServerSession } from 'next-auth'
import React, { FC, Suspense } from 'react'
import { db } from '@/server'
import { eq } from 'drizzle-orm'
import { Posts } from '@/server/schema'
import PostCard from '@/components/PostCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { authOptions } from '@/lib/utils'

const CreatePost: FC = async () => {
  const session = await getServerSession(authOptions)
  if (!session)
    return (
      <p className="mt-28 text-center text-xl font-medium capitalize">please sign in to continue</p>
    )

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-5 pt-20 sm:mx-auto sm:pt-24">
      <h1 className="text-center text-2xl font-light text-neutral-700 dark:text-neutral-300 sm:text-3xl">
        Welcome {session.user.name}
      </h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Post</Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <DialogTitle className="mt-5 text-center text-3xl font-semibold">
            Create New Post
          </DialogTitle>
          <DialogDescription hidden>this is modal</DialogDescription>
          <form className="m-5 flex min-w-[25rem] flex-col space-y-3" action={createPost}>
            <Input type="text" name="title" placeholder="Enter Post Title" required />
            <Textarea rows={10} name="content" placeholder="Enter your content here" required />
            <Input type="text" name="tags" placeholder="Tags (comma-separated)" />
            <Input type="file" accept="image/*" name="image" className="cursor-pointer" />
            <Button type="submit">Create</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Suspense fallback={<LoadingSkeleton className="max-w-5xl" />}>
        <UserPosts userId={session.user.id} />
      </Suspense>
    </div>
  )
}

const UserPosts: FC<{ userId: string }> = async ({ userId }) => {
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

export default CreatePost
