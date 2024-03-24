"use client";
import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostCard from "./PostCard";

export default function PostList() {
    const {
        data: posts,
        isLoading: loading,
        error,
    } = useSWR<SimplePost[]>("/api/posts");
    return (
        <section>
            {loading && (
                <div className="text-center mt-32">
                    <GridLoader color="red" size={13} />
                </div>
            )}
            <ul>
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id} className="mt-4">
                                <PostCard post={post} />
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}
