'use client'

import Image, { ImageProps } from 'next/image'
import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

type NextImageWithLoaderProps = Omit<ImageProps, 'src'> & {
  imageUrl: string
  alt?: string
}

const NextImageWithLoader: FC<NextImageWithLoaderProps> = ({ imageUrl, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={50} />
        </div>
      )}
      <Image
        src={imageUrl}
        alt={alt || 'img'}
        {...props}
        className={clsx(isLoading ? 'opacity-0' : 'opacity-100', props.className || '')}
        style={{
          objectFit: props.style?.objectFit || 'cover',
          transition: 'opacity 0.3s ease-in-out',
          ...props.style,
        }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

export default NextImageWithLoader
