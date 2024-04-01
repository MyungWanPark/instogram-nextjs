import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { ProfileUser } from "@/model/user";
import { getUserProfileBy } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
    params: {
        username: string;
    };
};

export default async function UserPage({ params: { username } }: Props) {
    const user = (await getUserProfileBy(username)) as ProfileUser;
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
