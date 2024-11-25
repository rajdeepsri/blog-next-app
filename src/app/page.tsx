import { Button } from '@/components/ui/button'
import { db } from '@/server'
import Link from 'next/link'

export const tagColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
]

export default async function Home() {
  const posts = await db.query.Post.findMany()

  return (
    <div className="m-5 flex flex-wrap gap-4">
      {posts.map(post => (
        <div key={post.id} className="max-w-xl space-y-2 rounded-lg border border-neutral-500 p-4">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p>{post.content}...</p>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
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
            <Link href={`/posts/${post.id}`}>
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
