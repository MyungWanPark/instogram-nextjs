import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
    user: AuthUser;
};

export default function SideBar({ user: { name, username, image } }: Props) {
    return (
        <>
            <div className="flex items-center">
                {image && <Avatar image={image} />}
                <div className="ml-4">
                    <p className="font-bold">{name}</p>
                    <p className="text-lg text-neutral-500 leading-4">
                        {username}
                    </p>
                </div>
            </div>
            <p className="text-sm text-neutral-500 mt-8">
                About · Help · Api · Press · Jobs · Privacy · Terms
            </p>
            <p className="text-sm font-bold text-neutral-500 mt-8">
                @Copyright Instogram from metal
            </p>
        </>
    );
}
