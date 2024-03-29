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
        <section>
            <Avatar image={image ?? ""} />
            <div>
                <h1>{username}</h1>
                <FollowButton user={user} />
                <ul>
                    {userInfos.map(({ title, value }, id) => (
                        <li key={id}>
                            <span>{value}</span>
                            {title}
                        </li>
                    ))}
                </ul>
                <p>{name}</p>
            </div>
        </section>
    );
}
