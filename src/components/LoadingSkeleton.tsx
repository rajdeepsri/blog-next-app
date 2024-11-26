import React, { FC } from 'react'
import { Skeleton } from './ui/skeleton'
import clsx from 'clsx'

const LoadingSkeleton: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx('flex flex-wrap gap-4', className)}>
      {new Array(5).fill(0).map((_, i: number) => (
        <Skeleton key={i} className="h-[17rem] min-w-[20rem] flex-1 rounded-xl" />
      ))}
    </div>
  )
}

export default LoadingSkeleton
