import { NextResponse } from "next/server";
import { getPostById } from "@/service/post";
import { withSession } from "@/util/session";
import { testParam } from "@/util/date";

type Context = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, context: Context) {
    return withSession(async () => {
        const { id } = context.params;
        return getPostById(id).then((data) => NextResponse.json(data));
    });
}
