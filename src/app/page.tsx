import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { authOptions } from "@/auth/authOptions";

export const metadata: Metadata = {
    title: "Home",
    description: "PhotoLists of Instogram followers",
};

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        return redirect("/auth/signin");
    }

    return (
        <section className="flex flex-col md:flex-row w-full max-w-[850px] p-4">
            <div className="w-full basis-3/4 min-w-0 flex flex-col items-center">
                <FollowingBar />
                <PostList />
            </div>
            <div className="w-full basis-1/4 md:ml-4 pt-4 ml-[10%]">
                <SideBar user={user} />
            </div>
        </section>
    );
}
