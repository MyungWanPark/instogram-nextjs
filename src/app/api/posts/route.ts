import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getFollowingPostsBy } from "@/service/post";
import { authOptions } from "@/auth/authOptions";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authenication error", { status: 401 });
    }
    return getFollowingPostsBy(user.username).then((data) =>
        NextResponse.json(data)
    );
}
