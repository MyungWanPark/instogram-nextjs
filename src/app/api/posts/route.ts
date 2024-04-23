import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPosts, getFollowingPostsBy } from "@/service/post";
import { authOptions } from "@/auth/authOptions";
import { withSession } from "@/util/session";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authenication error", { status: 401 });
    }
    return (
        getAllPosts() //
            // return getFollowingPostsBy(user.username) // demo 시연할 때 팔로우 유저가 없으므로 일단 전체 포스트를 다 보여주기
            .then((data) => NextResponse.json(data))
    );
}

export async function POST(request: NextRequest) {
    return withSession(async (user) => {
        const form = await request.formData();
        const text = form.get("text")?.toString();
        const file = form.get("file") as Blob;

        if (!text || !file) {
            return new Response("Bad Request", { status: 400 });
        }

        return createPost(user.id, text, file).then((data) =>
            NextResponse.json(data)
        );
    });
}
