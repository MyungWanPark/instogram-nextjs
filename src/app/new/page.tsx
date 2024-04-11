import { authOptions } from "@/auth/authOptions";
import NewPost from "@/components/NewPost";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const metadata: Metadata = {
    title: "New Post",
    description: "Post new Content",
};

export default async function NewPostPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect("/auth/signin");
    }
    return <NewPost user={session.user} />;
}
