import LoadingSkeleton from '@/components/LoadingSkeleton'
import PostList from '@/components/PostList'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className="w-screen space-y-6 pb-10 pt-20 sm:space-y-8 sm:pt-24">
      <h1 className="text-center text-2xl font-medium text-neutral-700 dark:text-neutral-200 sm:text-3xl sm:font-semibold">
        All Blog Posts
      </h1>
      <div className="mx-3 grid max-w-7xl grid-cols-1 justify-center gap-4 sm:mx-auto sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<LoadingSkeleton numOfSkeletons={3} />}>
          <PostList />
        </Suspense>
      </div>
    </div>
  )
}
