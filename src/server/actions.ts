'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '.'
import { Posts } from './schema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { deleteImage, uploadImage } from '@/lib/utils'
import { Post } from '@/components/PostCard'

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.any().optional(),
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

  let imageUrl = ''
  if (data.get('image')) {
    const uploadImageResult = await uploadImage(data.get('image') as File)
    if (!uploadImageResult.success) {
      throw new Error(uploadImageResult.error!)
    }
    imageUrl = uploadImageResult.publicUrl!
  }

  await db.insert(Posts).values({
    title: validatedData.title,
    content: validatedData.content,
    tags: validatedData.tags,
    slicedContent: validatedData.content.slice(0, 100),
    authorId: session.user.id,
    imageUrl: imageUrl,
  })

  revalidatePath('/create')
  revalidatePath('/')
  redirect('/create')
}

export const deletePost = async (post: Post) => {
  // authentication check
  const session = await getServerSession(authOptions)
  if (!session || !session?.user.id) {
    throw new Error('Not authenticated')
  }

  if (post.imageUrl) {
    await deleteImage(post.imageUrl)
  }
  await db.delete(Posts).where(eq(Posts.id, post.id))
  revalidatePath('/create')
  revalidatePath('/')
}

export const editPost = async (
  data: { title: string; content: string; tags?: string; image: File | null },
  postId: string,
  imageUrl: string | null,
) => {
  // data validation
  const rawData = {
    title: data.title,
    content: data.content,
    tags: data.tags?.split(',').map(tag => tag.trim()) || [],
    image: data.image,
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

  let updatedImageUrl = imageUrl || null
  if (data.image) {
    if (imageUrl) await deleteImage(imageUrl)

    const uploadImageResult = await uploadImage(data.image)
    if (!uploadImageResult.success) {
      throw new Error(uploadImageResult.error!)
    }
    updatedImageUrl = uploadImageResult.publicUrl!
  }

  await db
    .update(Posts)
    .set({
      title: validatedData.title,
      content: validatedData.content,
      tags: validatedData.tags,
      slicedContent: validatedData.content.slice(0, 100),
      updatedAt: new Date(),
      imageUrl: updatedImageUrl,
    })
    .where(eq(Posts.id, postId))

  revalidatePath('/create')
  revalidatePath('/')
}
