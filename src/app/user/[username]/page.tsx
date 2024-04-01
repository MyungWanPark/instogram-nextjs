import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { ProfileUser } from "@/model/user";
import { getUserProfileBy } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
    params: {
        username: string;
    };
};

const getUser = cache(
    async (username: string) => await getUserProfileBy(username)
);

export default async function UserPage({ params: { username } }: Props) {
    const user = await getUser(username);
    if (!user) {
        return notFound();
    }
    return (
        <section className="w-full">
            <UserProfile user={user} />
            <UserPosts user={user} />
        </section>
    );
}

export async function generateMetadata({
    params: { username },
}: Props): Promise<Metadata> {
    const user = await getUser(username);
    return {
        title: `${user.name} (@${user.username})`,
        description: `${user.name}'s all Instogram posts`,
    };
}
