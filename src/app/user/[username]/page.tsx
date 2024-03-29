import UserProfile from "@/components/UserProfile";
import { getUserProfileBy } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
    params: {
        username: string;
    };
};

export default async function UserPage({ params: { username } }: Props) {
    const user = await getUserProfileBy(username);
    if (!user) {
        return notFound();
    }
    return <UserProfile user={user} />;
}
