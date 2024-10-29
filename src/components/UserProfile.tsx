import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
    user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
    const { image, username, name, followers, following, posts } = user;
    const userInfos = [
        {
            title: "following",
            value: following,
        },
        {
            title: "followers",
            value: followers,
        },
        {
            title: "posts",
            value: posts,
        },
    ];
    return (
        <section className="w-full flex flex-col md:flex-row border-b border-neutral-300 justify-center items-center py-12">
            <Avatar image={image ?? ""} heightLight size="xlarge" />
            <div className="md:ml-10">
                <div className="flex flex-col md:flex-row justify-evenly items-center">
                    <h1 className="text-2xl mb-2 font-bold  md:mb-0">
                        {username}
                    </h1>
                    <FollowButton user={user} />
                </div>
                <ul className="flex gap-4 justify-center my-2">
                    {userInfos.map(({ title, value }, id) => (
                        <li key={id} className="mr-2">
                            <span className="font-bold mr-1">{value}</span>
                            {title}
                        </li>
                    ))}
                </ul>
                <p className="text-center text-lg font-bold">{name}</p>
            </div>
        </section>
    );
}
