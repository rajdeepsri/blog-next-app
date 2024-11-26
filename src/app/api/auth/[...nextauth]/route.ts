import { db } from '@/server'
import { users } from '@/server/schema'
import { eq } from 'drizzle-orm'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
