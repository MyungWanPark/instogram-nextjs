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
        <>
            <div>
                <Avatar image={userImage} heightLight />
                <span>{username}</span>
            </div>
            <Image
                src={image}
                alt={`photo by ${username}`}
                width={500}
                height={500}
            />
            <div>
                <HeartIcon />
                <BookmarkIcon />
            </div>
            <p>
                {likes?.length ?? 0} {likes.length > 1 ? "likes" : "like"}
            </p>
            <p>
                <span>{username}</span>
                {text}
            </p>
            <p>{parseDate(createdAt)}</p>
            <form>
                <SmileIcon />
                <input type="text" placeholder="write a comment..." />
                <button>post</button>
            </form>
        </>
    );
}
