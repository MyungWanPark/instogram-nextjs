import { BsBookmark } from "react-icons/bs";

type Props = {
    className?: string;
};

export default function BookmarkIcon({ className }: Props) {
    return <BsBookmark className={className || "w-6 h-6"} />;
}
