"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import GridIcon from "./ui/icons/GridIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import PostGrid from "./PostGrid";

type Props = {
    user: ProfileUser;
};

export type Tab = "posts" | "liked" | "saved";
type TabConst = {
    title: Tab;
    icon: React.ReactNode;
};

const Tabs: TabConst[] = [
    {
        title: "posts",
        icon: <GridIcon className="w-6 h-6" />,
    },
    {
        title: "liked",
        icon: <HeartIcon className="w-6 h-6" />,
    },
    {
        title: "saved",
        icon: <BookmarkIcon className="w-6 h-6" />,
    },
];

export default function UserPosts({ user: { username } }: Props) {
    // /api/user/{username}/posts
    // /api/user/{username}/liked
    // /api/user/{username}/saved
    const [tab, setTab] = useState<Tab>("saved");

    return (
        <section>
            <ul>
                {Tabs.map(({ title, icon }, index) => (
                    <li key={title} onClick={() => setTab(title)}>
                        <button>{icon}</button>
                        <span>{title}</span>
                    </li>
                ))}
            </ul>
            <PostGrid username={username} query={tab} />
        </section>
    );
}
