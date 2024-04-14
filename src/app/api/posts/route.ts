import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostsBy } from "@/service/post";
import { authOptions } from "@/auth/authOptions";
import { withSession } from "@/util/session";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authenication error", { status: 401 });
    }
    return getFollowingPostsBy(user.username).then((data) =>
        NextResponse.json(data)
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
