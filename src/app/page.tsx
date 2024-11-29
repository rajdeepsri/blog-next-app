import LoadingSkeleton from '@/components/LoadingSkeleton'
import PostList from '@/components/PostList'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className="m-5 flex max-w-7xl flex-wrap gap-4">
      <Suspense fallback={<LoadingSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  )
}
