import { Params } from 'next/dist/server/request/params'
import React, { FC } from 'react'

const Post: FC<{ params: Params }> = async ({ params }) => {
  const param = await params

  return <div>Post : {param.id}</div>
}

export default Post
