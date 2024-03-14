import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
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
        async signIn({ user, account, profile, email, credentials }) {
            console.log("user = ", user);
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
    },
});

export { handler as GET, handler as POST };
