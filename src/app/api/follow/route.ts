import { follow, unfollow } from "@/service/user";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    return withSession(async (user) => {
        const { id: targetId, follow: isFollow } = await req.json();

        if (!targetId || isFollow == null) {
            return new Response("Bad request", { status: 400 });
        }

        const request = isFollow ? follow : unfollow;
        return request(user.id, targetId)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
