import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { signIn, useSession } from "next-auth/react";

type Props = {
    post: SimplePost;
    priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
    const { image, username } = post;
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const handlePostGridClick = () => {
        if (!session || !session.user) {
            return signIn();
        }
        setShowModal(true);
    };

    return (
        <div className="relative w-full aspect-square">
            <Image
                src={image}
                alt={`photo by ${username}`}
                sizes="650px"
                fill
                priority={priority}
                onClick={handlePostGridClick}
                className="object-cover"
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
