import { tagColors } from '@/app/page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { db } from '@/server'
import { Posts } from '@/server/schema'
import { eq } from 'drizzle-orm'
import React, { FC } from 'react'

const Post: FC<{ params: { id: string } }> = async ({ params }) => {
  const param = await params
  const postData = await db.query.Posts.findFirst({
    where: eq(Posts.id, param.id),
    with: {
      users: true,
    },
  })

  if (!postData) {
    return <div className="flex items-center justify-center py-5 text-center">Post not found</div>
  }

  return (
    <div className="flex items-center justify-center py-5">
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
          <p className="font-sans text-2xl font-bold">{postData.title}</p>
          <p className="text-pretty font-sans text-neutral-200">{postData.content}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {postData?.tags &&
              postData.tags.map((tag, index) => (
                <span
                  className={`rounded-sm p-1 text-xs font-semibold text-white ${tagColors[index % tagColors.length]}`}
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
    </div>
  )
}

export default Post
