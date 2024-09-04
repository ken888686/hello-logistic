import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ ...credentials });
        const res = await fetch("/api/sign-up", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customToken = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.AUTH_SECRET ?? "",
          { expiresIn: "1h" },
        );
        token.customToken = customToken;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, customToken: token.customToken };
    },
  },
});

export { handler as GET, handler as POST };
