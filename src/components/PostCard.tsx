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

type Props = {
    post: SimplePost;
    priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
    const { username, userImage, image, likes, text, createdAt } = post;
    const [showModal, setShowModal] = useState(false);

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
            <PostActions post={post} />
            <CommentForm />
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
