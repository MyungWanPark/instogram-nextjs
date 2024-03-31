import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {
        slug: string[];
    };
};

export async function GET(_: NextRequest, context: Context) {
    const { slug } = context.params;
    if (!Array.isArray(slug) || slug.length < 2) {
        return new NextResponse("Bad Request", { status: 400 });
    }

    const [username, query] = slug;
    console.log("query = ", query);
    console.log("username = ", username);
    let request = getPostsOf;
    if (query === "liked") {
        console.log("liked 실행됨");
        request = getLikedPostsOf;
    } else if (query === "saved") {
        request = getSavedPostsOf;
    }
    return request(username).then((posts) => NextResponse.json(posts));
}
