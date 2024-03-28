import { SearchUserResult } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
    user: SearchUserResult;
};

export default function UserSearchCard({
    user: { name, username, image, following, followers },
}: Props) {
    return (
        <Link
            href={`/user/${username}`}
            className="flex items-center w-full border border-neutral-300 mb-3 bg-white p-3 hover:bg-neutral-50"
        >
            <Avatar image={image ?? ""} />
            <div className="ml-2 text-neutral-500">
                <p className="text-black font-bold leading-4">{username}</p>
                <p>{name}</p>
                <p className="text-sm leading-4">{`${following} following ${followers} followers`}</p>
            </div>
        </Link>
    );
}
