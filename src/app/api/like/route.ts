import { authOptions } from "@/auth/authOptions";
import { dislikePost, likePost } from "@/service/post";
import { withSession } from "@/util/session";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    return withSession(async (user) => {
        const { id, like } = await req.json();

        if (!id || like == null) {
            return new Response("Bad request", { status: 400 });
        }

        const request = like ? likePost : dislikePost;
        return request(id, user.id)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
