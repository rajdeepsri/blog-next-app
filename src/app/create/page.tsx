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
import React, { FC } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { db } from '@/server'
import { eq } from 'drizzle-orm'
import { Posts } from '@/server/schema'
import { tagColors } from '../page'

const CreatePost: FC = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return <p className="my-4 text-center">please sign in to continue</p>

  const userPosts = await db.query.Posts.findMany({
    where: eq(Posts.authorId, session.user.id),
  })

  return (
    <div className="my-5 flex w-screen flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-semibold text-neutral-700 dark:text-neutral-300">
        Welcome {session.user.name}
      </h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Post</Button>
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
            <Button type="submit">Create</Button>
          </form>
        </DialogContent>
      </Dialog>
      <section className="flex w-full max-w-5xl flex-col gap-4">
        {userPosts &&
          userPosts.map(post => (
            <div key={post.id} className="space-y-1 rounded-lg border border-neutral-600 p-2">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="flex items-center gap-2 pt-2">
                {post?.tags &&
                  post.tags.map((tag, index) => (
                    <span
                      className={`rounded-sm p-1 text-xs font-semibold text-white ${tagColors[index % tagColors.length]}`}
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}

export default CreatePost
