import { Comment, FullPost, SimplePost } from "@/model/post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

async function addComment(id: string, comment: string) {
    return fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ id, comment }),
    }).then((res) => res.json());
}

export default function useDetailPost(postId: string) {
    const {
        data: post,
        isLoading,
        error,
        mutate,
    } = useSWR<FullPost>(`/api/posts/${postId}`);

    const { mutate: globalMutate } = useSWRConfig();
    const submitComment = useCallback(
        (comment: Comment) => {
            if (!post) return;
            const newPost: FullPost = {
                ...post,
                comments: [...post.comments, comment],
            };

            return mutate(addComment(post.id, comment.comment), {
                optimisticData: newPost,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            }).then(() => globalMutate("/api/posts"));
        },
        [post, mutate, globalMutate]
    );
    return {
        post,
        isLoading,
        error,
        submitComment,
    };
}
