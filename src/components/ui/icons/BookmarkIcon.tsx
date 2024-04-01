import { CiBookmark } from "react-icons/ci";

type Props = {
    className?: string;
};

export default function BookmarkIcon({ className }: Props) {
    return <CiBookmark className={className || "w-9 h-9"} />;
}
