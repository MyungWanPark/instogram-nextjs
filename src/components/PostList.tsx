"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";

export default function PostList() {
    const {
        data: posts,
        isLoading: loading,
        error,
    } = useSWR<SimplePost[]>("/api/posts");
    console.log("posts = ", posts);
    return (
        <ul>
            {posts &&
                posts.map((post) => {
                    return <li key={post.id}>{post.text}</li>;
                })}
        </ul>
    );
}
