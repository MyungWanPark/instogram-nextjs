"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import GridIcon from "./ui/icons/GridIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import PostGrid from "./PostGrid";
import { CacheKeyContext } from "@/context/CacheKeyContext";

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
    const [tab, setTab] = useState<Tab>(Tabs[0].title);

    return (
        <section className="w-full">
            <ul className="flex justify-evenly uppercase">
                {Tabs.map(({ title, icon }, index) => (
                    <li
                        key={title}
                        onClick={() => setTab(title)}
                        className={`flex items-center p-4 border-black cursor-pointer ${
                            tab === title && "border-t font-bold"
                        }`}
                    >
                        <button className="scale-150 md:scale-100">
                            {icon}
                        </button>
                        <span className="hidden md:inline">{title}</span>
                    </li>
                ))}
            </ul>
            <CacheKeyContext.Provider
                value={{ postApiKey: `/api/user/${username}/${tab}` }}
            >
                <PostGrid />
            </CacheKeyContext.Provider>
        </section>
    );
}
