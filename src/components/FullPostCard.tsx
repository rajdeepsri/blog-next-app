import { db } from '@/server'
import { Posts } from '@/server/schema'
import { eq } from 'drizzle-orm'
import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn, getTagColor } from '@/lib/utils'
import NextImageWithLoader from './ImageWithLoader'

const FullPostCard: FC<{ id: string }> = async ({ id }) => {
  const postData = await db.query.Posts.findFirst({
    where: eq(Posts.id, id),
    with: {
      users: true,
    },
  })

  if (!postData) {
    return <div className="flex items-center justify-center py-5 text-center">Post not found</div>
  }
  return (
    <div className="w-full max-w-5xl rounded-md border border-neutral-500 p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          {postData.users.avatarUrl && (
            <AvatarImage
              src={postData.users.avatarUrl}
              alt={postData.users.name || 'user-avatar'}
            />
          )}
          <AvatarFallback className="text-xs">{postData.users.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p>{postData.users.name}</p>
          {postData.users.createdAt && (
            <p className="text-sm text-neutral-400">
              Joined on {new Date(postData.users.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="my-4 border border-neutral-700" />
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">{postData.title}</p>
        {postData.imageUrl && (
          <div className="relative h-[30rem] w-full overflow-hidden rounded-sm">
            <NextImageWithLoader
              imageUrl={postData.imageUrl}
              fill
              priority
              style={{ objectFit: 'cover' }}
              alt={postData.title}
            />
          </div>
        )}
        <p className="text-pretty text-neutral-200">{postData.content}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {postData?.tags &&
            postData.tags.map((tag, i) => (
              <span
                className={cn('rounded-sm p-1 text-xs font-semibold text-white', getTagColor(i))}
                key={tag}
              >
                {tag}
              </span>
            ))}
        </div>
        {postData.createdAt && (
          <p className="text-sm text-neutral-200">
            Created on : {new Date(postData.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default FullPostCard
