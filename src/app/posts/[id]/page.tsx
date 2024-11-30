import FullPostCard from '@/components/FullPostCard'
import { Skeleton } from '@/components/ui/skeleton'
import React, { FC, Suspense } from 'react'

const Post: FC<{ params: { id: string } }> = async ({ params }) => {
  const param = await params

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center pb-20 pt-24 sm:pt-28">
      <Suspense fallback={<Skeleton className="h-[25rem] flex-1 rounded-xl" />}>
        <FullPostCard id={param.id} />
      </Suspense>
    </div>
  )
}

export default Post
