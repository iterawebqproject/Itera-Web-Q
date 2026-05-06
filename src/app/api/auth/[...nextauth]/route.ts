import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from '@/lib/mongo';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        try {
          const db = await getDb();
          const usersCollection = db.collection('users');
          
          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user || !user.password) {
            throw new Error('Invalid email or password');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid email or password');
          }

          const now = new Date();
          await usersCollection.updateOne(
            { email: user.email },
            {
              $set: {
                lastLogin: now,
                updatedAt: now,
              },
            }
          );

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return baseUrl + '/prompt';
      }
      return baseUrl + '/prompt';
    },
    async signIn({ user }) {
      console.log('User signed in:', user.email);
      try {
        const db = await getDb();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });
        const now = new Date();

        if (!existingUser) {
          await usersCollection.insertOne({
            email: user.email,
            firstLogin: now,
            lastLogin: now,
            createdAt: now,
            updatedAt: now,
          });
        } else {
          await usersCollection.updateOne(
            { email: user.email },
            {
              $set: {
                lastLogin: now,
                updatedAt: now,
              },
            }
          );
        }
      } catch (error) {
        console.error('Error updating user login timestamps:', error);
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string || token.email as string;
        session.user.image = token.picture as string || null;

        try {
          const db = await getDb();
          const usersCollection = db.collection('users');
          const userData = await usersCollection.findOne({
            email: token.email,
          });

          if (userData) {
            session.user.id = userData._id.toString();
            session.user.firstLogin = userData.firstLogin;
            session.user.lastLogin = userData.lastLogin;
          }
        } catch (error) {
          console.error('Error fetching user login data:', error);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
