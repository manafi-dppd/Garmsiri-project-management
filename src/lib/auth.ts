import NextAuth, { AuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";

interface CustomUser extends User {
  id: string;
}

interface CustomSession extends Session {
  user: CustomUser;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!prisma) {
          throw new Error("Prisma Client not initialized!");
        }
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            user_name: credentials.username, // استفاده از user_name به جای username
          },
        });

        if (!user) return null;

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (isValidPassword) {
          return {
            id: user.id.toString(),
            name: `${user.first_name} ${user.last_name}`, // ترکیب نام و نام خانوادگی
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      (session as CustomSession).user.id = token.id as string;
      console.debug("Session updated:", { session, token });
      return session;
    },
  },
};

export default NextAuth(authOptions);
