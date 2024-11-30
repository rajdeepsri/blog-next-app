import { db } from '@/server'
import { Posts } from '@/server/schema'
import { eq } from 'drizzle-orm'
import React, { FC } from 'react'
import { formatDate } from 'date-fns'
import NextImageWithLoader from './ImageWithLoader'
import { getTagColor } from '@/lib/utils'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const FullPostCard: FC<{ id: string }> = async ({ id }) => {
  const postData = await db.query.Posts.findFirst({
    where: eq(Posts.id, id),
    with: {
      users: true,
    },
  })

  if (!postData) {
    return <div className="text-center text-3xl font-bold">Post not found</div>
  }

  return (
    <div className="mx-3 max-w-7xl sm:mx-auto">
      {/* date */}
      {postData.createdAt && (
        <p className="text-center text-sm font-semibold text-neutral-500 dark:text-neutral-400 sm:text-base">
          {formatDate(postData.createdAt, 'MMMM dd, yyyy')}
        </p>
      )}
      {/* title */}
      <h1 className="mb-6 mt-1 text-center text-3xl font-medium sm:mb-10 sm:mt-2 sm:text-6xl">
        {postData.title}
      </h1>
      {/* image */}
      {postData.imageUrl && (
        <div className="relative h-[17rem] w-full overflow-hidden rounded-sm sm:h-[30rem] sm:rounded-md">
          <NextImageWithLoader
            imageUrl={postData.imageUrl}
            alt={postData.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      {/* content */}
      <p className="my-5 text-sm font-medium text-neutral-800 dark:text-neutral-300 sm:my-10 sm:text-base">
        {postData.content}
      </p>
      <div className="flex w-full flex-col flex-wrap items-center justify-between gap-4 px-0 sm:flex-row sm:gap-2 sm:px-2">
        {/* tags */}
        <div className="flex flex-wrap items-center gap-2">
          {postData?.tags &&
            postData.tags.map((tag, i) => (
              <span
                className={`rounded-md px-1.5 py-1 text-xs font-semibold text-white sm:px-2.5 sm:py-1.5 sm:text-sm ${getTagColor(i)}`}
                key={tag}
              >
                {tag}
              </span>
            ))}
        </div>
        {/* author */}
        <div className="flex items-center gap-2">
          {postData.users.avatarUrl ? (
            <div className="relative mx-1 flex h-9 w-9 shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10">
              <Image
                fill
                className="aspect-square h-full w-full"
                src={postData.users.avatarUrl!}
                alt={postData.users.name || 'user-avatar'}
                priority
              />
            </div>
          ) : (
            <Avatar className="h-10 w-10 shadow-md">
              <AvatarImage
                src={postData.users.avatarUrl!}
                alt={postData.users.name || 'user-avatar'}
              />
              <AvatarFallback className="text-xs">{postData.users.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
          )}
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {postData.users.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FullPostCard
