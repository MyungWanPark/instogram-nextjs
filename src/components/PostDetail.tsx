import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import Avatar from "./Avatar";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import useDetailPost from "@/hooks/detailPost";
import useMe from "@/hooks/me";

type Props = {
    post: SimplePost;
};

export default function PostDetail({ post }: Props) {
    const { username, id, userImage, image, likes, text, createdAt } = post;
    const { post: detailPost, submitComment } = useDetailPost(id);
    const { user } = useMe();
    const comments = detailPost?.comments;
    const onCommentSubmit = (comment: string) =>
        user &&
        submitComment({
            username: user.username,
            image: user.image,
            comment,
        });
    return (
        <section className="flex w-full h-full">
            <div className="relative basis-3/5">
                <Image
                    src={image}
                    alt={`photo by ${username}`}
                    sizes="650px"
                    fill
                    className="w-full object-cover"
                />
            </div>
            <div className="basis-2/5 w-full flex flex-col">
                <PostUserAvatar userImage={userImage} username={username} />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {comments &&
                        comments.map(
                            (
                                {
                                    comment,
                                    username: commentUsername,
                                    image: userImage,
                                },
                                index
                            ) => (
                                <li
                                    key={index}
                                    className="flex items-center mb-1"
                                >
                                    <Avatar
                                        image={userImage}
                                        size="small"
                                        heightLight={
                                            username === commentUsername
                                        }
                                    />
                                    <div className="ml-2">
                                        <span className="font-bold mr-1">
                                            {commentUsername}
                                        </span>
                                        <span>{comment}</span>
                                    </div>
                                </li>
                            )
                        )}
                </ul>
                <PostActions post={post} />
                <CommentForm onCommentSubmit={onCommentSubmit} />
            </div>
        </section>
    );
}
