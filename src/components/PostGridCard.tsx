import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
    post: SimplePost;
    priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
    const { image, username } = post;
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Image
                src={image}
                alt={`photo by ${username}`}
                sizes="650px"
                fill
                priority={priority}
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <ModalPortal>
                    <PostModal onClose={() => setShowModal(false)}>
                        <PostDetail post={post} />
                    </PostModal>
                </ModalPortal>
            )}
        </div>
    );
}
