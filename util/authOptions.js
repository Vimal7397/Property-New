import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import connectdb from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
        await connectdb();
        const userExists = await User.findOne({ email:profile.email });
      if(!userExists){
        const username=profile.email.slice(0,20);
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
        }) ;
      

      }
      return true ;
      },
    async session({ session }) {
      const user = await User.findOne({email:session.user.email});
      session.user.id = user._id.toString();
      return session;;
    }
},
}