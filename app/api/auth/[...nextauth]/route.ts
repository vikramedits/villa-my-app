import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // ✅ App Router compatible
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email !== process.env.ADMIN_EMAIL) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD!
        );

        if (!isValid) {
          return null;
        }

        return {
          id: "admin",
          email: process.env.ADMIN_EMAIL,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 6, // 6 hours
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
