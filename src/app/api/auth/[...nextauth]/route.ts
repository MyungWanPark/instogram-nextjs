import { addUser } from "@/service/user";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async signIn({ user: { id, name, email, image } }) {
            if (!email) {
                return false;
            }
            addUser({
                id,
                name: name || "",
                email,
                image,
                username: email.split("@")[0],
            });
            return true;
        },
        async session({ session }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const user = session.user;

            if (user) {
                session.user = {
                    ...user,
                    username: user?.email?.split("@")[0] || "",
                };
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
