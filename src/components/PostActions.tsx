import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";

type Props = {
    likes: string[];
    text: string;
    username: string;
    createdAt: string;
};

export default function PostActions({
    likes,
    text,
    username,
    createdAt,
}: Props) {
    return (
        <>
            <div className="flex justify-between p-2 text-xl font-bold">
                <HeartIcon />
                <BookmarkIcon />
            </div>
            <p className="px-2 text-gray-900 font-bold text-md">
                {likes?.length ?? 0} {likes.length > 1 ? "likes" : "like"}
            </p>
            <p className="px-2 text-gray-900 text-md">
                <span className="mr-2 font-bold">{username}</span>
                {text}
            </p>
            <p className="text-gray-500 px-2 py-1 text-sm">
                {parseDate(createdAt)}
            </p>
        </>
    );
}
