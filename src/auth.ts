import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })

          console.log("Found user:", user)

          if (!user) return null

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          console.log("Password match:", passwordMatch)

          if (!passwordMatch) return null

          return { id: String(user.id), email: user.email, name: user.name }
        } catch (err) {
          console.error("Auth error:", err)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
})