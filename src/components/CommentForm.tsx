import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
    onCommentSubmit: (comment: string) => void;
};

export default function CommentForm({ onCommentSubmit }: Props) {
    const [comment, setComment] = useState("");
    const disabledButton = comment.length === 0;
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCommentSubmit(comment);
        setComment("");
    };
    return (
        <form
            className="flex items-center px-2 border-t border-gray-200"
            onSubmit={handleSubmit}
        >
            <SmileIcon />
            <input
                type="text"
                placeholder="write a comment..."
                className="p-2 outline-none w-full"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                disabled={disabledButton}
                className={`${
                    disabledButton ? "text-sky-200" : "text-sky-500"
                } font-bold ml-2`}
            >
                post
            </button>
        </form>
    );
}
