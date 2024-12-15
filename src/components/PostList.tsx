"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import PostCard from "./PostCard";
import GridSpinner from "./GridSpinner";
import usePosts from "@/hooks/posts";

export default function PostList() {
    const { posts, isLoading: loading } = usePosts();
    return (
        <section className="w-[80%]">
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
