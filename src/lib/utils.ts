import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { tagColors } from './constants'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { db } from '@/server'
import { users } from '@/server/schema'
import { eq } from 'drizzle-orm'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const BUCKET_NAME = 'blog-posts' as const
const MAX_SIZE_MB = 3

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate1 = (date: Date) => format(date, 'dd MMM yyyy')

export const getTagColor = (i: number) => tagColors[i % tagColors.length]

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
)

export const uploadImage = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'Only image files are allowed.', publicUrl: null }
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { success: false, error: `File size exceeds ${MAX_SIZE_MB}MB.`, publicUrl: null }
  }

  const uniqueFileName = `images/${Date.now()}-${file.name}`
  const { data, error } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .upload(uniqueFileName, file)

  if (error) {
    return { success: false, error: error.message, publicUrl: null }
  }

  const { data: uploadedFile } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return { success: true, error: null, publicUrl: uploadedFile.publicUrl }
}

export const deleteImage = async (imageUrl: string) => {
  try {
    console.log('yes this ran')
    const filePath = imageUrl.split('/').slice(-2).join('/')
    const { error } = await supabaseClient.storage.from(BUCKET_NAME).remove([filePath])

    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email!),
        })

        if (!existingUser) {
          await db.insert(users).values({
            id: user.id,
            name: user.name!,
            email: user.email!,
            avatarUrl: user.image!,
          })
        }

        return true
      } catch (error) {
        console.error('Error saving user to DB:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}
