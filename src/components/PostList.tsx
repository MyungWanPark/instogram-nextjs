"use client";
import { SimplePost } from "@/model/post";
import { ClimbingBoxLoader } from "react-spinners";
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
            {loading && <ClimbingBoxLoader color="#36d7b7" />}
            <ul>
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <PostCard post={post} />
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}
