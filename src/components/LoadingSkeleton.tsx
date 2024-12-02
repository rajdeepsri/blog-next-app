import React, { FC } from 'react'
import { Skeleton } from './ui/skeleton'

const LoadingSkeleton: FC<{ numOfSkeletons: number }> = ({ numOfSkeletons }) => {
  return (
    <>
      {new Array(numOfSkeletons).fill(0).map((_, i: number) => (
        <Skeleton key={i} className="h-[26rem] min-w-[20rem] flex-1 rounded-xl sm:h-[30rem]" />
      ))}
    </>
  )
}

export default LoadingSkeleton
