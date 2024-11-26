import FullPostCard from '@/components/FullPostCard'
import { Skeleton } from '@/components/ui/skeleton'
import React, { FC, Suspense } from 'react'

const Post: FC<{ params: { id: string } }> = async ({ params }) => {
  const param = await params

  return (
    <div className="flex items-center justify-center py-5">
      <Suspense fallback={<Skeleton className="h-[25rem] max-w-5xl flex-1 rounded-xl" />}>
        <FullPostCard id={param.id} />
      </Suspense>
    </div>
  )
}

export default Post
