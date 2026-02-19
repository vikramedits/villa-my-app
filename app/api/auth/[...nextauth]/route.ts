import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      // 🔒 ONLY ALLOW ADMIN EMAIL
      async profile(profile) {
        if (profile.email !== process.env.ADMIN_EMAIL) {
          throw new Error("Not authorized");
        }

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
        };
      },
    }),

    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (credentials.email !== process.env.ADMIN_EMAIL) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD!
        );

        if (!isValid) return null;

        return {
          id: "admin",
          email: process.env.ADMIN_EMAIL,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
