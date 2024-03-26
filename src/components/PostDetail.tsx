import { SimplePost } from "@/model/post";
import useSWR from "swr";

type Props = {
    post: SimplePost;
};

export default function PostDetail({ post }: Props) {
    const { username, id, userImage, image, likes, text, createdAt } = post;
    const { data: detailPost, isLoading, error } = useSWR(`/api/posts/${id}`);
    const { comments } = detailPost;
    console.log("detailPost = ", detailPost);
    console.log("comments = ", comments);
    return <></>;
}
