import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";

type Props = {
    post: SimplePost;
    priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
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
                priority={priority}
            />
            <PostActions
                likes={likes}
                text={text}
                createdAt={createdAt}
                username={username}
            />
            <CommentForm />
        </article>
    );
}
