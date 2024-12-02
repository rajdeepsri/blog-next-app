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
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { authOptions } from '@/server/auth'
import { UserPosts } from '@/components/UserPosts'

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
        <DialogContent className="w-[94%] rounded-md px-2 py-3 sm:w-full">
          <DialogTitle className="mt-2 text-center text-2xl font-semibold sm:text-3xl">
            Create New Post
          </DialogTitle>
          <DialogDescription hidden>this is modal</DialogDescription>
          <form
            className="flex flex-col space-y-2 sm:m-5 sm:min-w-[25rem] sm:space-y-3"
            action={createPost}
          >
            <Input
              className="text-sm sm:text-base"
              type="text"
              name="title"
              placeholder="Enter Post Title"
              required
            />
            <Textarea
              className="text-sm sm:text-base"
              rows={10}
              name="content"
              placeholder="Enter your content here"
              required
            />
            <Input
              className="text-sm sm:text-base"
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
            />
            <Input
              className="cursor-pointer text-sm sm:text-base"
              type="file"
              accept="image/*"
              name="image"
            />
            <Button className="text-sm sm:text-base" type="submit">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Suspense
        key={session.user.id}
        fallback={
          <div className="mb-10 grid w-full max-w-5xl grid-cols-1 gap-4 px-3 sm:mx-auto sm:w-full sm:grid-cols-2 sm:px-0">
            <LoadingSkeleton numOfSkeletons={2} />
          </div>
        }
      >
        <UserPosts userId={session.user.id} />
      </Suspense>
    </div>
  )
}

export default CreatePost
