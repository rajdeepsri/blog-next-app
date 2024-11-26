import { db } from '@/server'
import React from 'react'
import PostCard from './PostCard'

const PostList = async () => {
  const posts = await db.query.Posts.findMany()

  return posts.map(post => <PostCard key={post.id} post={post} />)
}

export default PostList
