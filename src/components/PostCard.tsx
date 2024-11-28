import Link from 'next/link'
import React, { FC } from 'react'
import { Button } from './ui/button'
import { getTagColor } from '@/lib/utils'
import DeleteEditPostBtn from './DeleteEditPostBtn'

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
}

const PostCard: FC<{ post: Post; isAdminPage?: boolean }> = ({ post, isAdminPage }) => {
  return (
    <div className="min-w-[20rem] flex-1 space-y-2 rounded-lg border border-neutral-500 p-4">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p>{post.slicedContent}...</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {post?.tags &&
            post.tags.map((tag, i) => (
              <span
                className={`rounded-sm p-1 text-xs font-semibold text-white ${getTagColor(i)}`}
                key={tag}
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/posts/${post.id}`}>
            <Button variant="outline">Read More</Button>
          </Link>
          {isAdminPage && <DeleteEditPostBtn post={post} />}
        </div>
      </div>
    </div>
  )
}

export default PostCard
