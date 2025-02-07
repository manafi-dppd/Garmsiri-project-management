import NextAuth, {AuthOptions, User, Session} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface CustomUser extends User {
  id: string;
}

interface CustomSession extends Session {
  user: CustomUser;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        const user = {id: '1', name: 'User', email: 'user@example.com'};

        if (user) {
          return user as CustomUser;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}) {
      (session as CustomSession).user.id = token.id as string;
      console.log('Session in auth.ts:', session); // بررسی مقدار session در auth.ts
      return session;
    },
  },
};

export default NextAuth(authOptions);
