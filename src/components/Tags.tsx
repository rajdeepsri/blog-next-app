import React, { FC } from 'react'
import { Post } from './PostCard'
import { shuffleArray } from '@/lib/utils'

const Tags: FC<{ post: Post }> = ({ post }) => {
  const shuffledColors = shuffleArray()
  return (
    <div className="flex flex-wrap items-center gap-2">
      {post?.tags &&
        post.tags.map((tag, i) => (
          <span
            className={`rounded-md px-1.5 py-1 text-xs font-semibold text-white sm:px-2 sm:py-1.5 ${shuffledColors[i % shuffledColors.length]}`}
            key={tag}
          >
            {tag}
          </span>
        ))}
    </div>
  )
}

export default Tags
