import { authOptions } from "@/auth/authOptions";
import { dislikePost, likePost } from "@/service/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authentication Error", { status: 401 });
    }

    const { id, like } = await req.json();

    if (!id || like === undefined) {
        return new Response("Bad request", { status: 400 });
    }

    const request = like ? likePost : dislikePost;
    return request(id, user.id)
        .then((res) => NextResponse.json(res))
        .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
