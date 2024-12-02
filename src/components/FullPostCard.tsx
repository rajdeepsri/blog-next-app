import { db } from '@/server'
import { Posts } from '@/server/schema'
import { eq } from 'drizzle-orm'
import React, { FC } from 'react'
import { formatDate } from 'date-fns'
import NextImageWithLoader from './ImageWithLoader'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import MarkdownRenderer from './MarkdownRenderer'
import Tags from './Tags'

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
    <div className="mx-4 max-w-7xl sm:mx-auto">
      {/* date */}
      {postData.createdAt && (
        <p className="text-center text-sm font-semibold text-neutral-500 dark:text-neutral-400 sm:text-base">
          {formatDate(postData.createdAt, 'MMMM dd, yyyy')}
        </p>
      )}
      {/* title */}
      <h1 className="mb-6 mt-1 text-center text-3xl font-medium sm:mb-10 sm:mt-3 sm:text-7xl">
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
      <div className="flex w-full justify-center">
        <MarkdownRenderer className="my-5" content={postData.content!} />
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-between gap-4 px-0 sm:flex-row sm:gap-2 sm:px-2">
        <Tags post={postData} />
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
