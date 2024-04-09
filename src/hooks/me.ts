import { HomeUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(id: string, bookmark: boolean) {
    return fetch("/api/bookmark", {
        method: "PUT",
        body: JSON.stringify({ id, bookmark }),
    }).then((res) => res.json());
}

export default function useMe() {
    const {
        data: user,
        isLoading,
        error,
        mutate,
    } = useSWR<HomeUser>("/api/me");

    const setBookmark = useCallback(
        (postId: string, bookmark: boolean) => {
            if (!user) return;
            const newUser: HomeUser = {
                ...user,
                bookmark: bookmark
                    ? [...user.bookmark, postId]
                    : user.bookmark.filter((item) => item !== postId),
            };

            return mutate(updateBookmark(postId, bookmark), {
                optimisticData: newUser,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            });
        },
        [user, mutate]
    );
    return {
        user,
        isLoading,
        error,
        setBookmark,
    };
}
