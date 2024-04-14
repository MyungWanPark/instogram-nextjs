import { NextResponse } from "next/server";
import { getUserByUsername } from "@/service/user";
import { withSession } from "@/util/session";

export async function GET(request: Request) {
    return withSession((user) =>
        getUserByUsername(user.username).then((data) => NextResponse.json(data))
    );
}
