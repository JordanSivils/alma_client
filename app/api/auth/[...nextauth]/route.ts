import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const googleId: string = process.env.GOOGLE_CLIENT_ID || "";
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET || "";


const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session
    },
    async signIn({ user, account, profile }) {
      console.log('Google profile received:', profile); // Debugging statement
      console.log('NextAuth user object:', user); // Debugging statement

      const userEmail = user.email || profile?.email;
      console.log('User email:', userEmail)

      const response = await fetch('http://localhost:5555/api/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          id: user.id,
          email: profile?.email || user.email,
          name: profile?.name || user.name,
          image: profile?.image || user.image
        })
      })
      console.log('Response from user creation/update:', response.status, response.statusText);
      return response.ok
    } 
  }
}

const handler = NextAuth(options)

export { handler as GET, handler as POST}