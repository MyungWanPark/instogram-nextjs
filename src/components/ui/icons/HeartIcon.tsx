import { CiHeart } from "react-icons/ci";

type Props = {
    className?: string;
};

export default function HeartIcon({ className }: Props) {
    return <CiHeart className={className || "w-9 h-9"} />;
}
