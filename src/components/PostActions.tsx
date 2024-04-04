import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import usePosts from "@/hooks/posts";

type Props = {
    post: SimplePost;
};

export default function PostActions({ post }: Props) {
    const { id, likes, text, username, createdAt } = post;
    const { data: session } = useSession();
    const user = session?.user;
    const liked = user ? likes.includes(user.username) : false;
    const { setLike } = usePosts();
    const [bookmarked, setBookmarked] = useState(false);
    const handleLike = (like: boolean) => {
        if (user) {
            setLike(post, like);
        }
    };

    return (
        <>
            <div className="flex justify-between p-2 text-xl font-bold">
                <ToggleButton
                    toggled={liked}
                    onToggle={handleLike}
                    outlineIcon={<HeartIcon />}
                    fillIcon={<HeartFillIcon />}
                />
                <ToggleButton
                    toggled={bookmarked}
                    onToggle={setBookmarked}
                    outlineIcon={<BookmarkIcon />}
                    fillIcon={<BookmarkFillIcon />}
                />
            </div>
            <p className="px-2 text-gray-900 font-bold text-md">
                {likes?.length ?? 0} {likes.length > 1 ? "likes" : "like"}
            </p>
            {text && (
                <p className="px-2 text-gray-900 text-md">
                    <span className="mr-2 font-bold">{username}</span>
                    {text}
                </p>
            )}
            <p className="text-gray-500 px-2 py-1 text-sm">
                {parseDate(createdAt)}
            </p>
        </>
    );
}
