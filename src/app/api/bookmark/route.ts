import { addBookmark, removeBookmark } from "@/service/user";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    return withSession(async (user) => {
        const { id, bookmark } = await req.json();

        if (!id || bookmark == null) {
            return new Response("Bad request", { status: 400 });
        }

        const request = bookmark ? addBookmark : removeBookmark;
        return request(user.id, id)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
