import { addComment } from "@/service/post";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return withSession(async (user) => {
        const { id, comment } = await req.json();

        if (!id || comment == null) {
            return new Response("Bad request", { status: 400 });
        }

        return addComment(id, user.id, comment)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
