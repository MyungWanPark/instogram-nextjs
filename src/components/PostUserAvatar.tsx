import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
    userImage: string;
    username: string;
};

export default function PostUserAvatar({ userImage, username }: Props) {
    return (
        <Link
            className="sm:flex items-center p-2 hidden"
            href={`/user/${username}`}
        >
            <Avatar image={userImage} heightLight size="medium" />
            <span className="text-gray-900 font-bold ml-2">{username}</span>
        </Link>
    );
}
