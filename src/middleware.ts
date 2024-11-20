import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    // const { pathname, search, origin, basePath } = req.nextUrl;

    if (!token) {
        if (req.nextUrl.pathname.startsWith("/api")) {
            return new NextResponse("Authentication Error", { status: 401 });
        }

        const { pathname, search, origin, basePath } = req.nextUrl;

        const signInUrl = new URL(`${basePath}/auth/signin`, origin);
        signInUrl.searchParams.append(
            "callbackUrl",
            `${basePath}${pathname}${search}`
        );
        return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/new",
        "/",
        "/api/bookmarks",
        "/api/comments",
        "/api/likes",
        "/api/follow",
        "/api/me",
        "/api/posts/:path*",
    ],
};
