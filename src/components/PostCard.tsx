import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import SmileIcon from "./ui/icons/SmileIcon";
import { parseDate } from "@/util/date";

type Props = {
    post: SimplePost;
};

export default function PostCard({ post }: Props) {
    const { username, userImage, image, likes, text, createdAt } = post;
    return (
        <article className="rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center p-2">
                <Avatar image={userImage} heightLight size="medium" />
                <span className="text-gray-900 font-bold ml-2">{username}</span>
            </div>
            <Image
                src={image}
                alt={`photo by ${username}`}
                width={500}
                height={500}
                className="w-full object-cover aspect-square"
            />
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
            <form className="flex items-center px-2 border-t border-gray-200">
                <SmileIcon />
                <input
                    type="text"
                    placeholder="write a comment..."
                    className="p-2 outline-none w-full"
                />
                <button className="text-sky-500 font-bold ml-2">post</button>
            </form>
        </article>
    );
}
