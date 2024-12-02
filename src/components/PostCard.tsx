import React, { FC } from 'react'
import { cn, formatDate1 } from '@/lib/utils'
import NextImageWithLoader from './ImageWithLoader'
import samplePostImage from '../../public/samplePostImage.jpg'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DeleteEditPostBtn from './DeleteEditPostBtn'
import CustomLink from './CustomLink'
import Tags from './Tags'

export type User = {
  name: string
  email: string
  avatarUrl: string | null
  createdAt: Date | null
}

export type Post = {
  id: string
  createdAt: Date | null
  title: string
  slicedContent: string | null
  updatedAt: Date
  authorId: string
  tags: string[] | null
  content: string | null
  imageUrl: string | null
  users: User
}

const PostCard: FC<{ post: Post; isAdminPage?: boolean }> = ({ post, isAdminPage }) => {
  return (
    <CustomLink
      path={`/posts/${post.id}`}
      className="relative flex flex-col justify-between gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-3 shadow-md transition-all duration-200 hover:scale-[102%] hover:shadow-xl dark:border-neutral-600 dark:bg-neutral-800"
    >
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-lg',
            isAdminPage ? 'h-[15rem] sm:h-[20rem]' : 'h-52 sm:h-64',
          )}
        >
          {post.imageUrl ? (
            <NextImageWithLoader
              style={{ objectFit: 'cover' }}
              imageUrl={post.imageUrl}
              fill
              priority
              alt={post.title}
            />
          ) : (
            <Image
              src={samplePostImage}
              fill
              priority
              alt={post.title}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        {post.createdAt && (
          <div>
            <p className="text-xs font-medium text-neutral-400 sm:text-sm">
              {formatDate1(post.createdAt)}
            </p>
          </div>
        )}
        <div className="space-y-1">
          <h2 className="text-xl font-medium sm:text-2xl">{post.title}</h2>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            {post.slicedContent}...
          </p>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-3">
        <Tags post={post} />
        {!isAdminPage && (
          <div className="flex items-center gap-2">
            {post.users.avatarUrl ? (
              <div className="relative mx-1 flex h-8 w-8 shrink-0 overflow-hidden rounded-full sm:h-9 sm:w-9">
                <Image
                  fill
                  className="aspect-square h-full w-full"
                  src={post.users.avatarUrl!}
                  alt={post.users.name || 'user-avatar'}
                  priority
                />
              </div>
            ) : (
              <Avatar className="h-10 w-10 shadow-md">
                <AvatarImage src={post.users.avatarUrl!} alt={post.users.name || 'user-avatar'} />
                <AvatarFallback className="text-xs">{post.users.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            )}
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
              {post.users.name}
            </p>
          </div>
        )}
      </div>
      {isAdminPage && (
        <div className="absolute right-4 top-4 flex items-center gap-1">
          <DeleteEditPostBtn post={post} />
        </div>
      )}
    </CustomLink>
  )
}

export default PostCard
