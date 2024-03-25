"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import PostCard from "./PostCard";
import GridSpinner from "./GridSpinner";

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
                    <GridSpinner />
                </div>
            )}
            <ul>
                {posts &&
                    posts.map((post, index) => {
                        return (
                            <li key={post.id} className="mt-4">
                                <PostCard post={post} priority={index < 2} />
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}
