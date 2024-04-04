import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePosts() {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR<SimplePost[]>("/api/posts");
    const { mutate } = useSWRConfig();
    const setLike = (post: SimplePost, like: boolean) => {
        fetch("/api/like", {
            method: "PUT",
            body: JSON.stringify({ id: post.id, like }),
        }).then(() => mutate("/api/posts"));
    };
    return {
        posts,
        isLoading,
        error,
        setLike,
    };
}
