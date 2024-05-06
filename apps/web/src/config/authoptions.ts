import { AuthOptions, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/prisma/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { compare } from "bcrypt";


// more providers at https://next-auth.js.org/providers
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers:[
    CredentialsProvider({
      name:"credentials",
      credentials:{
        username:{},
        email:{},
        password:{},
      },
      async authorize(credentials, req) {
        if(!credentials?.email && credentials?.password && credentials.username) return null;

        if(credentials?.email && credentials.password && credentials.username){

        }
      }, 
    })
  ],
  session:{
    strategy:"jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug:process.env.NODE_ENV ==="development",
  
};