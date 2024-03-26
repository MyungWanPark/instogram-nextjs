import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getFollowingPostsBy, getPostById } from "@/service/post";
import { authOptions } from "../../auth/[...nextauth]/route";

type Context = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, context: Context) {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const { id } = context.params;

    if (!user) {
        return new Response("Authenication error", { status: 401 });
    }
    return getPostById(id).then((data) => NextResponse.json(data));
}
