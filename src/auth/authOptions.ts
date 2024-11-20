import { addUser } from "@/service/user";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Guest",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "guest",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = {
                    id: "9999",
                    name: "Guest",
                    email: "guest@guest.com",
                    image: "https://cdn.sanity.io/images/hy16jota/production/2c8056b273942e4acc291689a3d6d76bdd368535-960x540.png",
                };
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async signIn({ user: { id, name, email, image }, account }) {
            if (!email) {
                return false;
            }
            addUser({
                id,
                name: name || "",
                email,
                image,
                username: email?.split("@")[0] || "unknown",
            });
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const user = session.user;

            if (user) {
                session.user = {
                    ...user,
                    username: user?.email?.split("@")[0] || "unknown",
                    id: token.id as string,
                };
            }
            return session;
        },
    },
};
