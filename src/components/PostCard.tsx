"use client";

import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import { useState } from "react";
import PostModal from "./PostModal";
import ModalPortal from "./ui/ModalPortal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/posts";

type Props = {
    post: SimplePost;
    priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
    const { username, userImage, image, text, comments } = post;
    const [showModal, setShowModal] = useState(false);
    const { submitComment } = usePosts();
    const onCommentSubmit = (comment: string) => submitComment(post, comment);

    return (
        <article className="rounded-lg shadow-md border border-gray-200">
            <PostUserAvatar userImage={userImage} username={username} />
            <Image
                src={image}
                alt={`photo by ${username}`}
                width={500}
                height={500}
                className="w-full object-cover aspect-square"
                priority={priority}
                onClick={() => setShowModal(true)}
            />
            <PostActions post={post}>
                <p className="px-2 text-gray-900 text-md">
                    <span className="mr-2 font-bold">{username}</span>
                    {text}
                </p>

                {comments > 1 && (
                    <button
                        className="p-2 font-bold text-sky-500"
                        onClick={() => setShowModal(true)}
                    >{`View all ${comments} comments`}</button>
                )}
            </PostActions>
            <CommentForm onCommentSubmit={onCommentSubmit} />
            {showModal && (
                <ModalPortal>
                    <PostModal onClose={() => setShowModal(false)}>
                        <PostDetail post={post} />
                    </PostModal>
                </ModalPortal>
            )}
        </article>
    );
}
