"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";

type Props = {
    user: ProfileUser;
};

type Tab = "posts" | "liked" | "saved";

export default function UserPosts({ user: { username } }: Props) {
    // /api/user/{username}/posts
    // /api/user/{username}/liked
    // /api/user/{username}/saved
    const [tab, setTab] = useState<Tab>("saved");
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/user/${username}/${tab}`);
    console.log("posts = ", posts);
    return <></>;
}
