import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";

type Props = {
    likes: string[];
    text?: string;
    username: string;
    createdAt: string;
};

export default function PostActions({
    likes,
    text,
    username,
    createdAt,
}: Props) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <>
            <div className="flex justify-between p-2 text-xl font-bold">
                <ToggleButton
                    toggled={liked}
                    onToggle={setLiked}
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
