import { AuthOptions, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient()

// more providers at https://next-auth.js.org/providers
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers:[
    CredentialsProvider({
      name:"credentials",
      credentials:{
        id:{},
        email:{},
        username:{},
        password:{},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
      
        const user = await prisma?.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
      
        if (!user) return null;
      
        const passwordMatches = await compare(credentials.password, user.password);
        if (!passwordMatches) return null;
      
        const userStringId = user.id.toString();
        return { ...user, id: userStringId };
      },      
    })
  ],
  session:{
    strategy:"jwt",
    // Todo : change this back to 5min
    maxAge: 30*24*60*60 ,
  },

  callbacks:{
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug:process.env.NODE_ENV ==="development",
  
};
