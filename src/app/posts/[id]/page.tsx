import FullPostCard from '@/components/FullPostCard'
import { Skeleton } from '@/components/ui/skeleton'
import React, { FC, Suspense } from 'react'

type tParams = Promise<{ id: string }>

const Post: FC<{ params: tParams }> = async ({ params }) => {
  const param = await params

  return (
    <div className="mx-auto pb-20 pt-24 sm:pt-28">
      <Suspense fallback={<Skeleton className="h-[25rem] flex-1 rounded-xl" />}>
        <FullPostCard id={param.id} />
      </Suspense>
    </div>
  )
}

export default Post
