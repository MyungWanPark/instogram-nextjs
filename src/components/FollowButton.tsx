"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/me";

type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const { user: logginUser, error, isLoading } = useMe();

    const showButton = logginUser && logginUser.username !== user.username;
    const isFollowing = !!(
        logginUser &&
        logginUser.following.find(
            (followingUser) => followingUser.username === user.username
        )
    );
    return (
        <>
            {showButton && (
                <Button
                    text={isFollowing ? "Unfollow" : "Follow"}
                    onClick={() => {}}
                    isRed={isFollowing}
                />
            )}
        </>
    );
}
