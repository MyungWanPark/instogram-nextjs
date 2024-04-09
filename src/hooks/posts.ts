import { Comment, SimplePost } from "@/model/post";
import { useCallback } from "react";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
    return fetch("/api/like", {
        method: "PUT",
        body: JSON.stringify({ id, like }),
    }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
    return fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ id, comment }),
    }).then((res) => res.json());
}

export default function usePosts() {
    const {
        data: posts,
        isLoading,
        error,
        mutate,
    } = useSWR<SimplePost[]>("/api/posts");

    const setLike = useCallback(
        (post: SimplePost, like: boolean, username: string) => {
            const newPost: SimplePost = {
                ...post,
                likes: like
                    ? [...post.likes, username]
                    : post.likes.filter((item) => item !== username),
            };
            const optimisticPosts = posts?.map((p) =>
                p.id === post.id ? newPost : p
            );
            return mutate(updateLike(post.id, like), {
                optimisticData: optimisticPosts,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            });
        },
        [posts, mutate]
    );

    const submitComment = useCallback(
        (post: SimplePost, comment: Comment) => {
            const newPost: SimplePost = {
                ...post,
                comments: post.comments + 1,
            };
            const optimisticPosts = posts?.map((p) =>
                p.id === post.id ? newPost : p
            );
            return mutate(addComment(post.id, comment.comment), {
                optimisticData: optimisticPosts,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            });
        },
        [posts, mutate]
    );
    return {
        posts,
        isLoading,
        error,
        setLike,
        submitComment,
    };
}
