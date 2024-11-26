'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '.'
import { Posts } from './schema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
})

export const createPost = async (data: FormData) => {
  // getting raw data
  const rawFormData = {
    title: data.get('title'),
    content: data.get('content'),
    tags:
      data
        .get('tags')
        ?.toString()
        ?.split(',')
        .map(tag => tag.trim()) || [],
  }

  // data validation
  const validationResult = postSchema.safeParse(rawFormData)
  console.log(validationResult)

  if (!validationResult.success) {
    throw new Error(
      `Validation error: ${validationResult.error.errors
        .map(error => `${error.path.join('.')}: ${error.message}`)
        .join(', ')}`,
    )
  }
  const validatedData = validationResult.data

  // authentication check
  const session = await getServerSession(authOptions)
  if (!session || !session?.user.id) {
    throw new Error('Not authenticated')
  }

  await db.insert(Posts).values({
    title: validatedData.title,
    content: validatedData.content,
    tags: validatedData.tags,
    slicedContent: validatedData.content.slice(0, 100),
    authorId: session.user.id,
  })

  revalidatePath('/create')
  revalidatePath('/')
  redirect('/create')
}

export const deletePost = async (postId: string) => {
  // authentication check
  const session = await getServerSession(authOptions)
  if (!session || !session?.user.id) {
    throw new Error('Not authenticated')
  }

  await db.delete(Posts).where(eq(Posts.id, postId))
  revalidatePath('/create')
  revalidatePath('/')
}

export const editPost = async (
  data: { title: string; content: string; tags?: string },
  postId: string,
) => {
  // data validation
  const rawData = {
    title: data.title,
    content: data.content,
    tags: data.tags?.split(',').map(tag => tag.trim()) || [],
  }

  const validationResult = postSchema.safeParse(rawData)

  if (!validationResult.success) {
    throw new Error(
      `Validation error: ${validationResult.error.errors
        .map(error => `${error.path.join('.')}: ${error.message}`)
        .join(', ')}`,
    )
  }
  const validatedData = validationResult.data

  // authentication check
  const session = await getServerSession(authOptions)
  if (!session || !session?.user.id) {
    throw new Error('Not authenticated')
  }

  await db
    .update(Posts)
    .set({
      title: validatedData.title,
      content: validatedData.content,
      tags: validatedData.tags,
      slicedContent: validatedData.content.slice(0, 100),
      updatedAt: new Date(),
    })
    .where(eq(Posts.id, postId))

  revalidatePath('/create')
  revalidatePath('/')
}
