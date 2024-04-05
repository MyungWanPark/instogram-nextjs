import { SimplePost } from "@/model/post";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
    return fetch("/api/like", {
        method: "PUT",
        body: JSON.stringify({ id, like }),
    }).then((res) => res.json());
}

export default function usePosts() {
    const {
        data: posts,
        isLoading,
        error,
        mutate,
    } = useSWR<SimplePost[]>("/api/posts");
    const setLike = (post: SimplePost, like: boolean, username: string) => {
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
    };
    return {
        posts,
        isLoading,
        error,
        setLike,
    };
}
