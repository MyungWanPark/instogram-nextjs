import { Comment, FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";

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

    const submitComment = (comment: Comment) => {
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
        });
    };
    return {
        post,
        isLoading,
        error,
        submitComment,
    };
}
